import { Navigate, Route, Routes, BrowserRouter } from "react-router";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { GlobalStyles } from "./config/GlobalStyles";
function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
