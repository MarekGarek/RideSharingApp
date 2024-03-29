import '../css/TripComponent.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useContext} from 'react';
import AuthContext from '../AuthProvider';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function TripComponent({bg, usage, data, fetchItems}) {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');

    const [srcTime, setSrcTime] = useState();
    const [dstTime, setDstTime] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        setSrcTime(data?.srcTime.slice(0,5))
        setDstTime(data?.dstTime.slice(0,5))
        const date = new Date(data?.date);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        setDate(formattedDate);
    }, [data]);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleDelete = () => {
        deleteTrip();
        handleClose();
    };

    const deleteTrip = async () => {
        try {
            const id = data?.idTrip;
            await axios.delete(`http://localhost:8080/trip/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            fetchItems();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <div className="grid-tripc" style={{backgroundColor: bg}}>
            <div className="grid-tripc-author">
                <p>
                    <div>
                        <a className="label-trpc">Šofér:</a> 
                    </div>
                    <div>
                        <a className="label-var">{data?.driver}</a>
                    </div>
                </p>
                <hr class="featurette-divider"></hr>
            </div>
            

            <div className="grid-tripc-date">
                <p>
                    <div>
                        <a className="label-trpc">Dátum cesty: </a> 
                    </div>
                    <div>
                        <a className="label-var">{date}</a>
                    </div>
                </p>
            </div>

            <div className="grid-tripc-towns">
                <p>
                    <div className="grid-towns">
                        <div className="grid-towns-A"><a className="label-trpc">Odkiaľ:</a></div>
                        <div className="grid-towns-B"><a className="label-trpc">Kam: </a></div>
                    </div>
                    <div className="grid-towns">
                        <div className="grid-towns-A">
                            <a className="label-var">{data?.srcTown} </a>
                            <a className="label-time"> {srcTime}</a>
                        </div>
                        <div className="grid-towns-B">
                            <a className="label-var">{data?.dstTown} </a>
                            <a className="label-time"> {dstTime}</a>
                        </div>
                        
                       
                    </div>
                </p>
                <hr class="featurette-divider"></hr>
            </div>

            <div className="grid-tripc-info">
                <a className="label-trpc">Dodatočné informácie: </a> 
                <p className="p-info-trip" style={{fontFamily: 'cursive'}}>{data?.info}</p>
            </div>

            <div className="grid-tripc-car">
                <p>
                    <div>
                        <a className="label-trpc">Auto: </a> 
                    </div>
                    <div>
                        <a className="label-var">{data?.model}</a>
                    </div> 
                    <hr class="featurette-divider"></hr>
                </p>
            </div>

            <div className="grid-tripc-capacity">
                <p>
                    <div>
                        <a className="label-trpc">Miesta &nbsp;a&nbsp; kapacita: </a>
                    </div>
                    <div>
                        <a className="label-var">{data?.reservedSeats}/{data?.seats} &nbsp;&nbsp; {data?.reservedTrunk}/{data?.trunkSpace}l</a>    
                    </div>
                </p>
            </div>

            <div className="grid-tripc-price">
                <p>
                    <div>
                        <a className="label-trpc">Cena: </a> 
                    </div>
                    <div>
                        <a className="label-var">{data?.price}</a>
                    </div>
                </p>
                <hr class="featurette-divider media-q"></hr>
            </div>

            <div className="grid-tripc-log">
            { usage === 1 ? (
            <>
            <Dropdown>
                { auth.login ? 
                <>
                { auth.login === data?.driver ? 
                <>
                </> : 
                <>
                <Dropdown.Toggle className="btn btn-outline-light btn-floating m-1 btn-primary" id="dropdown-basic">
                Prihlásiť sa
                </Dropdown.Toggle>
                <form>
                <Dropdown.Menu>
                <div className="my-drpdwn-menu">
                    <label htmlFor="pocetOsob">Počet osôb: &nbsp;&nbsp;&nbsp;</label>
                    <input id="pocetOsob" type="number" style={{width: '50px', margin: '1px'}} required min="1"/>

                    <label htmlFor="batozina">Batožina (l): &nbsp;&nbsp;&nbsp;</label>
                    <input id="batozina" type="number" style={{width: '50px', margin: '1px'}} required min="0"/>

                    <div onClick={(e) => e.stopPropagation()}>
                        <label>Zaplatiť : &nbsp;</label> <br/>
                        <label>online&nbsp;</label>
                        <input type="radio" name="paymentMethod" value="online" required/>
                        <label>&nbsp;&nbsp;&nbsp;hotovosť&nbsp;</label>
                        <input type="radio" name="paymentMethod" value="cash" required/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Odoslať</button>
                </div>
                </Dropdown.Menu>
                </form>
                </>}
                </> : 
                <>
                <button className="btn btn-outline-light btn-floating m-1 btn-primary"
                        onClick={() => {navigate(`/login`)}}>
                    Prihlásiť sa
                </button>
                </>}
                
            </Dropdown>
            
            </>) : (
                <>
                { usage === 2 ? (auth && auth.login !== data?.driver &&(
                    <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary"
                    onClick={() => {navigate(`/profile/edit-review?reviewer=${data?.driver}`)}}>Napíš recenziu</button>
                )) : (auth && auth.login !== data?.driver ? (
                    <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary">Odhlásiť sa</button>
                ) : (
                    <>
                    <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary"
                    onClick={() => {navigate(`/profile/create-ride?id=${data?.idTrip}`)}}>Upraviť</button>
                    <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary"
                    onClick={handleShow}>Zmazať</button>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Naozaj chceš zmazať túto cestu?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleDelete}>Áno, vymazať</Button>
                            <Button variant="secondary" onClick={handleClose}> Nie</Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                ))}
                </>
            )}
            

            </div>

            <div className="grid-tripc-more">
                <p role='button' style={{fontFamily: 'cursive'}} onClick={() => {navigate(`/more-info?driver=${data?.driver}&car=${data?.car}&id=${data?.idTrip}&usage=${usage}`)}}>Viac info...</p>
            </div>
        </div>
        </>
    )
}