import CarComponent from '../components/CarComponent';
import mazda from '../images/mazda.webp';
import car from '../images/car.png';

export default function Cars() {
    
    //nove auto onClick pridá prázdny CarComponent ktorý sa bude napĺňať údajmy
    
    return (
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Moje autá </h1>
            </div>
            <div className="grid-my-profile-heading-btn"> 
                <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary"
                        
                    >Nové auto</button>
            </div>
        </div>

        <CarComponent idcar="LV 502HE" model="Mazda 3" year="2008" seats="5" capacity="350" stk="25.5.2025" img={mazda} edit={false} />
        <CarComponent edit={true} img={car}/>
        </>
    )
}