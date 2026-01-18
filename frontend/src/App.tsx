import { Navigate, Route, Routes, BrowserRouter } from 'react-router';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import { GlobalStyles } from './config/GlobalStyles';
import { ThemeProvider } from './Contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
