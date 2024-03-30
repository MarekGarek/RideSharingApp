import { useState, useEffect, useContext } from 'react';
import MyToasts, { useToast} from '../components/MyToasts';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthProvider';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../css/TripComponent.css';

export default function TripComponent({bg, usage, data, fetchItems}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');
    const showToast = useToast();

    const [srcTime, setSrcTime] = useState();
    const [dstTime, setDstTime] = useState();
    const [date, setDate] = useState();

    const [trip, setTrip] = useState();
    const [seats, setSeats] = useState();
    const [trunk, setTrunk] = useState();
    const [payment, setPayment] = useState();
    const [passenger, setPassenger] = useState();

    useEffect(() => {
        setSrcTime(data?.srcTime.slice(0,5))
        setDstTime(data?.dstTime.slice(0,5))
        const date = new Date(data?.date);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        setDate(formattedDate);

        setTrip(data?.idTrip);
        setPassenger(auth.login);
        fetchPassangers();
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
            if (location.pathname === '/more-info') {
                navigate('/profile/current-ride');
            } else if (location.pathname === '/profile/current-ride') {
                fetchItems();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const passengerList = {
        passenger: passenger,
        trip: trip,
        seats: seats,
        trunkSpace: trunk,
        payment: payment
    }

    const postForm = async () => {
        try {
            const response = await axios.post('http://localhost:8080/passenger-list', passengerList,
            { headers: {'Authorization': `Bearer ${jwtToken}`}});
            showToast('success','Úspešne si sa prihlásil!','/profile/current-ride')
          } catch (error) {
            console.error(error);
            showToast('error', error.code);
          }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postForm();
        console.log(passengerList);
        setSeats(0);
        setTrunk(0);
    };

    //const [passangers, setPassangers] = useState([]);
    const [registered, setRegistered] = useState(false);
    const fetchPassangers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/passengers', {
                params: { id: data?.idTrip },
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            //setPassangers(response.data);
            const pom = response.data.some(p => p.passenger === auth.login)
            setRegistered(pom);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogOut = async () => {
        try {
            await axios.delete(`http://localhost:8080/passengers`,  {
                params: { id: data?.idTrip, passenger: auth.login},
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            handleClose();
            if (location.pathname === '/more-info') {
                navigate('/profile/current-ride');
            } else if (location.pathname === '/profile/current-ride') {
                fetchItems();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <MyToasts />
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
                { auth.login === data?.driver || registered ? 
                <>
                { auth.login !== data?.driver ?
                <>
                <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary"
                        onClick={() => {navigate(`/profile/current-ride`)}}>Odhlásiť sa</button>       
                </>
                : <></> }
                </> : 
                <>
                <Dropdown.Toggle className="btn btn-outline-light btn-floating m-1 btn-primary" id="dropdown-basic">
                Prihlásiť sa
                </Dropdown.Toggle>
                <form onSubmit={handleSubmit}>
                <Dropdown.Menu>
                <div className="my-drpdwn-menu">
                    <label htmlFor="pocetOsob">Počet osôb: &nbsp;&nbsp;&nbsp;</label>
                    <input id="pocetOsob" type="number" style={{width: '50px', margin: '1px'}} required min="1"
                            max={data?.seats - data?.reservedSeats} value={seats}
                            onChange={(e) => setSeats(e.target.value)}>
                    </input>
                    <label htmlFor="batozina">Batožina (l): &nbsp;&nbsp;&nbsp;</label>
                    <input id="batozina" type="number" style={{width: '50px', margin: '1px'}} required min="0"
                            max={data?.trunkSpace - data?.reservedTrunk} value={trunk}
                            onChange={(e) => setTrunk(e.target.value)}>
                    </input>
                    <div onClick={(e) => e.stopPropagation()}>
                        <label>Zaplatiť : &nbsp;</label> <br/>
                        <label>online&nbsp;</label>
                        <input type="radio" name="paymentMethod" value="online" required
                            onChange={() => setPayment("online")}/>
                        <label>&nbsp;&nbsp;&nbsp;hotovosť&nbsp;</label>
                        <input type="radio" name="paymentMethod" value="cash" required
                            onChange={() => setPayment("cash")}/>
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
                    <>
                    <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary"
                        onClick={handleShow}>Odhlásiť sa</button>
                    <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>Naozaj sa chceš odhlásiť z tejto cesty?</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleLogOut}>Áno, odhlásiť sa</Button>
                                <Button variant="secondary" onClick={handleClose}> Nie</Button>
                            </Modal.Footer>
                    </Modal>   
                    </> 
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