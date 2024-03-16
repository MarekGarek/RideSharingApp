import CarComponent from '../components/CarComponent';
import car from '../images/car.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cars() {
    
    const [newCars, setNewCars] = useState([]);
    const [ mapId, setMapId ] = useState(0);
    const [ owner, setOwner ] = useState('Marek14'); //TODO: logged user
    
    const generateCar = () => {
        const newCar = {
            id: mapId,
            component: <CarComponent edit={true} img1="car.png" deleteCar={() => deleteCar(mapId)} fetchCars={() => fetchCars()}/>,
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
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);
    
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
        {/* 
        <CarComponent idcar="LV 502HE" model1="Mazda 3" year1="2008" seats1="5" trunk1="350" stk1="25.5.2025" img1={mazda} edit={false} />
        */}
        {
            cars.map((car) => (
                <CarComponent
                  key={car.idCar}
                  idcar={car.idCar}
                  model1={car.model}
                  year1={car.modelYear}
                  seats1={car.seats}
                  stk1={car.stk}
                  img1={car.img}
                  trunk1={car.trunkSpace}
                  edit={false}
                />
              ))
        }
        
        
        
        {newCars.map(newCar => newCar.component)}
        </>
    )
}