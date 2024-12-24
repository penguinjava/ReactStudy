import './App.css';
import { useState } from 'react';

import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import NavEdit from './components/navigation/NavEdit';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from './components/article/ArticleWrite';
import ArticleEdit from './components/article/ArticleEdit';

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
  /** 작성을 위해서는 기존의 객체형 배열을 state로 변환해야 한다. 데이터의
   * 추가, 삭제가 있을때 새로운 렌더링이 되야하기 때문이다.
  */
  const [boardData, setBoardData] = useState([
    {no: 1, title: "오늘은 리액트 공부하는 날", writer: "낙짜쌤쌤", date: "2023-01-01",
    contents: "리액트를 뽀개봅시다."},
    {no: 2, title: "어제는 자바스크립스 공부했어", writer: "유겸이", date: "2023-03-03",
    contents: "자바스크립트는 할게 너무 많아요"},
    {no: 3, title: "내일은 프로젝트 해야지", writer: "개똥이", date: "2023-05-05",
    contents: "프로젝트는 뭘 만들어 볼까?"},
    {no: 4, title: "하하하핳", writer: "개똥이", date: "2023-12-20",
    contents: "프로젝트는 뭘 만들어 볼까?"},
  ]);

  const [mode, setMode] = useState('list');

  //선택한 게시물의 일련번호를 저장. 최초 선택한 게시물이 없으므로 null로 초기화.
  const [no,setNo] = useState(null);

  //새로운 게시물 작성시 사용할 시퀀스 용도의 state 생성
  const [nextNo, setNextNo] = useState(4);

  //선택한 게시물의 객체를 저장할 변수 추가
  let articleComp, navComp, titleVar, selectRow;

  if(mode==='list'){
    titleVar = '게시판-목록(props)';

    //수정의 네비는 '뒤로' 또는  '목록'
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

    articleComp = <ArticleWrite writeAction={(t,w,c)=>{
      console.log("App.js",t,w,c);

      //작성일을 Date객체를 통해 생성
      let dateObj = new Date();
      var year = dateObj.getFullYear();
      //getMonth() : 0~11까지를 반환하므로 +1해야 현재 월을 구할 수 있음
      var month = ("0"+(1 + dateObj.getMonth())).slice(-2);
      var day = ("0" + dateObj.getDate()).slice(-2);
      /**
      월과 일이
        한자리인 경우에는 01과 같이 설정되고
        두자리인 경우에는 031과 같이 문자열이 생성되므로 끝에서 두자리만 잘라낸다.
      따라서 0000-00-00의 포맷으로 날짜를 생성할 수 있다.
       */

      let nowDate = year + "-" + month +"-"+day;

      /** 추가할 객체를 생성. 일련번호는 시퀀스용 state인 nextNo를 사용한다. */
      let addBoardData = {no:nextNo, title:t, writer:w, contents:c, date:nowDate};

      //추가방법1
      //스프레드 연산자로 복사본 배열 데이터를 하나 생성한다.
      let copyBoardData = [...boardData];
      //복사된 배열에 새로운 객체를 추가한다.
      copyBoardData.push(addBoardData);
      //복사된 배열을 통해 state를 변경한다.
      setBoardData(copyBoardData);
      /**배열의 복사본을 만들면 메모리에는 새로운 배열이 하나 생성된다. 복사본에
       * 데이터를 추가한 후 이를 통해 state를 변경한다. 그러면 새롭게 생성된 배열의
       * 참조값을 통해 state를 변경하게 되므로 React는 변화를 감지하여 새로운 렌더링을
       * 하게된다.
       */

      //추가방법2
      // boardData.push(addBoardData)
      // console.log(boardData)
      // setBoardData(boardData);
      /** 이경우에는 배열 데이터의 참ㅁ조값에 대한 변화가 없으므로 React는
       * 변화를 인식하지 못하여 state를 변경해도 새로운 렌더링이 되지않는다.
       */
      

      //일련번호로 사용하는 state를 1증가
      setNextNo(nextNo+1);
      //글쓰기가 완료되면 화면을 '목록'으로 전환
      setMode('list');
    }}></ArticleWrite>;
  }else if(mode==='delete'){
    //삭제1(권장)
    //빈 배열을 생성
    let newBoardData = [];
    //데이터로 사용중인 객체형 배열의 크기만큼 반복
    for(let i=0;i<boardData.length;i++){
      //삭제할 객체를 제외한 나머지를 새로운 배열에 추가
      if(no !== boardData[i].no){
        //따라서 삭제할 객체는 배열에 추가되지 않는다.
        newBoardData.push(boardData[i]);
      }
    }
    //새롭게 생성된 배열을 통해 state를 변경한다.
    setBoardData(newBoardData);

    //삭제2
    /** 원본 배열에서 splice 함수를 통해 선택되  */
    //for(let i=0; i<boardData.length;i++){
    //  if(no ===boardData[i].no){
    //    boardData.splice(i,1);
    //  }
    // }
    // setBoardData(boardData);
    
    setMode('list');

  }else if(mode==='edit'){
    titleVar = '게시판-수정(props)';

    navComp = <NavEdit
      onChangeMode={()=>{
        setMode('list');
      }}
      onBack={()=>{
        setMode('view');
        setNo(no);
      }
    }></NavEdit>

    for(let i=0;i<boardData.length;i++){
      if(no===boardData[i].no){
        selectRow = boardData[i];
      }
    }

    articleComp = <ArticleEdit selectRow={selectRow}
      editAction={(t,w,c)=>{
        /** 수정할 새로운 객체를 생성 단일련번호와 작성일은 기존의 값을
         * 그대로 사용한다.
         */
        let editBoardData ={no:no, title:t, writer:w, contents:c,
                                  date:selectRow.date
        };
        console.log('수정내용',editBoardData);
        //스프레스 연산자로 기존 배열의 복사본을 생성
        let copyBoardData = [...boardData];
        for(let i=0;i<copyBoardData.length;i++){
          //수정할 객체를 찾으면..
          if(copyBoardData[i].no===no){
            //수정된 내용의 객체로 변경한다.
            copyBoardData[i] = editBoardData;
            break;
          }
        }
        //복사본 배열을 State를 변경
        setBoardData(copyBoardData);
        //수정된 내용 확인을 위해 '열람'화면으로 전환
        setMode('view');
      }}
    ></ArticleEdit>;
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