import React, { useState, useEffect } from 'react';
import MyToasts, { useToast} from '../components/MyToasts';
import {useContext} from 'react';
import AuthContext from '../AuthProvider'
import axios from 'axios';

export default function ProfileComponent({hide, info, width}) {
    const [editMode, setEditMode] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');
    const {auth} = useContext(AuthContext);
    const showToast = useToast();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [img, setImg] = useState('man.png');

    useEffect(() => {
        if (info) {
            setName(info.name);
            setSurname(info.surname);
            setAge(info.age == "null" ? "" : info.age);
            setAbout(info.aboutMe == "null" ? "" : info.aboutMe);
            setImg(info.img ? info.img : 'man.png');
            setEmail(info.email);
        }
    }, [info]);

    const toggleEditMode = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditMode(!editMode);
    };

    function createFormData() {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('age', age);
        formData.append('aboutMe', about);
    
        if (typeof img !== 'string') {
            formData.append('file', img);
        }
        return formData;
    }

    const [btn, setBtn] = useState(false);
    const putData = async () => {
        try {
            const formData = createFormData();
            const response = await axios.put(`http://localhost:8080/info/${auth.login}`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (response && response.status === 200) {
                setBtn(true);
                showToast('success', 'Údaje boli aktualizované.', null, () => {window.location.reload();})
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        putData();
    };

    return (
        <>
        <MyToasts />
        <form onSubmit={handleSubmit}>
        {!hide ? (
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h3>Upraviť môj profil</h3>
            </div>
            <div className="grid-my-profile-heading-btn">

            { editMode ? (                                            
                    <button type="submit" disabled={btn} className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary save-btn" >Uložiť</button>
                ) : (
                    <button type="button" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                        onClick={toggleEditMode}>Upraviť</button>)
            }
            </div>
        </div>
        </>) : (<></>)}
        <br/>

        <div className="grid-my-profile">
            <div className="grid-my-profile-photo">
            <img src={typeof img === 'string' ? `http://localhost:8080/images/user-images/${img}` : (img ? URL.createObjectURL(img) : '')} className="user-photo" alt="User photo"/>
            </div>
            <div className="grid-my-profile-edit">
            {editMode ? (
                <>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <i className="bi bi-upload"></i>
                </label>
                <input id="file-upload" type="file" style={{display: 'none'}} onChange={(event) => setImg(event.target.files[0])}/>
                </>
                ) : (<></>)}   
            </div>

            <div className="grid-my-profile-name">
                <p className="my-profile-label">Meno</p>
                {editMode ? (
                <input type="text" required maxLength={45} minLength={3}
                    onChange={(e)=>{setName(e.target.value)}} value={name}/>
                    ) : (
                <><p>{name}</p><hr class="featurette-divider"></hr></>)}
            </div>

            <div className="grid-my-profile-surname">
                <p className="my-profile-label">Priezvisko</p>
                {editMode ? (
                <input type="text" required maxLength={45} minLength={3}
                onChange={(e)=>{setSurname(e.target.value)}} value={surname}/>
                ) : (
                <><p>{surname}</p><hr class="featurette-divider"></hr></>)}
            </div>
            <div className="grid-my-profile-age">
                <p className="my-profile-label">Vek</p>
                {editMode ? (
                <input type="number" required min={18} max={100}
                onChange={(e)=>{setAge(e.target.value)}} value={age}/>
                ) : (
                <><p>{age}</p><hr class="featurette-divider"></hr></>)}
            </div>
            <div className="grid-my-profile-rating">
                <p className="my-profile-label">Email</p>
                <p>{email}</p>
                {!editMode ? <hr class="featurette-divider"></hr> : (<></>)}
            </div>
            <div className={`grid-my-profile-about ${width}`}>
                <p className="my-profile-label">O mne</p>
                {editMode ? (
                <textarea className="text-area-width" id="text" name="text" rows="4" cols="50" placeholder="Zadejte text..."
                onChange={(e)=>{setAbout(e.target.value)}} value={about} maxLength={1000}/>
                ) : (
                <p className="my-profile-about">{about}</p>)}
            </div>
        </div>
        </form>
        </>
    );
}