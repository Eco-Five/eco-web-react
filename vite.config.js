import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': '/src' }, // 필요 시 경로 별칭 설정
            extensions: ['.js', '.jsx', '.json'], // 확장자 우선 순위
  },
  server: {
    // 포트번호 변경
    port: 3456,
    // 서버 프록시 설정
    proxy: {
      '/api': {
        target: 'https://localhost:5678',  // 프록시할 대상 서버 : Node.js 백엔드 서버 주소
        changeOrigin: true,   // 요청 헤더의 Origin을 Node.js 서버로 변경
        secure: false,
        // Vite에서 /api/users로 요청하면 Node.js 서버에서는 /users로 전달됩니다.
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거
      },
      '/users': {
        target: 'https://localhost:5678',  // 프록시할 대상 서버 : Node.js 백엔드 서버 주소
        changeOrigin: true,   // 요청 헤더의 Origin을 Node.js 서버로 변경
        secure: false,
        // Vite에서 /api/users로 요청하면 Node.js 서버에서는 /users로 전달됩니다.
        rewrite: (path) => path.replace(/^\/users/, ''), // '/users'를 제거
      }
    }
  }
});
