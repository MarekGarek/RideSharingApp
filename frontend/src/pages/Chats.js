import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../AuthProvider'
import axios from 'axios';
import '../css/Chats.css';

export default function Chats() {
    const {auth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('jwtToken');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const idFromUrl = query.get('id');
    const [roomId, setRoomId] = useState(idFromUrl);

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
        if (idFromUrl) {
            switchPage();
            if (window.innerWidth > 768) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo(115, 115);
            }
            setActiveChatter(idFromUrl);
            fetchMessages(idFromUrl);
        }
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

    useEffect(() => {
        if (roomId !== null) {
            const interval = setInterval(() => {
                fetchMessages(roomId);
            }, 2000);
        
            return () => clearInterval(interval);
        }
      }, [roomId]);

    const [activeChatter, setActiveChatter] = useState();
    const [name, setName] = useState(" ");
    const handleClick = (id,name) => {
        setRoomId(id);
        setActiveChatter(id);
        fetchMessages(id);
        switchPage();
        setName(name);
    };

    const chatboxRef = useRef(null);
    useEffect(() => {
        if (chatboxRef.current) {
          const { scrollHeight, clientHeight } = chatboxRef.current;
          chatboxRef.current.scrollTop = scrollHeight - clientHeight;
        }
      }, [messages]);

      
      const [text, setText] = useState();
      const postMessage = async () => {
        if (text?.length > 0) {
            try {
                const response = await axios.post('http://localhost:8080/messages', 
                {
                    user: auth.login,
                    room: roomId,
                    message: text,
                    date: new Date().toISOString(),
                },
                { headers: {'Authorization': `Bearer ${jwtToken}`}});
                fetchMessages(roomId);
                setText('');
              } catch (error) {
                console.error(error);
              }
        }
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
                            <div>
                            <a role="button" 
                                className={`list-group-item list-group-item-action py-3 lh-tight ${activeChatter === ch?.room ? 'active' : ''}`} 
                                aria-current="true"
                                key={ch?.room}
                                onClick={() => handleClick(ch?.room,ch?.name)} style={{backgroundColor: '#f7f7f7'}}
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
                            </div>
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

            <div className={`grid-chat-chat users-style chat-box ${chat}`} ref={chatboxRef} style={{ overflowY: 'auto'}}>
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
                <input type="text" className="input-chat" onChange={(e) => setText(e.target.value)} value={text}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              postMessage(e);
                            }
                          }}></input>
                <buttton type="submit" className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary chat-btn" onClick={postMessage}>
                    <i class="bi bi-caret-right-fill"></i>
                </buttton>
            </div>
        </div>
        <br/>
        </body>
        </>
    )
}