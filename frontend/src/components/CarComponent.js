import React, { useState } from 'react';
import '../css/Cars.css';

export default function CarComponent({idcar, model, year, seats, capacity, stk, img, edit, hide}) {
    console.log(edit);
    const [editMode, setEditMode] = useState(edit);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    
    return(
        <>
        {!hide ? (
        <>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        <br/>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h4>Upraviť parametre môjho auta: </h4>
            </div>
            <div className="grid-my-profile-heading-btn"> 
                <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        onClick={toggleEditMode}>{editMode ? 'Uložiť' : 'Upraviť'}</button>
                <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        >Zmazať</button>
            </div>
        </div>
        </>) : ''}

        <br/>


        <div className="grid-cars">
            <div className="grid-cars-photo">
                <img src={img} className="user-photo"/>
            </div>

            <div className="grid-cars-edit">
            {editMode ? (
                <>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <i className="bi bi-upload"></i>
                </label>
                <input id="file-upload" type="file" style={{display: 'none'}} />
                </>
                ) : (<></>)}   
            </div>

            <div className="grid-cars-idcar">
                <p className="my-profile-label">ŠPZ</p>
                {editMode ? (<input type="text"></input>) : (<><p>{idcar}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-model">
                <p className="my-profile-label">Model</p>
                {editMode ? (<input type="text"></input>) : (<><p>{model}</p><hr class="featurette-divider"></hr></>)}
                
            </div>
            <div className="grid-cars-year">
                <p className="my-profile-label">Ročník</p>
                {editMode ? (<input type="number"></input>) : (<><p>{year}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-seats">
                <p className="my-profile-label">Počet miest</p>
                {editMode ? (<input type="number"></input>) : (<><p>{seats}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-cars-capacity">
                <p className="my-profile-label">Batožinový priestor</p>
                {editMode ? (<input type="number"></input>) : (<><p>{capacity} l</p><hr class="featurette-divider"></hr></>)}
                
            </div>
            <div className="grid-cars-stk">
                <p className="my-profile-label">Platnosť STK do</p>
                {editMode ? (<input type="date"></input>) : (<><p>{stk}</p><hr class="featurette-divider"></hr></>)}
            </div>
        </div>
        <br/>
        </>
    )
}