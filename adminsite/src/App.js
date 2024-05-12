
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Single from "./Pages/Single";
import Home from './Pages/Home';
import Write from './Pages/Write';
// import Navbar from "./Components/Navbar";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/single" element={<Single/>}/>
        <Route path="/write" element={<Write/>}/>
      </Routes>
    </Router>
  );
}

export default App;
