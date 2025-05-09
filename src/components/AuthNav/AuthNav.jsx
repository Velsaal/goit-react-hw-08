import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css'

export const AuthNav = () => {
  return (
    <div className={s.wrapper}>
      <NavLink to="/register">Rеgister</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};
