import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../css/Profile.css';

export default function Profile() {
    return(
        <>
            
        <div className="grid-container-profile">
            <div className="grid-container-profile-sidebar">
                <Sidebar/>
            </div>
            <div className="grid-container-profile-page">
                <Outlet/>
            </div>
        </div>
        </>
    )
}