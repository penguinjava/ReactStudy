import './App.css'
import {useState, useEffect, useMemo}  from 'react';

function App() {
  //State 생성
  const [number, setNumber] = useState(0);
  const [switching,setSwitching] = useState(true);

  //Step1 : 상수 선언 : 초기값은 On으로 설정됨
  // const switchMode = switching ? 'On(켜짐^^)' : 'off(꺼짐ㅜㅜ)';

  /**
  Step2 : 상수를 객체로 변경
    Javascript에서는 객체를 선언할때마다 새로운 참조값을 할당받게된다.
    즉 새로운 렌더링을 위해 App컴포넌트가 호출될때마다 참조값이 변경된다.
    따라서 useEffect()가 지속적으로 호출된다.
   */
  // const switchMode = {
  //   nowState : switching ? 'On(켜짐^^)' : 'off(꺼짐ㅜㅜ)'
  // }

  /**
  Step3 : useMemo를 적용하여 switching의 값이 변경될때만 값을 반환하고,
    그렇지 않으면 캐싱된 값을 그대로 사용한다.
   */
  const switchMode = useMemo(()=>{
    return {nowState : switching ? 'On(켜짐^^)' : 'off(꺼짐ㅜㅜ)'};
  },[switching]);

  /**
  Step1 : 기본(원시) 타입의 값을 의존성 배열에 추가해둔 상태이므로 값의 변화가
  있을 때만 useEffect가 재 호출된다.
  -----------------------------------------------------------------------
  Step2 : 객체형으로 변경하면 App컴포넌트가 렌더링될때마다 새로운 참조값을
  할당받게 되므로 값이 변화된것으로 인식하여 useEffect가 지속적으로 호출되는
  문제가 생긴다. 즉 애플리케이션의 속도가 매우 느려질 수 있다.
  -----------------------------------------------------------------------
  Step3 : App컴포넌트가 렌더링될때마다 지속적으로 참조값이 변경되는 부분을
  차단하기 위해 useMemo를 통해 Momoization한 값을 사용하도록 코드를 수정함.
   */
  useEffect(()=>{
    console.log("useEffect() 호출 됨");
  },[switchMode]);

  return(<>
    <h2>정수 카운터</h2>
    {/* 스핀박스를 누르면 정수 State가 변경된다. */}
    <input type="number" value={number}
    onChange={(e)=> setNumber(e.target.value)} />

    <h2>토글 스위치</h2>
    {/* Step1 : 원시(기본) 자료형 일때 */}
    {/* <p>스위치상태(Step2) : {switchMode}</p> */}
    {/* Step2 : 객체(참조)형 일때 */}
    {/* 버튼을 누르면 boolean 타입의 State가 변경된다. */}
    <button onClick={()=> setSwitching(!switching)}>
    </button>
  </>   
  )
}

export default App
