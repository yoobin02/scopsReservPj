import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/scops/main" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
