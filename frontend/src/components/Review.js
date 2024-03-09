import { useNavigate } from 'react-router-dom';
import '../css/Review.css';

export default function Review({date,user,title,text,idreviews,recommendation,stars,rev}) {
    const navigate = useNavigate();

    let background = "";
    if (recommendation == 1) {
        background = "greenBG";
    } else if(recommendation == 0) {
        background = "redBG";
    }

    function drawStars(stars) {
        let fillStars,halfStars,emptyStars = 0;
        let fill = `<i class="bi bi-star-fill"></i>`;
        let half = `<i class="bi bi-star-half"></i>`;
        let empty = `<i class="bi bi-star"></i>`;
        
        fillStars = Math.floor(stars / 2);
        halfStars = stars % 2;
        emptyStars = 5 - (fillStars + halfStars);
        
        let result = "";
        for (let i = 0; i < fillStars; i++) {
            result += fill;
        }

        for (let i = 0; i < halfStars; i++) {
            result += half;
        }
        for (let i = 0; i < emptyStars; i++) {
            result += empty;
        }

        return result;
    }

    return (
        <>
        <hr class="featurette-divider custom-divider"></hr>
        <br></br>
        <div className={`grid-reviews ${background}`}>
            <div className="review" dangerouslySetInnerHTML={{ __html: drawStars(stars) }} />
            <div className="editik">
            {rev == "Recenzent: " ? (
            <>
                <button className="edit-review" onClick={() => {navigate("/profile/edit-review")}}> 
                    <i class="bi bi-pen"></i> 
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="delete-review"> 
                    <i class="bi bi-x-lg"></i>
                </button>
            </>) : null }
            </div>
                
            <div className="header">{title}</div>
            <div className="comment">{text}</div>

            { 
            recommendation == 1 ? 
            <div className="bool greenBG">Odporúča</div>
            : 
            <div className="bool redBG">Neodporúča</div>
            }
            
            <div className={`user ${background}`}>{rev} {user}</div>
            <div className={`date ${background}`}>{date}</div>
        </div>
        <br/>
        </>       
    )
}