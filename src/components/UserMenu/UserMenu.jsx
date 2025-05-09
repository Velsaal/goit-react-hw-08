import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import s from './UserMenu.module.css'


export const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  return (
    <div className={s.wrapper}>
      <p className={s.text}>Welcome, {name}</p>
      <button onClick={() => dispatch(logout())} className={s.btn}>Logout</button>
    </div>
  );
};
