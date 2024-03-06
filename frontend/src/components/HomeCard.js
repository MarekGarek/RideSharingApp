import '../css/HomeCard.css';

export default function HomeCard({pic1, pic2, header1, header2, text1, text2}) {
    return (
        <>
        <div className="home-card-grid-container">
            <div className="home-card-item1">
                <img className="home-card-img" src={pic1} alt="logo"/>
            </div>
            <div className="home-card-item2">
                <h4>{header1}</h4>
                <p>{text1}</p>
            </div>
        </div>

        <hr class="featurette-divider"></hr>

        <div className="home-card-grid-container">
            <div className="home-card-item3">
                <h4>{header2}</h4>
                <p>{text2}</p>    
            </div>  
            <div className="home-card-item4">
                <img className="home-card-img" src={pic2} alt="logo"/>
            </div>
        </div>
        </>
    )
}