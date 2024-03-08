import Review from '../components/Review';

export default function WrittenReviews() {
    const aboutMe = "Recenzent: ";

    return(
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Napísané recenzie</h1>
            </div>
        </div>

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
        
        </>
    )
}