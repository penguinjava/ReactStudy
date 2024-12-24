import './App.css';
/** 현재 문서에서 useState 리엑트훅을 사용하겠다는
 * 의미로 외부의 기능을 현재 문서에 포함시킨다.
 */
import { useState } from 'react';

//Top컴포넌트 정의
function Top(props) {
  return (
    <h2>
      <a
        href="/"
        onClick={(event) => {
          //이벤트객체를 통해 화면의 새로고침 차단
          event.preventDefault();
          /** props로 전달된 함수를 호출. 이때 인수로 'both'
           * 를 전달하여 state를 변경한다.
           */
          props.myModeChange('both');
        }}
      >
        React - State 변경하기
      </a>
    </h2>
  );
}

function MyCont1(props) {
  return (
    <>
      <li>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.myModeChange('front');
          }}
        >
          프론트앤드
        </a>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>jQuery</li>
        </ul>
      </li>
    </>
  );
}

function MyCont2(props) {
  return (
    <>
      <li>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.myModeChange('back');
          }}
        >
          백앤드
        </a>
        <ul>
          <li>Java</li>
          <li>Oracle</li>
          <li>JSP</li>
          <li>Spring Boot</li>
        </ul>
      </li>
    </>
  );
}

/**
 * React Hook(훅)
 * : React16.8부터 새롭게 추가된 기능으로 함수형
 * 컴포넌트에서 state와 수명주기(Life cycle)을
 * 연동할 수 있게 해주는 특수한 함수를 말한다.
 * 훅은 import를 먼저 진행한 후 useXXX()와 같은 패턴의
 * 함수를 아래와 같이 사용하면된다.
 * 
 * useState() : 리엑트에서 상태값을 가지는 state의 값을
 * 변경하거나 초기값을 부여할대 사용. 이함수의 반환값은
 * 배렬인데 0번 요소는 state의 값을 저장하는 변수이고
 * 1번 요소는 이값을 변경하는 함수로 사용한다.
 * const myState = useState(99);
 * const getMs = MyState[0]; => 초기값인 99를 변수에 할당
 * const setMs = myState[1]; => 값을 변경하는 함수로 지정
 * ==>
 *    위 문장을 '구조분해할당'을 통해 축약하면 다음과 같다.
 *    const [getMs, setMs] = useState(99);
 */
function App() {
  /** UI 전환을 위한 state를 생성. state의 변수명은 mode이고
   * 초기값은 both로 설정. 이를 변경하기 위한 함수는 setMode()로 정의한다.
   */
  const [mode, setMode] = useState('both');

  //컴포넌트 저장을 위한 변수 선언
  let contents;

  if (mode === 'front') {
    //mode의 값이 front면 MyCont1 컴포넌트만 렌더링한다.
    contents = (
      <>
      {/* 각 컴포넌트에서는 myModeChange라는 Props를 전달하게 된느데,
      State인 mode값을 매개변수를 통해 변경하는 기능을 가지고있다. */}
        <MyCont1
          myModeChange={(mode) => {
            setMode(mode);
          }}
        />
      </>
    );
  } else if (mode === 'back') {
    contents = (
      <>
        <MyCont2
          myModeChange={(mode) => {
            setMode(mode);
          }}
        />
      </>
    );
  } else {
    contents = (
      <>
        <MyCont1
          myModeChange={(mode) => {
            setMode(mode);
          }}
        />
        <MyCont2
          myModeChange={(mode) => {
            setMode(mode);
          }}
        />
      </>
    );
  }

  return (
    <div className="App">
      <Top
        myModeChange={(mode) => {
          setMode(mode);
        }}
      />
      {/* 앞에서 if문을 통해 mode가 어떤값인지에 따라 설정된 컴포넌트를
      이 부분에서 렌더링한다. */}
      <ol>{contents}</ol>
    </div>
  );
}

export default App;