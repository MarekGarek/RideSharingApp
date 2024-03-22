import Review from '../components/Review';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useContext} from 'react';
import AuthContext from '../AuthProvider'

export default function WrittenReviews() {
    const aboutMe = "Recenzent: ";
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');

    const [reviews, setReviews] = useState([]);
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/written-reviews', {
                params: { loggedUser: auth.login },
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/written-reviews/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            fetchItems();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Napísané recenzie</h1>
            </div>
        </div>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>

        {
            reviews.map((review) => (
                <Review
                  key={review.idReview}
                  id={review.idReview}
                  recommendation={review.recommendation}
                  stars={review.stars}
                  title={review.title}
                  text={review.text}
                  user={review.reviewer}
                  date={review.date.replace(/-/g, '.')}
                  rev={aboutMe}
                  onDelete={handleDelete}
                />
              ))
        }
        </>
    )
}