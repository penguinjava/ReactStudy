import './App.css';
import { useState } from 'react';

import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from './components/article/ArticleWrite';

//준비중 컴포넌트
function ReadyComp(){
  return(
    <div>
      <h3>컴포넌트 준비중입니다^^*</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}

//제목 컴포넌트
function Header(props) {
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
    );
}

function App() {
  const boardData = [
    {
      no: 1,
      title: "오늘은 리액트 공부하는 날",
      writer: "낙짜쌤쌤",
      date: "2023-01-01",
      contents: "리액트를 뽀개봅시다.",
    },
    {
      no: 2,
      title: "어제는 자바스크립스 공부했어",
      writer: "유겸이",
      date: "2023-03-03",
      contents: "자바스크립트는 할게 너무 많아요",
    },
    {
      no: 3,
      title: "내일은 프로젝트 해야지",
      writer: "개똥이",
      date: "2023-05-05",
      contents: "프로젝트는 뭘 만들어 볼까?",
    },
    {
      no: 4,
      title: "하하하핳",
      writer: "개똥이",
      date: "2023-12-20",
      contents: "프로젝트는 뭘 만들어 볼까?",
    },
  ];
  /** 화면 전환을 위한 state생성. 변수명은 mode,초기값은 list, 변경시 상요할
   * 함수는 setMode()로 지정
   */
  const [mode, setMode] = useState('list');

  //컴포넌트와 타이틀을 저장할 변수
  let articleComp, navComp, titleVar;

  //mode의 값에 따라 각 화면을 전환한다.
  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardData={boardData}
      onChangeMode={(no)=>{
        console.log('선택한 게시물 번호:'+no);
        setMode('view');
      }}></ArticleList>
  }else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>
    articleComp = <ArticleView></ArticleView>
  }else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite></ArticleWrite>
  }else{
    //mode의 값이 없는경우 '준비중'을 화면에 표시
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }

  //mode의 변화에 따른 컴포넌트를 렌더링
  return (
    <div className="App">
      <Header title={titleVar}></Header>
      {navComp}
      {articleComp}
    </div>
  );
}

export default App