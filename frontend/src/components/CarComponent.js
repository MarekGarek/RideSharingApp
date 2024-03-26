import React, { useState, useEffect, useContext } from 'react';
import MyToasts, { useToast} from '../components/MyToasts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AuthContext from '../AuthProvider';
import axios from 'axios';
import '../css/Cars.css';

export default function CarComponent({car, edit, hide, deleteCar, fetchCars, onDelete}) {
    const {auth} = useContext(AuthContext);
    const [editMode, setEditMode] = useState(edit);
    const widthClass = !hide ? "" : "special-width";
    const showToast = useToast();

    const [unchanedIdCar, setUnchangedIdCar] = useState(car ? car.idCar : '');
    const [idCar, setIdCar] = useState('');
    const [owner, setOwner] = useState(auth.login);
    const [model, setModel ] = useState('');
    const [seats, setSeats] = useState('');
    const [stk, setStk] = useState('');
    const [img, setImg] = useState(car ? (car.img ? car.img : 'car.png') : 'car.png');
    const [year, setYear] = useState('');
    const [trunk, setTrunk] = useState('');

    useEffect(() => {
        if (car) {
            const date = new Date(car.stk);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            setStk(formattedDate);
            setIdCar(car.idCar);
            setModel(car.model);
            setYear(car.year);
            setSeats(car.seats);
            setTrunk(car.trunkSpace);
            setYear(car.modelYear);
            setImg(car.img);
        }
    }, [car]);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleDelete = () => {
        onDelete(idCar);
        handleClose();
      };

    const [btn, setBtn] = useState(false);

    const toggleEditMode = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditMode(!editMode);
    };

    function createFormData() {
        const formData = new FormData();
        formData.append('idCar', idCar);
        formData.append('owner', owner);
        formData.append('model', model);
        formData.append('seats', seats);
        formData.append('stk', stk);
        formData.append('modelYear', year);
        formData.append('trunkSpace', trunk);
    
        if (typeof img !== 'string') {
            formData.append('file', img);
        }
        return formData;
    }

    const jwtToken = localStorage.getItem('jwtToken');
    const postData = async () => {
        try {
            const formData = createFormData();
            const response = await axios.post('http://localhost:8080/cars', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (response.status == 201) {
                setBtn(true);
                showToast('success', 'Auto bolo úspešne pridané.', null, () => {deleteCar();fetchCars();})
            } else {
                showToast('error',response.status);
            }
          } catch (error) {
            if (error.response.status == 409) {
                showToast('error', 'Auto s rovnakou ŠPZ už existuje. Skontrolujte si svoju ŠPZ!');
            } else {
                console.error(error);
                showToast('error', error.code);
            }
          }
    };

    const putData = async () => {
        try {
            const formData = createFormData();
            const response = await axios.put(`http://localhost:8080/cars/${unchanedIdCar}`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
    
            if (response && response.status === 201) {
                setBtn(true);
                showToast('success', 'Údaje boli aktualizované.', null, () => {window.location.reload()})
            } else {
                showToast('error', 'Neznáma chyba');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                showToast('error', 'Konflikt...');
            } else {
                console.error(error);
                showToast('error', error.message || 'Došlo k chybe');
            }
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (unchanedIdCar.length > 0) {
            putData();
        } else {
            postData();
        }
    };
    
    const deleteModal = 
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Naozaj chceš zmazať auto?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Button variant="primary" onClick={handleDelete}>Áno, vymazať</Button>
            <Button variant="secondary" onClick={handleClose}>Nie</Button>
        </Modal.Footer>
    </Modal>;

    return(
        <>
        <MyToasts />
        <form onSubmit={handleSubmit} style={{backgroundColor: 'white'}}>
        {!hide ? (
        <>
        <br/>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h4>Upraviť parametre môjho auta: </h4>
            </div>
            <div className="grid-my-profile-heading-btn">
                { editMode ? (
                    <>                                              
                    <button type="submit" disabled={btn} className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary save-btn" >Uložiť</button>
                    <button type="button" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                            onClick={car ? handleShow : deleteCar}>Zmazať</button>
                    {deleteModal}
                    </>
                ) : (
                    <>
                    <button type="button" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        onClick={toggleEditMode}>Upraviť</button>
                    <button type="button" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        onClick={handleShow} >Zmazať</button>
                    {deleteModal}
                    </>
                )}
                
            </div>
        </div>
        </>) : ''}

        <br/>
        <div className={`grid-cars ${widthClass}`}>
            <div className="grid-cars-photo">
                <img src={typeof img === 'string' ? `http://localhost:8080/images/car-images/${img}` : (img ? URL.createObjectURL(img) : '')} className="user-photo" alt="User photo"/>
            </div>

            <div className="grid-cars-edit">
            {editMode ? (
                <>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <i className="bi bi-upload"></i>
                </label>
                <input id="file-upload" type="file" style={{display: 'none'}} onChange={(event) => setImg(event.target.files[0])}/>
                </>
                ) : (<></>)}   
            </div>

            <div className="grid-cars-idcar">
                <p className="my-profile-label">ŠPZ</p>
                {editMode ? (<input type="text" required minLength="7" maxLength="7" onChange={(e)=>{setIdCar(e.target.value)}}
                                value={idCar}/>
                ) : (<><p>{idCar}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-model">
                <p className="my-profile-label">Model</p>
                {editMode ? (<input type="text" required maxLength="45" onChange={(e)=>{setModel(e.target.value)}} value={model}/>
                ) : (<><p>{model}</p><hr class="featurette-divider"></hr></>)}
                
            </div>
            <div className="grid-cars-year">
                <p className="my-profile-label">Ročník</p>
                {editMode ? (<input type="number" required min="1980" max="2024" onChange={(e)=>{setYear(e.target.value)}} value={year}/>
                ) : (<><p>{year}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-seats">
                <p className="my-profile-label">Počet miest</p>
                {editMode ? (<input type="number" min="1" required onChange={(e)=>{setSeats(e.target.value)}} value={seats}/>
                ) : (<><p>{seats}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-capacity">
                <p className="my-profile-label">Batožinový priestor</p>
                {editMode ? (<input type="number" min="10" required onChange={(e)=>{setTrunk(e.target.value)}} value={trunk}/>
                ) : (<><p>{trunk} l</p><hr class="featurette-divider"></hr></>)}
                
            </div>
            <div className="grid-cars-stk">
                <p className="my-profile-label">Platnosť STK do</p>
                {editMode ? (<input type="date" required onChange={(e)=>{setStk(e.target.value)}} value={stk}/>
                ) : (<><p>{stk}</p><hr class="featurette-divider"></hr></>)}
            </div>
        </div>
        </form>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        <br/>
        </>
    )
}