import './App.css';
import React, { useState, useEffect } from 'react';

//목록을 출력하는 컴포넌트
const GlobalTop = (props) => {
  console.log('#Life', 'GlobalTop==>1.컴포넌트실행');
  // State 생성. 초기값은 빈 배열로 설정.
  var [myList, setMyList] = useState([]);

  //return문이 실행된 후, 즉 렌더링이 완료된 후 실행되는 훅
  useEffect(function(){
    console.log('#Life', 'LifeGood==>3.useEffect실행1');
    /** 컴포넌트의 렌더링이 완료된 후 내부에 있는 json파일을 GET방식으로
     * 요청한다.
     */
    fetch('./json/myData.json')
      .then((result)=>{
        /** 요청에 성공하면 json파일의 데이터가 매개변수로 콜백된다.
         * 콜백데이터는 Text형식이므로 Json 포맷으로 변환 후 반환한다.
        */
        return result.json();
      })
      .then((json)=>{
        /** 첫번째 then절에서 반환한 값은 두번째 then절로 반환된다. 
         * 이 값을 받은 후 State를 변경한다.
        */
        console.log(json);
        setMyList(json);
      });
    return ()=>{
      /** 컴포넌트가 언마운트될때 실행할 코드가 있다면 이 부분에
       * 기술한다.
       */
      console.log('#Life', 'LifeGood==>4.useEffect실행2');
    };
  },[]);
  /** useEffect의 두번째 인자인 의존성배열에 빈 배열을 추가한다. 이렇게
   * 하면 최초 한번만 실행되고 그 이상 실행되지 않는다.
   * 만약 의존성배열을 생략하면 무한히 로딩되는 현상이 발생된다. 
  */

  var listTag = [];
  /*State변수의 크기만큼 반복. 최초 실행시에는 빈 배열이므로 이부분은
    실행되지 않는다. 따라서 페이지의 틀만 만들어진 상태로 렌더링된다.
  */
  for(var i=0 ; i<myList.length ; i++){
    //각 루프에 해당하는 객체를 인출
    var data = myList[i];
    console.log('데이터', data.id, data.num);
    listTag.push(
      <li key={data.id}>
        {/* data-id 속성에 설정된 값은 Event객체의 target 속성 하위의
        dataset.id 를 통해 얻어올 수 있다. 이 부분에 게시물의 일련번호인
        num을 설정하고 있다. */}
        <a href="111" data-id={data.num} onClick={(e)=>{
          e.preventDefault();
          console.log("이벤트객체",e);
          //여기서 게시물의 일련번호를 부모컴포너트로 전달한다.
          props.myLinkClick(e.target.dataset.id);
        }}>{data.id}</a>
      </li>
    );
  }
  
  //여기서 렌더링한다.
  console.log('#Life', 'LifeGood==>2.return실행(render와동일)');
  return (
    <nav>
      <ul>
        {listTag}
      </ul>
    </nav>
  );
}

//Props로 전달된 객체의 값을 화면에 출력하는 컴포넌트
const ContentBody = (props)=>{
  return (
    <div>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>num : {props.myResult.num}</li>
        <li>id : {props.myResult.id}</li>
        <li>cell : {props.myResult.cell}</li>
        <li>description : {props.myResult.description}</li>
      </ul>
    </div>
  );
}


function App() {
  //dto.json의 내용을 저장할 State이므로 초기값은 빈 객체로 생성
  var [myResult, setMyResult] = useState({});

  return (
    <div className="App">
      <h2>React - 내부서버통신</h2>
      {/* 클릭시 내부에 저장된 dto.json 파일을 GET박식으로 요청한 후
      콜백데이터를 받아오는 기능의 함수를 Props로 전달한다.
      자식 컴포넌트는 이 함수를 호출할때 게시물의 일련번호를 전달한다. */}
      <GlobalTop myLinkClick={(num)=>{
        console.log('클릭', num);
        fetch('./json/dto'+num+'.json')
          .then((result)=>{
            console.log('결과1',result);
            return result.json();
          })
          .then((json)=>{
            console.log('결과2', json);
            setMyResult(json);
          });
      }}/>
      <ContentBody myResult={myResult}></ContentBody>
    </div>
  );
}

export default App;
