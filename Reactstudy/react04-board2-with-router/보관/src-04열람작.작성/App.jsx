import './App.css'
//라우터 처리를 위한 임포트
// import { BrowserRouter} from 'react-router-dom';
import { Routes, Route, useNavigate} from 'react-router-dom';
import{ useState } from 'react';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

const nowDate = ()=>{
  //현재날짜
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0"+(1+dateObj.getMonth())).slice(-2);
  var day =("0"+ dateObj.getDate()).slice(-2);
  return year + "-"+month+"-"+day;
}

function App() {
  //데이터로 사용할 객체형 배열 생성
  //작성 처리를 위해 기존 배열을 state로 변경
  const [boardData, setBoardData] = useState([
    {no: 1, title: "오늘은 리액트 공부하는 날", writer: "낙짜쌤", date: "2023-01-01",
    contents: "리액트를 뽀개봅시다."},
    {no: 2, title: "어제는 자바스크립스 공부했어", writer: "유겸이", date: "2023-03-03",
    contents: "자바스크립트는 할게 너무 많아요"},
    {no: 3, title: "내일은 프로젝트 해야지", writer: "개똥이", date: "2023-05-05",
    contents: "프로젝트는 뭘 만들어 볼까?"}
  ]);
  
  //시퀀스용 state 생성. 초기값은 4로 설정.
  const [nextNo, setNextNo] = useState(4);

  //작성 완료 후 페이지 이동을 위한 Hook
  const navigate = useNavigate();

  return (<>
  {/* 라우터 처리를 위한 BrowserRouter 컴포넌트를 주석처리함 */}
  {/*<BrowserRouter>*/}
    <div className="App">
      <Routes>
        {/* 데이터로 생성한 배열을 Props로 자식컴포넌트로 전달한다. */}
        <Route path='/' element={<List boardData={boardData}/>} />
        <Route path='/list' element={<List boardData={boardData}/>} />
        {/* 열람의 경우 게시물의 상세번호를 통해 객체를 선택해야 하므로 중첩라우터로
        구현하고, 일련번호의 경우 :no로 잓성되어있다. */}
        <Route path='/view' element={<View boardData={boardData}/>} >
          <Route path=':no' element={<View boardData={boardData}/>}/>
        </Route>
        {/* Write 컴포넌트 내에서 글쓰기 처리를 할 수 있도록 App컴포넌트에서
        생성한 모든 State와 관련함수를 Props로 전달한다. */}
        <Route path='/write' element={<Write
          boardData={boardData} setBoardData={setBoardData}
          nextNo={nextNo} setNextNo={setNextNo}
          navigate={navigate} nowDate={nowDate}
        />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </div>
    {/*</BrowserRouter>*/}
  </>);
}

export default App
