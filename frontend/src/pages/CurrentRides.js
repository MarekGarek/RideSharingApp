import TripComponent from '../components/TripComponent';

export default function CurrentRides() {
    return(
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Aktuálne jázdy</h1>
            </div>
        </div>
        <div className="history-trip-center">
            <TripComponent usage={3}/>
            <TripComponent usage={3} bg="#f7f7f7"/>
            <TripComponent usage={3}/>
        </div>
        </>
    )
}