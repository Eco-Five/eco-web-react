// https://olive-jam.tistory.com/45
import { legacy_createStore, combineReducers } from 'redux'
import counter from '../modules/counter'
import sessionInfo from '../modules/sessionInfo'

const rootReducer = combineReducers({
   // 작성한 reducer(모듈)을 store에 연결
   counter: counter,
   sessionInfo: sessionInfo,
})

const store = legacy_createStore(rootReducer)

export default store

/**
 * 1. combineReducers()
 * - 여러 개의 독립적인 reducer를 하나의 루트 reducer로 결합하는 유틸리티 함수입니다.
 * - 각 reducer는 서로 독립적으로 특정 상태 조각(state slice)을 관리합니다.
 * - 객체 형태로 전달된 reducer들이 각각의 상태 트리를 관리하며, 이를 하나의 상태 객체로 병합합니다.
 *
 * 예:
 * const rootReducer = combineReducers({
 *   user: userReducer,     // user 상태를 관리하는 리듀서
 *   posts: postReducer     // posts 상태를 관리하는 리듀서
 * });
 */

/**
 * 2. legacy_createStore()
 * - Redux 스토어를 생성하는 함수입니다. 상태(state)를 저장하고 관리합니다.
 * - 스토어는 상태 트리를 저장하며, action을 통해 상태를 변경하는 역할을 합니다.
 * - Redux 4.1.0 이상에서는 `legacy_createStore`는 주로 레거시 코드를 지원하기 위해 사용됩니다.
 * - 새로운 프로젝트에서는 Redux Toolkit의 `configureStore`를 사용하는 것이 권장됩니다.
 *
 * 스토어 생성 시 필요한 인수:
 * - 첫 번째 인수: `rootReducer` (필수) - 상태 변경 로직이 정의된 리듀서 함수입니다.
 * - 두 번째 인수: 초기 상태 (선택 사항) - 애플리케이션의 초기 상태를 정의합니다.
 * - 세 번째 인수: 미들웨어나 enhancer (선택 사항) - 미들웨어를 추가하거나 스토어 동작을 확장합니다.
 */

/**
 * Store의 주요 역할:
 * - 상태 트리(state tree)를 저장합니다.
 * - `dispatch(action)` 메서드를 통해 상태를 업데이트합니다.
 * - `getState()` 메서드로 현재 상태를 조회할 수 있습니다.
 * - 구독 메서드 (`subscribe`)를 통해 상태 변화에 반응할 수 있습니다.
 * 
 * Redux는 Reducer를 포함한 스토어라고 할 수 있습니다.
 * 우리가 어떤 action을 일으키는 행위(요청, 요구)을 dispatch라고 하며,
 * action을 일으켰을 때, reducer가 자동 실행됩니다.
 * 
 * 그리고 그 action에 맞게 데이터를 수정해줍니다.
 * 즉, store에 있는 데이터를 바꿔주는 역할을 reducer가 합니다.
 */