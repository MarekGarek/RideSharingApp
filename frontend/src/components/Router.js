import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from './Profile';
import MyProfile from '../pages/MyProfile';
import Cars from '../pages/Cars';
import WrittenReviews from '../pages/WrittenReviews';
import ReviewsAboutMe from '../pages/ReviewsAboutMe';
import Chats from '../pages/Chats';
import RideHistory from '../pages/RideHistory';
import EditReview from '../pages/EditReview';
import Trips from '../pages/Trips';
import MoreInfo from '../pages/MoreInfo';
import '../css/Main.css'
import CreateRide from '../pages/CreateRide';

export default function Router() {
    
    const Layout = () => {
        return (
          <>
          <div id="page-container">
            <Header/>
            <div style={{ flex: 1 }}>
             <Outlet/>
            </div>
            <Footer/>  
          </div>
          </>
        )
      };
    
    const BrowserRoutes = () => {
        return (
            <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="home" element={<Home />} />
                        <Route path="/" element={<Home />} />
                        <Route path="chats" element={<Chats />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="profile" element={<Profile />}>
                            <Route path="" element={<MyProfile />} />
                            <Route path="cars" element={<Cars />} />
                            <Route path="written-reviews" element={<WrittenReviews />} />
                            <Route path="reviews-about-me" element={<ReviewsAboutMe />} />
                            <Route path="edit-review" element={<EditReview />} />
                            <Route path="create-ride" element={<CreateRide />} />
                            <Route path="ride-history" element={<RideHistory />} />
                        </Route>
                        <Route path="trips" element={<Trips />} />
                        <Route path="more-info" element={<MoreInfo />} />    
                    </Route>
                </Routes>
            </BrowserRouter>
            </>
        )
    };

    return (
        <BrowserRoutes/>
    )
}