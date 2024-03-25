import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyToasts, { useToast} from '../components/MyToasts';
import axios from 'axios';
import AuthContext from '../AuthProvider'

export default function EditReview(){
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');
    const showToast = useToast();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const reviewer = params.get('reviewer');

    const [review, setReview] = useState([]);
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [stars, setStars] = useState();
    const [authorDB, setAuthorDB] = useState();
    const [reviewerDB, setReviewerDB] = useState();
    const [recommendation, setRecommendation] = useState();

    const [submited, setSubmited] = useState(false);

    const fetchReview = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reviews/${id}`,{
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            setReview(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (review) {
            setTitle(review.title);
            setText(review.text);
            setStars(review.stars);
            setRecommendation(review.recommendation == 1);
            setAuthorDB(review.author);
            setReviewerDB(review.reviewer);
        }
    }, [review]);

    useEffect(() => {
        fetchReview();
    }, []);

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/reviews', 
            {
                author: auth.login,
                reviewer: reviewer,
                text: text,
                date: new Date().toISOString(),
                stars: stars,
                title: title,
                recommendation: recommendation
            },{ headers: {'Authorization': `Bearer ${jwtToken}`}});
            if (response.status == 201) {
                showToast('success', 'Recenzia bola úspešne odoslaná!','/profile/written-reviews')
                setSubmited(true);
            } else {
                showToast('error', response.status)
            }
            
          } catch (error) {
            console.error(error);
            showToast('error', error.code)
          }
    };

    const putData = async () => {
        try {
            const response = await axios.put('http://localhost:8080/reviews', 
            {
                idReview: id,
                author: authorDB,
                reviewer: reviewerDB,
                text: text,
                date: new Date().toISOString(),
                stars: stars,
                title: title,
                recommendation: recommendation    
            },{headers: { 'Authorization': `Bearer ${jwtToken}`}});
            if (response.status == 200) {
                showToast('success', 'Recenzia bola úspešne odoslaná!','/profile/written-reviews')
                setSubmited(true);
            } else {
                showToast('error', response.status)
            }
          } catch (error) {
            console.error(error);
            showToast('error', error.code)
          }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            putData();
            setSubmited(true);
        } else {
            postData();
        }
    };

    return(
        <>
        <br/><br/>
        <MyToasts />
        <form onSubmit={handleSubmit}> 
        <div className="grid-reviews greenBG">
            <div className="review">
                <label>Hodnotenie od 1 -{">"} 10 (najlepšie)</label><br/>
                <input type="number" min="1" max="10" style={{width: '75px'}} value={stars} required
                       onChange={(e) => setStars(e.target.value)}></input>
            </div>

            <div className="editik">
            </div>

            <div className="header">
                <label style={{fontWeight: 'normal'}}>Nadpis:</label><br/>
                <input type="text" style={{width: '100%'}} value={title} required
                       onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="comment">
                <lavel>Recenzia:</lavel><br/>
                <textarea style={{width: '100%'}} id="text" name="text" rows="4" cols="50" placeholder="Zadejte text..." required maxLength={5000} value={text}
                          onChange={(e) => setText(e.target.value)}></textarea>
            </div>  
            <div className="bool greenBG">
                <label>Odporúčate našu stránku?</label>
                <input type="checkbox" className="review-checkbox" style={{width: '60px'}} checked={recommendation}
                       onChange={(e) => setRecommendation(e.target.checked)}></input>
            </div>
            <div className="date greenBG" style={{paddingBottom: '0px', paddingTop: '4px'}}>
                <button className="submit btn btn-outline-light btn-floating px-5 login-btn"
                disabled={ submited ? true : false}>Odoslať</button>
            </div>
        </div>
        </form>
        <br/><br/>
        </>
    )
}