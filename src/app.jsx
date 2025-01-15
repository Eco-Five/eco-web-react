import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./pages/mypage/MyPage";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const FindAuth = lazy(() => import("./pages/findAuth/FindAuth"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login/find" element={<FindAuth />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// # 프로젝트 디렉터리에서 실행
// npm cache clean --force
// rm -rf node_modules/.cache
// rm -rf build
