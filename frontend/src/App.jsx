import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LawsList from './pages/LawsList';
import LawDetail from './pages/LawDetail';
import Quiz from './pages/Quiz';
import Score from './pages/Score';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background from './components/background';

function App() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <Navbar atTop={atTop} />
      <Background />
      
      {/* Add top margin to content when navbar is floating */}
      <div className={`transition-all duration-300 ${atTop ? 'mt-15' : 'mt-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laws" element={<LawsList />} />
          <Route path="/laws/:id" element={<LawDetail />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/score" element={<Score />} />
          <Route
            path="*"
            element={
              <div className="text-center mt-10 text-xl text-red-500">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
