export default function CreateRide() {
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
                        <a className="label-var">Marek4</a>
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
                        <input type='date' style={{width: '150px'}}></input>
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
                            <input type="text" style={{width: '150px'}}></input>
                            <input type="time" style={{width: '70'}}></input>
                        </div>
                        <div className="grid-towns-B">
                            <input type="text" style={{width: '150px'}}></input>
                            <input type="time" style={{width: '70'}}></input>
                        </div>
                    </div>
                </p>
                <hr class="featurette-divider"></hr>
            </div>

            <div className="grid-tripc-info">
                <a className="label-trpc">Dodatočné info: </a><br/>
                <textarea id="text" name="text" rows="4" cols="60" placeholder="Zadejte text..."></textarea>
            </div>

            <div className="grid-tripc-car">
                <p>
                    <div>
                        <a className="label-trpc">Auto: </a> 
                    </div>
                    <div>
                        <select style={{width: '150px',height: '30px'}}>
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
                        <input type='number'style={{width: '150px'}}></input>  
                    </div>
                </p>
            </div>

            <div className="grid-tripc-price">
                <p>
                    <div>
                        <a className="label-trpc">Voľná kapacita: </a>
                    </div>
                    <div>
                        <input type='number'style={{width: '150px'}}></input>  
                    </div>
                </p>
                <hr class="featurette-divider media-q"></hr>
            </div>

            <div className="grid-tripc-log" style={{marginBottom: '15px'}}>
                <div>
                        <a className="label-trpc">Cena: €</a> 
                    </div>
                    <div>
                        <input type='number'style={{width: '150px'}} step="0.2"></input>
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