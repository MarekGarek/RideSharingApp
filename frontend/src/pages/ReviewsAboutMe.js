import Review from '../components/Review';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ReviewsAboutMe() {
    const aboutMe = "Autor: ";

    const loggedUser = "Marek14"; // TODO: zmeniť na authUser

    const [reviews, setReviews] = useState([]);
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reviews-about-me', {params: {loggedUser: loggedUser}});
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return(
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Recenzie o mne</h1>
            </div>
        </div>

        {
            reviews.map((review) => (
                <Review
                  key={review.idReview}
                  id={review.idReview}
                  recommendation={review.recommendation}
                  stars={review.stars}
                  title={review.title}
                  text={review.text}
                  user={review.author}
                  date={review.date.replace(/-/g, '.')}
                  rev={aboutMe}
                />
                
              ))
        }

        {/*
        <Review recommendation="1" stars={9} title="Skvelé !" 
        text="Marek bol skvelý vodič, prišiel presne načas a celá cesta bola veľmi pohodlná. Komunikácia s ním bola hladká a vždy sa 
        držal dopravných predpisov. Cítil som sa bezpečne a efektívne sme dosiahli cieľovú destináciu. Rád s ním zase pojdem." 
        user="Petra4" date="8.3.2024" rev={aboutMe}/>
        <Review recommendation="1" stars={8} title="Určite zopakujem." 
        text="S Marekom bola cesta príjemná a rýchlo ubehla. Dodržiaval pravidlá spolujazdy a bol veľmi zdvorilý. Prispel 
        k pohodovej atmosfére počas celej jazdy. Určite odporúčam cestovať s Marekom, ak máte príležitosť." 
        user="Mária5" date="4.2.2024" rev={aboutMe}/>
         */}
        </>
    )
}