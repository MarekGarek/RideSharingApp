import CarComponent from '../components/CarComponent';
import mazda from '../images/mazda.webp';
import ProfileComponent from '../components/ProfileComponent';
import TripComponent from '../components/TripComponent';

export default function MoreInfo() {

    const car = {
        idCar: "LV502HE",
        stk: "2.12.2025",
        modelYear: "2015",
        trunkSpace: "340",
        model: "Mazda 3",
        seats: "5",
        img: "car.png"
    }

    return(
        <>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <br/>
                <h1 style={{backgroundColor: '#f7f7f7', width: '100%', textAlign: 'center'}}>Šofér</h1>
                <ProfileComponent hide={true}/>
                <h1 style={{backgroundColor: '#f7f7f7', width: '100%', textAlign: 'center'}}>Autíčko</h1>
                <CarComponent car={car} edit={false} hide={true} />
                <h1 style={{backgroundColor: '#f7f7f7', width: '100%', textAlign: 'center'}}>Cesta</h1>
            </div>
        </div>
        
        <TripComponent/>
        </>
    )
}