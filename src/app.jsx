import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/section/Header';
import Footer from './components/section/Footer';
import About from './pages/home/About';

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Find = lazy(() => import("./pages/find/Find"));
const MyPage = lazy(() => import("./pages/mypage/MyPage"));
const Product = lazy(() => import("./pages/product/Product"));
const Question = lazy(() => import('./pages/question/Question'))
const Header = lazy(() => import("./components/section/Header"))
const Footer = lazy(() => import("./components/section/Footer"))
const About = lazy(() => import("./pages/home/About"))
const Payment = lazy(() => import("./pages/payment/Payment"))
const PaymentResult = lazy(() => import("./pages/payment/PaymentResult"))
const Register = lazy(() => import("./pages/register/Register"))
const Game = lazy(() => import("./pages/reactgame/Game"))

//============= Header와 Footer를 제외한 레이아웃===============//
function AppLayout({ children }) {
  const location = useLocation()
  
  // 페이지 변경 시, 화면 렌더링 상태값 변경
  const hideHeaderFooter = location.pathname === "/login/find"

  return (
    <>
      {hideHeaderFooter ? null : <Header />}
      <div>{children}</div>
      {hideHeaderFooter ? null : <Footer />}
    </>
  )
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
            <Route path="/register" element={<Register />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/product" element={<Product />} />
            <Route path='/question' element={<Question />} />
            <Route path="/payment/result" element={<PaymentResult />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </AppLayout>
      </Suspense>
    </BrowserRouter>
  );
}


export default App