import CarComponent from '../components/CarComponent';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cars() {
    
    const [newCars, setNewCars] = useState([]);
    const [ mapId, setMapId ] = useState(0);
    const [ owner, setOwner ] = useState('Marek14'); //TODO: logged user
    
    const generateCar = () => {
        const newCar = {
            id: mapId,
            component: <CarComponent edit={true} deleteCar={() => deleteCar(mapId)} fetchCars={() => fetchCars()}/>,
        };
        setNewCars([...newCars, newCar]);
        setMapId(mapId+1);
    };
    
    const deleteCar = (id) => {
        setNewCars(newCars.filter(c => c.id !== id));
    };

    const [cars, setCars] = useState([]);
    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:8080/cars', {params: {owner: owner}});
            setCars(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async (idCar) => {
        try {
            await axios.delete(`http://localhost:8080/cars/${idCar}`);
            fetchCars();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
        <div className="grid-my-profile-heading">
            <div className="grid-my-profile-heading-h1"> 
                <h1>Moje autá </h1>
            </div>
            <div className="grid-my-profile-heading-btn"> 
                <button className="btn btn-outline-light btn-floating m-1 btn-primary btn btn-primary" 
                    onClick={generateCar}>Nové auto</button>
            </div>
        </div>
        <hr class="featurette-divider" style={{borderWidth: '4px'}}></hr>
        {newCars.map(newCar => newCar.component)}
        {
            cars.map((car) => (
                <CarComponent
                  key={car.idCar}
                  car={car}
                  edit={false}
                  onDelete={handleDelete}
                />
              ))
        }
        </>
    )
}