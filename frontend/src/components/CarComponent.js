import React, { useState, useEffect } from 'react';
import axios from 'axios';
import car from '../images/car.png';
import '../css/Cars.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function CarComponent({idcar, model1, year1, seats1, trunk1, stk1, img1, edit, hide, deleteCar}) {
    const [editMode, setEditMode] = useState(edit);
    const widthClass = !hide ? "" : "special-width";

   

    const [idCar, setIdCar] = useState('');
    const [owner, setOwner] = useState('Marek14');
    const [model, setModel ] = useState('');
    const [seats, setSeats] = useState('');
    const [stk, setStk] = useState(stk1);
    const [img, setImg] = useState(img1);
    const [year, setYear] = useState('');
    const [trunk, setTrunk] = useState('');

    useEffect(() => {
        const date = new Date(stk);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        setStk(formattedDate);
    }, []);

    // useEffect(() => {
    //     if (cars) {
    //         setIdCar(cars.idCar);
    //         setModel(cars.model);
    //         setSeats(cars.seats);
    //         setStk(cars.stk);
    //         setImg(cars.img);
    //         setYear(cars.modelYear);
    //         setTrunk(cars.trunkSpace);
    //     }
    // }, [cars]);

    const toastSucc = (msg) => {
        toast.success(msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      };

    const toastErr = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const postData = async () => {
        try {
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

            const response = await axios.post('http://localhost:8080/cars', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status == 201) {
                toastSucc("Auto bolo úspešne pridané!");
            } else {
                toastErr(response.status);
            }
            toggleEditMode();
          } catch (error) {
            if (error.response.status == 409) {
                toastErr("Auto s rovnakou ŠPZ už existuje. Skontrolujte si svoju ŠPZ!");
            } else {
                console.error(error);
                toastErr(error.code);
            }
          }
    };

    // const putData = async () => {
    //     try {
    //         const response = await axios.put('http://localhost:8080/reviews', data);
    //         if (response.status == 200) {
    //             toastSucc("/profile/cars");
    //         } else {
    //             toastErr(response.status);
    //         }
            
    //       } catch (error) {
    //         console.error(error);
    //         toastErr(error.code);
    //       }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (false) {
            //putData();
            //setSubmited(true);
        } else {
            postData();
        }
    };
    
    return(
        <>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
        {!hide ? (
        <>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        <br/>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h4>Upraviť parametre môjho auta: </h4>
            </div>
            <div className="grid-my-profile-heading-btn">
                { editMode ? (
                    <>
                    <button type="submit" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" >Uložiť</button>
                    <button type="button" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                            onClick={deleteCar}>Zmazať</button>
                    </>
                ) : (
                    <>
                    <button type="button" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        onClick={toggleEditMode}>Upraviť</button>
                    <button type="button" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        >Zmazať</button>
                    </>
                )}
                
            </div>
        </div>
        </>) : ''}

        <br/>
        <div className={`grid-cars ${widthClass}`}>
            <div className="grid-cars-photo">
                <img src={typeof img === 'string' ? `http://localhost:8080/car-images/${img}` : (img ? URL.createObjectURL(img) : '')} className="user-photo" alt="User photo"/>
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
                />
                ) : (<><p>{idcar}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-model">
                <p className="my-profile-label">Model</p>
                {editMode ? (<input type="text" required maxLength="45" onChange={(e)=>{setModel(e.target.value)}}/>
                ) : (<><p>{model1}</p><hr class="featurette-divider"></hr></>)}
                
            </div>
            <div className="grid-cars-year">
                <p className="my-profile-label">Ročník</p>
                {editMode ? (<input type="number" required min="1980" max="2024" onChange={(e)=>{setYear(e.target.value)}}/>
                ) : (<><p>{year1}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-seats">
                <p className="my-profile-label">Počet miest</p>
                {editMode ? (<input type="number" required onChange={(e)=>{setSeats(e.target.value)}}/>
                ) : (<><p>{seats1}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-capacity">
                <p className="my-profile-label">Batožinový priestor</p>
                {editMode ? (<input type="number" required onChange={(e)=>{setTrunk(e.target.value)}}/>
                ) : (<><p>{trunk1} l</p><hr class="featurette-divider"></hr></>)}
                
            </div>
            <div className="grid-cars-stk">
                <p className="my-profile-label">Platnosť STK do</p>
                {editMode ? (<input type="date" required onChange={(e)=>{setStk(e.target.value)}}/>
                ) : (<><p>{stk}</p><hr class="featurette-divider"></hr></>)}
            </div>
        </div>
        </form>
        <br/>
        </>
    )
}