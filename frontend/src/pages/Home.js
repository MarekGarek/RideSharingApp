import '../css/Home.css'
import HomeCard from '../components/HomeCard';
import safe from '../images/safe.webp';
import fast from '../images/fast.webp';
import late from '../images/late.webp';
import handshake from '../images/handshake.webp';

export default function Home() {
    return (
        <>
        <br/>
        <div className="home-page-main-picture" >
            <p className="home-page-slogan">
                 <span className="slogan">Zdieľanou jazdou k šetrnosti , udržateľnosti a bezpečnosti.</span>
            </p>
        </div>
        <div>
            <br></br>
            <p role="button" className="home-page-slogan">
                 <span className="slogan">Nájdi cestu tu !</span>
            </p>
        </div>
        
        <hr class="featurette-divider"></hr>
        <HomeCard
        header1="Bezpečnosť a jednoduchosť"
        text1="V súčasnom svete cestovania, kde bezpečnosť a jednoduchosť sú na prvom mieste, ponúkame riešenie,
        ktoré eliminuje riziká spojené s neoverenými jazdami a komplikovanými procesmi rezervácie.
        Naša platforma zaručuje bezpečné a jednoduché plánovanie vašich ciest, čím šetrí váš čas aj energiu."
        pic1={safe}
        header2="Lacno a rýchlo"
        text2="Cestovanie nemusí byť drahé ani zdĺhavé.Zdieľajte jazdu s ostatnými a rozdeľte sa o náklady 
        a zároveň získajte efektívny spôsob, ako sa dostať tam, kde potrebujete."
        pic2={fast}/>

        <hr class="featurette-divider"></hr>

        <HomeCard
        header1="Na čas a bez prestupov"
        text1="Zabudnite na meškajúce spoje, ktoré na seba nenadväzujú. Naša služba zabezpečuje priame 
        spojenie medzi vaším východiskovým a cieľovým bodom. Umožňujeme vám cestovať efektívne,
        na čas a bez zbytočných zdržaní, aby ste mohli využiť každú minútu svojho dňa."
        pic1={late}
        header2="Spoznaj nových ľudí"
        text2="Cestovanie s nami poskytuje viac ako len prepravu z bodu A
        do bodu B. Je to príležitosť stretnúť zaujímavých ľudí a nadviazať nové priateľstvá."
        pic2={handshake}/>
        
        </>
    )
}