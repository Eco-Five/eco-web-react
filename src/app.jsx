import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/section/Header';
import Footer from './components/section/Footer';
import About from './pages/home/About';

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Find = lazy(() => import("./pages/find/Find"));
const Register = lazy(() => import("./pages/register/Register"));

const MyPage = lazy(() => import("./pages/mypage/MyPage"));
const Payment = lazy(() => import("./pages/payment/Payment"));
const Product = lazy(() => import("./pages/product/Product"));
const Board = lazy(() => import("./pages/board/Board"));
const BoardDetail = lazy(() => import("./pages/board/BoardDetail"));
const Question = lazy(() => import("./pages/question/Question"))
const QuestionDetail = lazy(() => import("./pages/question/QuestionDetail"))

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
            <Route path="/payment" element={<Payment />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product" element={<Product />} />
            <Route path="/board" element={<Board />} />
            <Route path='/board/:b_no' element={<BoardDetail />} />
            <Route path='/question' element={<Question />} />
            <Route path='/question/:q_no' element={<QuestionDetail />} />
          </Routes>
        </AppLayout>
      </Suspense>
    </BrowserRouter>
  );
}


export default App