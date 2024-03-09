import img from '../images/man.png';
import React, { useState } from 'react';

export default function ProfileComponent({hide}) {
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <>
        {!hide ? (
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h3>Upraviť môj profil</h3>
            </div>
            <div className="grid-my-profile-heading-btn"> 
                <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        onClick={toggleEditMode}>{editMode ? 'Uložiť' : 'Upraviť'}</button>
            </div>
        </div>
        </>) : (<></>)}
        <br/>

        <div className="grid-my-profile">
            <div className="grid-my-profile-photo">
                <img src={img} className="user-photo"/>
            </div>
            <div className="grid-my-profile-edit">
            {editMode ? (
                <>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <i className="bi bi-upload"></i>
                </label>
                <input id="file-upload" type="file" style={{display: 'none'}} />
                </>
                ) : (<></>)}   
            </div>

            <div className="grid-my-profile-name">
                <p className="my-profile-label">Meno</p>
                {editMode ? (<input type="text"></input>) : (<><p>Marek</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-my-profile-surname">
                <p className="my-profile-label">Priezvisko</p>
                {editMode ? (<input type="text"></input>) : (<><p>Garek</p><hr class="featurette-divider"></hr></>)}
                
            </div>
            <div className="grid-my-profile-age">
                <p className="my-profile-label">Vek</p>
                {editMode ? (<input type="number"></input>) : (<><p>22</p><hr class="featurette-divider"></hr></>)}
            </div>
            <div className="grid-my-profile-rating">
                <p className="my-profile-label">Hodnotenie</p>
                <p>6/10</p>
                {!editMode ? <hr class="featurette-divider"></hr> : (<></>)}
            </div>
            <div className="grid-my-profile-about">
                <p className="my-profile-label">O mne</p>
                {editMode ? (
                <textarea className="text-area-width" id="text" name="text" rows="4" cols="50" placeholder="Zadejte text..."></textarea>
                ) : (<p className="my-profile-about">
                    Volám sa Marek. Mám 22 rokov. Študujem v Žiline na vysokej škole na fakulte riadenia a informatiky.
                    Konkrétne odbor Informačné a sieťové technológie. Moje koníčky sú lyžovanie, bicyklovanie a posilovanie.
                </p>)}
                
            </div>
        </div>
        </>
    );
}