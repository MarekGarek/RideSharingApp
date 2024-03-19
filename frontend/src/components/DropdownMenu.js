import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';


function DropdownMenu() {
  const navigate = useNavigate();
  return (
    <Dropdown>
      <Dropdown.Toggle className="btn btn-outline-light btn-floating m-1 btn-primary" id="dropdown-basic">
        <i className="bi bi-person-circle "></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item type="button" style={{width: 'auto'}} onClick={() => navigate("/login")}> Prihlásiť </Dropdown.Item>
        <Dropdown.Item type="button" style={{width: 'auto'}} onClick={() => navigate("/register")}> Registrovať </Dropdown.Item>
        <Dropdown.Item type="button" style={{width: 'auto'}} onClick={() => navigate("/profile")}> Môj profil </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;