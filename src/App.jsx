// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/menu.jsx';

import GameCanvas from './components/GameCanvas.jsx'; // Placeholder for your game component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<GameCanvas />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;