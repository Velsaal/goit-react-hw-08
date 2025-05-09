import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../Layout/Layout'
import  HomePage   from '../../pages/HomePage/HomePage';
import  RegisterPage  from '../../pages/RegisterPage/RegisterPage';
import  LoginPage  from '../../pages/LoginPage/LoginPage';
import  ContactsPage  from '../../pages/ContactsPage/ContactsPage';
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';


export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user...</p>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />} />
        <Route path="login" element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />} />
        <Route path="contacts" element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};