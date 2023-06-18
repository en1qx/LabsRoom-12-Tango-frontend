import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "./redux/slices/Auth"; 

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    if (window.confirm('Вы дейтсвительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
