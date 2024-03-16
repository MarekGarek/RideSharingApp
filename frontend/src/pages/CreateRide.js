import '../css/CreateRide.css';
import { useEffect, useState, useRef } from "react";


export default function CreateRide() {

    const [autor, setAutor] = useState('Marek14');
    const [date, setDate] = useState('');
    const [srcTown, setSrcTown] = useState('');
    const [dstTown, setDstTown] = useState('');
    const [srcTime, setSrcTime] = useState('');
    const [dstTime, setDstTime] = useState('');
    const [seats, setSeats] = useState('');
    const [trunk, setTrunk] = useState('');
    const [price, setPrice] = useState('');
    const [info, setInfo] = useState('');


    return(
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Vytvor novú jazdu </h1>
            </div>
            <div className="grid-my-profile-heading-btn"> 
            </div>
        </div>

        <div className="history-trip-center">        
        <div className="grid-tripc">
            <div className="grid-tripc-author">
                <p>
                    <div>
                        <a className="label-trpc">Autor:</a> 
                    </div>
                    <div>
                        <a className="label-var">{autor}</a>
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
                        <input type='date' className="long-inputs" required
                               onChange={(e)=>{setDate(e.target.value)}}/>
                    </div>
                </p>
            </div>

            <div className="grid-tripc-towns">
                <p>
                    <div className="grid-towns">
                        <div className="grid-towns-A"><a className="label-trpc">Odkial:</a></div>
                        <div className="grid-towns-B"><a className="label-trpc">Kam: </a></div>
                    </div>
                    <div className="grid-towns">
                        <div className="grid-towns-A">
                            <input type="text" className="long-inputs" required min="3" max="45"
                                   onChange={(e)=>{setSrcTown(e.target.value)}}/>
                            <input type="time" className="time-inputs" required
                                   onChange={(e)=>{setSrcTime(e.target.value)}}/>
                        </div>
                        <div className="grid-towns-B">
                            <input type="text" className="long-inputs" required min="3" max="45"
                                   onChange={(e)=>{setDstTown(e.target.value)}}/>
                            <input type="time" className="time-inputs" required
                                   onChange={(e)=>{setDstTime(e.target.value)}}/>
                        </div>
                    </div>
                </p>
                <hr class="featurette-divider"></hr>
            </div>

            <div className="grid-tripc-info">
                <a className="label-trpc">Dodatočné info: </a><br/>
                <textarea id="text" name="text" rows="4" cols="60" placeholder="Zadejte text..." className="textarea-input"
                            required max="2000" onChange={(e)=>{setInfo(e.target.value)}}/>
            </div>

            <div className="grid-tripc-car">
                <p>
                    <div>
                        <a className="label-trpc">Auto: </a> 
                    </div>
                    <div>
                        <select className="long-inputs">
                            <option>Mazda 3</option>
                            <option>Peugeot 207</option>
                        </select>
                    </div> 
                    <hr class="featurette-divider"></hr>
                </p>
            </div>

            <div className="grid-tripc-capacity">
                <p>
                    <div>
                        <a className="label-trpc">Voľné miesta: </a>
                    </div>
                    <div>
                        <input type='number'className="long-inputs" min="1" max="4" /* poc miest auta-1 */
                               onChange={(e)=>{setSeats(e.target.value)}} />  
                    </div>
                </p>
            </div>

            <div className="grid-tripc-price">
                <p>
                    <div>
                        <a className="label-trpc">Voľná kapacita: </a>
                    </div>
                    <div>
                        <input type='number'className="long-inputs" required
                               onChange={(e)=>{setTrunk(e.target.value)}}/>
                    </div>
                </p>
                <hr class="featurette-divider media-q"></hr>
            </div>

            <div className="grid-tripc-log" style={{marginBottom: '15px'}}>
                <div>
                        <a className="label-trpc">Cena: €</a> 
                    </div>
                    <div>
                        <input type='number' className="long-inputs" step="0.2" required max="999"
                               onChange={(e)=>{setPrice(e.target.value)}}/>
                    </div>
            </div>

            <div className="grid-tripc-more" style={{textAlign: 'right'}}>
                <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" >Vytvoriť</button>
            </div>
        </div>
        </div>
        </>
    )
}