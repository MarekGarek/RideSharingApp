import TripComponent from '../components/TripComponent';

export default function RideHistory() {
    return(
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>História jázd</h1>
            </div>
        </div>
        <div className="history-trip-center">
            <TripComponent/>
            <TripComponent bg="#f7f7f7"/>
            <TripComponent/>
        </div>
        </>
    )
}