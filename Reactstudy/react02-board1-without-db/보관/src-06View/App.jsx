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

  const [mode, setMode] = useState('list');

  //선택한 게시물의 일련번호를 저장. 최초 선택한 게시물이 없으므로 null로 초기화.
  const [no,setNo] = useState(null);

  //선택한 게시물의 객체를 저장할 변수 추가
  let articleComp, navComp, titleVar, selectRow;

  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardData={boardData}
      onChangeMode={(no)=>{
        console.log('선택한 게시물 번호:'+no);
        //화면을 '열람'으로 전환
        setMode('view');
        //선택한 게시물의 일련번호로 state변경
        setNo(no);
      }}></ArticleList>
  }else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>

    console.log("현재no:",no,typeof(no));
    //선택한 게시물의 일련번호와 일치하는 객체를 검색
    // for(let i=0; i<boardData.length ;i++){
    //   if(no===boardData[i].no){
    //     //일치하는 게시물이 있다면 변수에 저장
    //     selectRow = boardData[i];
    //   }
    // }

    /** 퀴즈] 일반 for문으로 작성된 부분을 reduce()함수로 수정해서 동일한
     * 결과가 출력되도록 구현하시오.
     */

    // 내가 푼 문제
    // boardData.reduce(function(pre,cur){
    //   if(no===cur.no){
    //     selectRow = boardData[no-1];
    //   }
    // },0);

    // 강의 답안
    selectRow = boardData.reduce(function(pre,cur){
      if(no===cur.no){
        pre = cur;
      }
      return pre;
    },{});


    // 검색된 게시물을 props를 통해 자식 컴포넌트로 전달
    articleComp = <ArticleView selectRow={selectRow}></ArticleView>
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