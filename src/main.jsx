import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'

// Provider는 컴포넌트와 스토어를 연결 관리하는 컴포넌트 입니다.
import store from './redux/config/configStore.js'
import { Provider } from 'react-redux'

// Provider는 컴포넌트와 스토어를 연결 관리하는 컴포넌트 입니다.
import store from './redux/config/configStore.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
