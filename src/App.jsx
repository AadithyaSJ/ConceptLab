import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Chatbot from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LoaderSpinner from './components/LoadingSpinner';

function AppContent() {
  const [atTop, setAtTop] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation();

  // Watch for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Watch for scroll
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loader on route change
  useEffect(() => {
    setRouteLoading(true);
    const timeout = setTimeout(() => setRouteLoading(false), 400); // short delay
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const isQuizPage = location.pathname.startsWith('/quiz');

  if (authLoading || routeLoading) {
    return <LoaderSpinner />;
  }

  return (
    <>
      <Navbar atTop={atTop} user={user} />
      <Background />
      <div className={`transition-all duration-300 ${atTop ? 'mt-15' : 'mt-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/laws" element={<ProtectedRoute><LawsList /></ProtectedRoute>} />
          <Route path="/laws/:id" element={<ProtectedRoute><LawDetail /></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/score" element={<ProtectedRoute><Score /></ProtectedRoute>} />
          <Route path="*" element={
            <div className="text-center mt-10 text-xl text-red-500">404 - Page Not Found</div>
          }/>
        </Routes>
      </div>
      <Footer />
      {!isQuizPage && <Chatbot />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
