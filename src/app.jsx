import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/section/Header';
import Footer from './components/section/Footer';
import About from './pages/home/About';
import MyPage from "./pages/mypage/MyPage";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const FindAuth = lazy(() => import("./pages/findAuth/FindAuth"));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/find" element={<FindAuth />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}


export default App