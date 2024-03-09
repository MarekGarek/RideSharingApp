import CarComponent from '../components/CarComponent';
import mazda from '../images/mazda.webp';
import ProfileComponent from '../components/ProfileComponent';
import TripComponent from '../components/TripComponent';

export default function MoreInfo() {
    return(
        <>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <br/>
                <h1 style={{backgroundColor: '#f7f7f7', width: '100%', textAlign: 'center'}}>Šofér</h1>
                <ProfileComponent hide={true}/>
                <h1 style={{backgroundColor: '#f7f7f7', width: '100%', textAlign: 'center'}}>Autíčko</h1>
                <CarComponent 
                    idcar="LV 502HE" model="Mazda 3" year="2008" 
                    seats="5" capacity="350" stk="25.5.2025" 
                    img={mazda} edit={false} hide={true} />
                <h1 style={{backgroundColor: '#f7f7f7', width: '100%', textAlign: 'center'}}>Cesta</h1>
            </div>
        </div>
        
        <TripComponent/>
        </>
    )
}