import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/AppBar';
import { Toaster } from 'react-hot-toast';

 export const Layout = () => {
  return (
    <div>
      <AppBar />
      <main>
        <Outlet />
        <Toaster position="top-right"/>
      </main>
    </div>
  );
};

