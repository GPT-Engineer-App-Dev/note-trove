import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Notes from "./pages/Notes.jsx";
import Note from "./pages/Note.jsx";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<PrivateRoute element={Notes} />} />
        <Route path="/note/:id" element={<PrivateRoute element={Note} />} />
      </Routes>
    </Router>
  );
}

export default App;
