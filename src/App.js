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

function App() {
  return (
    <div className="App">
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
          </Routes>
        </Router>
      </ProductProvider>
      </UserProvider>
    </div>
  );
}

export default App;
