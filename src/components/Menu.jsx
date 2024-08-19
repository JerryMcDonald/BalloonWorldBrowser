import { useNavigate } from 'react-router-dom';
import '../css/Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="menu-container">
      <button onClick={startGame}>Balloon World</button>
    </div>
  );
};

export default Menu;
