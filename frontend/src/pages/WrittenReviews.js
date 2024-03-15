import Review from '../components/Review';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function WrittenReviews() {
    const aboutMe = "Recenzent: ";

    const loggedUser = "Marek14"; // TODO: zmeniť na authUser

    const [reviews, setReviews] = useState([]);
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/written-reviews', {params: {loggedUser: loggedUser}});
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
            await axios.delete(`http://localhost:8080/written-reviews/${id}`);
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

        {/*
        <Review recommendation="1" stars={7} title="Super" 
        text="Tomáš je spoľahlivý vodič, ktorý dodržuje čas a vie, ako efektívne navigovať v premávke. Jediné malé mínus bolo, 
        že auto nebolo úplne čisté. Napriek tomu by som cestoval s Tomášom znova, pretože hlavné kritériá boli splnené." 
        user="Tomáš1998" date="4.3.2024" rev={aboutMe}/>
        <Review recommendation="0" stars={4} title="Jazdu nezopakujem" 
        text="Bohužiaľ, s Emou to nebola najlepšia jazda. Prišla neskoro a zdalo sa, že má problém dodržiavať pravidlá cestnej premávky. 
        Cesta bola trochu stresujúca, a preto by som preferoval iného vodiča na budúce cesty." 
        user="Ema18" date="24.2.2024" rev={aboutMe}/>
        <Review recommendation="0" stars={3} title="Hrozné" 
        text="S Annou to bolo dosť komplikované. Nebola veľmi komunikatívna a celú cestu telefonovala, čo bolo rušivé. Okrem toho sme 
        museli niekoľkokrát zastaviť z jej osobných dôvodov, čo výrazne predĺžilo cestu. Radšej by som na budúce cestovala s niekým iným." 
        user="Anna1" date="22.2.2024" rev={aboutMe}/>
        */}
        </>
    )
}