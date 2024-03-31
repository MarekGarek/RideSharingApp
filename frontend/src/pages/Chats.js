import { useState, useEffect, useContext } from 'react';
import AuthContext from '../AuthProvider'
import axios from 'axios';
import '../css/Chats.css';

export default function Chats() {
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');

    const formatDate = (d) => {
        const date = new Date(d);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    }

    const [index, setBool] = useState(false);
    const userMessage = (date,message,id,user) => {
        return (
            <>
            {index === id ? <p className="user-label">{formatDate(date)}</p> : '' }
            <p className="user-paragraph" onClick={()=>{setBool(index === id ? null : id)}}>
                <span className="user-username">{user}</span><br/>
                <span className="user-message">{message}</span>
            </p>
            </>
        )
    }

    const myMessage = (date,message,id) => {
        return (
            <>
            {index === id ? <p className="my-label">{formatDate(date)}</p> : '' }
            <p className="my-paragraph" onClick={()=>{setBool(index === id ? null : id)}}>
                <span className="my-message">{message}</span>
            </p>
            </>
        )
    }


    const [chat, setChat] = useState();
    const [sidebar, setSidebar] = useState("active");

    const switchPage = () => {
        if (chat === "active") {
            setChat("");
            setSidebar("active");
        } else {
            setChat("active");
            setSidebar("");
        }
    }

    const [chatters, setChatters] = useState([]);
    const fetchCatters = async () => {
        try {
            const response = await axios.get('http://localhost:8080/chatters', {
            params: { user: auth.login },
            headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
            setChatters(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCatters();
    }, [auth.login, jwtToken]);

    const [messages, setMessages] = useState([]);
    const fetchMessages = async (id) => {
        try {
            const response = await axios.get('http://localhost:8080/messages', {
            params: { room: id },
            headers: { 'Authorization': `Bearer ${jwtToken}` }
        });
            setMessages(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [activeChatter, setActiveChatter] = useState(null);
    const [name, setName] = useState(" ");
    const handleClick = (id,name) => {
        setActiveChatter(id);
        fetchMessages(id);
        switchPage();
        setName(name);
    };

    return(
        <>
        <body className="chats-page">
        
        <br/>
        <div className="grid-chat">
            <div className={`grid-chat-sidebar ${sidebar}`}>
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white users-style">
                    <div className="list-group list-group-flush border-bottom scrollarea">
                    
                    {chatters.map((ch) => {
                        return (
                            <>
                            <a role="button" 
                                className={`list-group-item list-group-item-action py-3 lh-tight ${activeChatter === ch?.room ? 'active' : ''}`} 
                                aria-current="true"
                                key={ch?.room}
                                onClick={() => handleClick(ch?.room,ch?.name)}
                            >
                                <div className="d-flex w-100 align-items-center justify-content-between" >
                                    <strong className="mb-1">
                                        {ch?.name != null ? 
                                        <>
                                        {ch?.name} <a className="grid-chat-idTrip"> &nbsp;&nbsp; #{ch?.trip}</a>
                                        </> 
                                        : ch?.user}
                                    </strong>
                                </div>
                            </a>
                            </>
                        );
                        })}

                    </div>
                </div>
            </div>
            {chat == "active" ? 
                <button onClick={switchPage} className="button-switch-chat btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary"> 
                    Zobraziť chaty  
                </button> : "" 
            }

            <div className={`grid-chat-chat users-style chat-box ${chat}`}>
            {messages.map((m) => {
                return (
                    <>
                    {!name ? 
                    <>
                    {m.user === auth.login ? myMessage(m.date, m.message, m.idMessage) : userMessage(m.date, m.message,m.idMessage)}
                    </>
                    : 
                    <>
                    {m.user === auth.login ? myMessage(m.date, m.message, m.idMessage) : userMessage(m.date, m.message,m.idMessage,m.user)}
                    </>
                    }
                    </>
                )
            })}
                
                
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