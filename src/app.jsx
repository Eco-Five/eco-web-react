import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

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
const Board = lazy(() => import("./pages/board/Board"))
const BoardWrite = lazy(() => import("./pages/board/BoardWrite"))
const NoticeBoard = lazy(() => import("./pages/notice/NoticeBoard"))
const ReadNotice = lazy(() => import("./pages/notice/ReadNotice"))
const UpdateNotice = lazy(() => import("./pages/notice/UpdateNotice"))
const WriteNotice = lazy(() => import("./pages/notice/WriteNotice"))

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
            <Route path="/board" element={<Board />} />
            <Route path="/board/write" element={<BoardWrite />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/product" element={<Product />} />
            <Route path='/question' element={<Question />} />
            <Route path="/payment/result" element={<PaymentResult />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/game" element={<Game />} />
            <Route path="/notice" element={<NoticeBoard />} />
            <Route path="/notice/read/:id" element={<ReadNotice />} />
            <Route path="/notice/update/:id" element={<UpdateNotice />} />
            <Route path="/notice/write" element={<WriteNotice />} />
          </Routes>
        </AppLayout>
      </Suspense>
    </BrowserRouter>
  );
}


export default App;