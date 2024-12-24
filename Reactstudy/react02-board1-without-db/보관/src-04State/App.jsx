import './App.css';
//State 사용을 위한 리엑트훅을 불러온다.
import { useState } from 'react';

//페이지가 없을때 임시로 사용하기 위한 컴포넌트
function ReadyComp(){
  return(
    <div>
      <h3>컴포넌트 준비중입니다^^*</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}

//매개변수 props를 통해 전달된값을 받아 사용할 수 있다.
//모든 페이지에서 공통적으로 사용하는 컴포넌트(타이틀만 변경됨)
function Header(props) {
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
    );
}

//목록의 네비게이션
function NavList(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  )
}

//내용보기의 네비게이션
function NavView(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;

      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{" "}

      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('delete');
      }}>삭제</a>
    </nav>
  )
}

//작성하기의 네비게이션
function NavWrite(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>
    </nav>
  );
}

function ArticleList(props){
  const lists =[];
  for(let i=0; i<props.boardData.length;i++){
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    );
  }
  return(
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
            {lists}
        </tbody>
      </table>
    </article>
  )
}

//게시판 읽기
function ArticleView(props){
  <article>
    <table id="boardTable">
      <colgroup>
      <col width="20%" /> <col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>작성자</th>
          <th>성유겸</th>
        </tr>
        <tr>
          <th>제목</th>
          <th>오늘은 React공부하는날</th>
        </tr>
        <tr>
          <th>날짜</th>
          <td>2023-05-05</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>열심히 배봅시당 <br/>열공합시당</td>
        </tr>
      </tbody>
    </table>
  </article>
}

//게시판 작성
function ArticleWrite(props){
  return(
    <article>
      <form>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer"/></td>
            </tr>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="title"/></td>
            </tr>
            <tr>
              <th>작성자</th>
              <td><input type="contents" cols="22" rows="3"/></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송"></input>
      </form>
    </article>
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

  //컴포넌트와 타이틀을 저장할 변수
  const [mode, setMode] = useState('list');
  
  //mode의 값에 따라 각 화면을 전환한다.
  let articleComp, navComp, titleVar;
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