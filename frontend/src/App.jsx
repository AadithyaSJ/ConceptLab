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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/laws" element={<LawsList />} />
        <Route path="/laws/:id" element={<LawDetail />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/score" element={<Score />} />
        <Route path="*" element={<div className="text-center mt-10 text-xl text-red-500">404 - Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
