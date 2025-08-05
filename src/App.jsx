import { useEffect } from 'react'
import Home from '../src/pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    // smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  
  return (
      <Router>
        <Routes>
          <Route path='/' element={ <Home /> }/>
        </Routes>
      </Router>
  );
}

export default App;
