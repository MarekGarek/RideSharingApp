export default function PassChange() {
    return(
        <>
        <br></br>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        <br></br>
        <h3>Zmeniť heslo</h3>
        <div>
            <div>
                <p className="my-profile-label">Staré</p>
                <input type="password"></input>
            </div>

            <div>
                <p className="my-profile-label">Nové</p>
                <input type="password"></input>
                
            </div>
            <div>
                <p className="my-profile-label">Zopakuj</p>
                <input type="password"></input>
            </div>
            <br></br>
            <div>
            <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary">Zmeniť</button>
            </div>
        </div>
        </>
    )
}