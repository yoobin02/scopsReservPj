import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import ReservationPage from '../pages/ReservationPage';
import SongRegisterPage from '../pages/SongRegisterPage';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/scops/login" element={<LoginPage />} />
        <Route path="/scops/main" element={<MainPage />} />
        <Route path="/scops/reservation" element={<ReservationPage />} />
        <Route path="/scops/songRegister" element={<SongRegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
