import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import '../css/Main.css'

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
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
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