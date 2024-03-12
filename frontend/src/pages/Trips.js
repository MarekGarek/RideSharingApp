import '../css/Trips.css';
import TripComponent from '../components/TripComponent';

export default function Trips() {
    return(
        <>
        <p className="home-page-slogan" style={{marginTop: '10px'}}>
            <span className="slogan">Vyhľadaj cestu : </span>
        </p>

        <div className="grid-trip">
            <div className="grid-trip-switch">
                <i role="button" class="bi bi-arrow-down-up" style={{fontSize: '25px'}}></i>
            </div>
            <div className="grid-trip-void"></div>
            <div className="grid-trip-from">
                <label className="labels-design"> Odkiaľ </label> <br/>
                <input type="text" className="inputs-design" />
            </div>

            <div className="grid-trip-to">
                <label className="labels-design"> Kam </label> <br/>
                <input type="text" className="inputs-design" />
            </div>

            <div className="grid-trip-date">
                <label className="labels-design"> Dátum </label> <br/>
                <input type="date" className="inputs-design" />
            </div>

            <div className="grid-trip-time">
                <label className="labels-design"> Čas </label> <br/>
                <input type="time" className="inputs-design" />
            </div>

            <div className="grid-trip-search">
                <i role="button" class="bi bi-search" style={{fontSize: '25px'}}></i>
                <label className="labels-design" role="button" style={{fontSize: '20px'}}> &nbsp;Hľadaj  </label>
            </div>
        </div>

        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>

        <p className="home-page-slogan">
            <span className="slogan">Dostupné cesty : </span>
        </p>

        <TripComponent usage={1}/>
        <TripComponent usage={1} bg="#f7f7f7"/>
        <TripComponent usage={1}/>
        
        </>
    )
}