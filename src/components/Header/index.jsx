import React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/Auth';
import { logout } from '../../redux/slices/Auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы точно хотите выйти?')) {
      dispatch(logout())
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          {/* <Link className={styles.logo} to="/posts">
            <div>LabsRoom</div>
          </Link> */}
          <a className={styles.logo} href="/posts">
            <div className={styles.logo}>LabsRoom</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
