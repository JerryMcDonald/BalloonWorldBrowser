// src/components/Menu.jsx
import { useNavigate } from 'react-router-dom';
import '../css/Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="menu-container">
      <h1>My Side-Scroller Game</h1>
      <button onClick={startGame}>Start Game</button>
      <button>Settings</button>
      <button>Credits</button>
    </div>
  );
};

export default Menu;