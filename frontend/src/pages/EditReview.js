import { useState, useEffect, useContext } from 'react';
import {useLocation} from'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditReview(){
    const navigate = useNavigate();

    //získanie parametra z URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encoded = searchParams.get('id');
    //dekodovanie parametra 
    const encodedJsonItem = decodeURIComponent(encoded);
    const item = JSON.parse(encodedJsonItem);

    let [title, setTitle] = useState();
    let [text, setText] = useState();
    let [stars, setStars] = useState();
    let [recommendation, setRecommendation] = useState();
    let [formMessage, setFormMessage] = useState();

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:4000/post/review', 
            {
                title: title,
                text: text,
                stars: stars,
                recommendation: (recommendation ? 1 : 0),
            });
            setFormMessage(<p className="formCheck"> {response.formData} </p>);
            navigate('/reviews');
          } catch (error) {
            console.error(error);
            setFormMessage(<p className="formError">Chyba pri odosielaní dát</p>);
          }
    };

    const putData = async () => {
        try {
            const response = await axios.put('http://localhost:4000/put/review', 
            {
                title: title,
                text: text,
                stars: stars,
                idreview: item.idreviews,
                recommendation: (recommendation ? 1 : 0),
            });
            setFormMessage(<p className="formCheck"> {response.formData} </p>);
            navigate('/reviews');
          } catch (error) {
            console.error(error);
            setFormMessage(<p className="formError">Chyba pri odosielaní dát PUT</p>);
          }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormMessage('');
        if (item === null) {
            postData();
        } else {
            putData();
        }
    };


    return(
        <>
        <br/><br/>
        <div className="grid-reviews greenBG">
            <div className="review">
                <label>Hodnotenie od 1 -{">"} 10 (najlepšie)</label><br/>
                <input type="number" min="1" max="10" style={{width: '75px'}} value={stars}
                       onChange={(e) => setStars(e.target.value)}></input>
            </div>

            <div className="editik">
            </div>

            <div className="header">
                <label style={{fontWeight: 'normal'}}>Nadpis:</label><br/>
                <input type="text" style={{width: '100%'}} value={title} onChange={(e) => setTitle(e.target.value)}></input>
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
                <button className="submit btn btn-outline-light btn-floating px-5 login-btn" onClick={handleSubmit}>Odoslať</button>
            </div>
        </div>
        <br/><br/>
        </>
    )
}