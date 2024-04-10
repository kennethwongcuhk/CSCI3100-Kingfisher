import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"
import { useColorContext } from "./hooks/useColorContext"

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tweet from './pages/Tweet';
import User from './pages/User';
import AllUser from './pages/AllUser';

function App() {
  const { user } = useAuthContext()
  const { color } = useColorContext()

  return (
    <div className="App" data-theme={color}>
       <BrowserRouter>
        {user && <Navbar />}
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/tweet/:id"
              element={<Tweet />}
            />
            <Route
              path="/user/list"
              element={<AllUser />}
            />
            <Route
              path="/user/:username"
              element={<User />}
            />
          </Routes>
        </div>
        {user && <footer><div className="dummy-footer">testing123</div></footer>}
      </BrowserRouter>
    </div>
  );
}

export default App;
