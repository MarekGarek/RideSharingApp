import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../AuthProvider'

function DropdownMenu() {
  const navigate = useNavigate();
  const {auth,logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/home");
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className="btn btn-outline-light btn-floating m-1 btn-primary" id="dropdown-basic">
        <i className="bi bi-person-circle "></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {auth.isLogged ? 
        <>
          <Dropdown.Item type="button" style={{width: 'auto'}} onClick={() => navigate("/profile")}> Môj profil </Dropdown.Item>
          <Dropdown.Item type="button" style={{width: 'auto'}} onClick={handleLogout}> Odhlásiť sa </Dropdown.Item>
        </> : 
        <>
          <Dropdown.Item type="button" style={{width: 'auto'}} onClick={() => navigate("/login")}> Prihlásiť </Dropdown.Item>
          <Dropdown.Item type="button" style={{width: 'auto'}} onClick={() => navigate("/register")}> Registrovať </Dropdown.Item>
        </>
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;