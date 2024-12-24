import './App.css'
//라우터 처리를 위한 임포트
import { BrowserRouter} from 'react-router-dom';
import { Routes, Route, Link} from 'react-router-dom';

//모듈화 처리한 컴포넌트 임포트
import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

/**
라우터 처리를 위한 BrowserRouter 컴포넌트는 App 컴포넌트를
감싸는 형식으로 사용한다.
 */
function App() {
  return (
  <BrowserRouter>
      <Routes>
        {/* 첫 진입시에는 게시판의 목록을 렌더링한다. */}
        <Route path='/' element={<List/>} />
        <Route path='/list' element={<List/>} />
        <Route path='/view' element={<View/>} />
        <Route path='/write' element={<Write/>} />
        {/* 지정되지 않은 모든 경로에 대해서는 404 처리 */}
        <Route path='*' element={<NotFound/>} />
      </Routes>
  </BrowserRouter>
  );
}


export default App
