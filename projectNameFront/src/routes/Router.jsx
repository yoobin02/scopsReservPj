import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/scops/main" element={<LoginPage />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
