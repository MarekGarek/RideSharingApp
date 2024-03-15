import { useNavigate } from 'react-router-dom';
import '../css/Review.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

export default function Review({date,user,title,text,recommendation,stars,rev,id, onDelete}) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleDelete = () => {
    onDelete(id);
    handleClose();
  };

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
                <button className="edit-review" onClick={() => {navigate(`/profile/edit-review?id=${id}`)}}>
                    <i class="bi bi-pen"></i> 
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="delete-review" onClick={handleShow}>
                    <i className="bi bi-x-lg"></i>
                </button>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title>Naozaj chceš zmazať túto recenziu?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleDelete}>
                        Áno, vymazať
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Nie
                    </Button>
                    </Modal.Footer>
                </Modal>
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