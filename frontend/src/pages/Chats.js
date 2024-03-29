import React from 'react';
import '../css/Chats.css';
import img from '../images/late.webp';
import { useState } from 'react';


//            <a href="#" class="list-group-item list-group-item-action active py-3 lh-tight" aria-current="true">
//              <div class="d-flex w-100 align-items-center justify-content-between">
//                <strong class="mb-1">List group item heading</strong>
//                <small>Wed</small>
//              </div>
//              <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
//            </a>

export default function Chats() {
    const user = (name,active) => {
        return (
            <>
            <a role="button" className={`list-group-item list-group-item-action py-3 lh-tight ${active}`} aria-current="true">
                <div className="d-flex w-100 align-items-center justify-content-between" >
                    <strong className="mb-1">{name}</strong>
                </div>
            </a>
            </>
        )
    }

    const [index, setBool] = useState(false);
    const userMessage = (date,message,user,id) => {
        return (
            <>
            {index === id ? <p className="user-label">{date}</p> : '' }
            <p className="user-paragraph" onClick={()=>{setBool(index === id ? null : id)}}>
                {user}
                <span className="user-message">{message}</span>
            </p>
            </>
        )
    }

    const myMessage = (date,message,id) => {
        return (
            <>
            {index === id ? <p className="my-label">{date}</p> : '' }
            <p className="my-paragraph" onClick={()=>{setBool(index === id ? null : id)}}>
                <span className="my-message">{message}</span>
            </p>
            </>
        )
    }


    const [chat, setChat] = useState("active");
    const [sidebar, setSidebar] = useState();

    const switchPage = () => {
        if (chat === "active") {
            setChat("");
            setSidebar("active");
        } else {
            setChat("active");
            setSidebar("");
        }
    }

    return(
        <>
        <body className="chats-page">
        <h3 onClick={switchPage}> Zmeň sa </h3>
        <br/>
        <div className="grid-chat">
            <div className={`grid-chat-sidebar ${sidebar}`}>
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white users-style">
                    <div className="list-group list-group-flush border-bottom scrollarea">
        
                    {user("Thomas Rodriguez")}
                    {user("Joseph Davis")}
                    {user("Christopher Wilson")}
                    {user("James Smith","active")}
                    {user("Daniel Martinez")}
                    {user("David Jones")}
                    {user("Michael Johnson")}
                    {user("Richard Garcia")}
                    {user("Charles Miller")}
                    {user("William Brown")}
                    {user("David Jones")}
                    {user("Michael Johnson")}
            
                    </div>
                </div>
            </div>

            <div className={`grid-chat-chat users-style chat-box ${chat}`}>
                {userMessage("11.3.2024 18:00","Ahoj ako sa máš ?","Miro: ", 1)}
                {myMessage("11.3.2024 18:01","Dobre. Čo robíš ?",2)}
                {userMessage("11.3.2024 18:02","Pracujem na bakalárskej práci. Vytváram webovú aplikáciu. Momentálne pracujem na frontendovej časti, kde vytváram chatovaciu aplikáciu.","Fero: ", 3)}
                {myMessage("11.3.2024 18:03","Super držím palce nech sa darí.",4)}
                {userMessage("11.3.2024 18:00","Zajtrajšia cesta stále platí ?","",5)}
                {myMessage("11.3.2024 18:03","Jasné, všetko tak ako je napísané v príspevku.",6)}
                {userMessage("11.3.2024 18:00","Okej, tak zajtra.","",7)}

            </div>
            <div className={`grid-chat-submit ${chat}`}>
                <input type="text" className="input-chat"></input>
                <buttton className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary chat-btn">
                    <i class="bi bi-caret-right-fill"></i>
                </buttton>
            </div>
           
        </div>
        <br/>
        </body>
        </>
    )
}