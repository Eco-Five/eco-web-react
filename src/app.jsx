import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/section/Header';
import Footer from './components/section/Footer';
import About from './pages/home/About';
import MyPage from "./pages/mypage/MyPage";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Find = lazy(() => import("./pages/find/Find"));


//============= Header와 Footer를 제외한 레이아웃===============//
function AppLayout({ children }) {
  const location = useLocation();

  // FindAuth 페이지에서 Header와 Footer를 제외
  const excludeHeaderFooter = location.pathname === "/login/find";

  return (
    <>
      {!excludeHeaderFooter && <Header />}
      <>{children}</>
      {!excludeHeaderFooter && <Footer />}
    </>
  );
}
//============= Header와 Footer를 제외한 레이아웃===============//



function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/find" element={<Find />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </AppLayout>
      </Suspense>
    </BrowserRouter>
  );
}


export default App