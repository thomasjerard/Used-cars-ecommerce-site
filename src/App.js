import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Buycars from './pages/Buycars';
import Sidebar from './components/Sidebar';
import Sellcars from './pages/Sellcars';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { UserProvider } from './global/UserContext';
import { ProductProvider } from './global/ProductContest';
import CarDetails from './pages/CarDetails';
import UserProfile from './pages/UserProfile';
import ChatApp from './pages/ChatApp';
import Dashboard from './pages/Dashboard';
import Soldcars from './pages/Soldcars';

import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
    <ChatContextProvider>
      <UserProvider>
      <ProductProvider>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/buycars" element={<Buycars />} />
            <Route path="/sellcars" element={<Sellcars />} />
            <Route path="/cardetails/:carId" element={<CarDetails/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/messages" element={<ChatApp/>}/>
            <Route path="/savedcars" element={<Dashboard/>}/>
            <Route path="/soldcars" element={<Soldcars/>}/>
          </Routes>
        </Router>
      </ProductProvider>
      </UserProvider>
      </ChatContextProvider>
  </AuthContextProvider>
    </div>
  );
}

export default App;
