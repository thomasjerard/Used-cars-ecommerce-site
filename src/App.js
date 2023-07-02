import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Buycars from './components/Buycars';
import Sidebar from './components/Sidebar';
import Sellcars from './components/Sellcars';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { UserProvider } from './global/UserContext';
import { ProductProvider } from './global/ProductContest';
import CarDetails from './components/CarDetails';
import UserProfile from './components/UserProfile';
import ChatApp from './pages/ChatApp';
import Dashboard from './components/Dashboard';

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
            <Route path="/cardetails" element={<CarDetails/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/messages" element={<ChatApp/>}/>
            <Route path="/savedcars" element={<Dashboard/>}/>
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
