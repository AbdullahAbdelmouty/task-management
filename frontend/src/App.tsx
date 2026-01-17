import { Navigate, Route, Routes, BrowserRouter } from "react-router";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import { GlobalStyles } from "./config/GlobalStyles";
import AntThemeProvider from "./config/AntThemeProvider";
import { lightTheme } from "./config/theme";

function App() {
  return (
    <AntThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AntThemeProvider>
  );
}

export default App;
