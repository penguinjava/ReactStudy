import './App.css';
import { useState } from 'react';

/**
부모 컴포넌트인 App에서 내려받은 Props의 함수를 다시 자식 컴포넌트로
전달한다. 즉 함수의 기능을 그대로 내려주는 것이다.
 */
const Right1 = (props) => {
  return (
    <div>
      <h2>Right1</h2>
      <Right2 onMyPlus2={() => {
        props.onMyPlus1();
      }} />
    </div>
  );
};

const Right2 = (props) => {
  return (
    <div>
      <h2>Right2</h2>
      <Right3 onMyPlus3={() => {
        props.onMyPlus2();
      }}/>
    </div>
  );
};

const Right3 = (props) => {
  /**
  Right의 최하위 컴포넌트에서는 Click 이벤트를 통해 부모쪽에서
  전달된 함수를 호출한다. 그러면 Right3 > Right2 > .. > App과 같은 순서대로
  호출된다. 즉 State를 1증가시키고 새로운 렌더링을 하게된다.
  */
  return (
    <div>
      <h2>Right3 : {props.number1}</h2>
      <input type="button" value="+" onClick={() => {
        props.onMyPlus3();
      }} />
    </div>
  );
};

/**
App 컴포넌트로부터 전달받은 Props를 자식 컴포넌트로 재 전달한다.
*/
const Left1 = (props) => {
  return (
    <div>
      <h2>Left1 : {props.number1}</h2>
      <Left2 number2 = {props.number1} />
    </div>
  );
};

const Left2 = (props) => {
  return (
    <div>
      <h2>Left2 : {props.number2}</h2>
      <Left3 number3={props.number2} />
    </div>
  );
};
// Left의 최하위 컴포넌트에서는 Props로 전달받은 값을 출력한다.
const Left3 = (props) => {
  return (
    <div>
      <h2>Left3 : {props.number3}</h2>
    </div>
  );
};

function App() {
  //최상위 컴포넌트에서 State 생성
  const [number, setNumber] = useState(1);
  return (
    <div className="root">
      {/* State값을 출력 */}
      <h2>React - Redux : {number}</h2>
      <div id="grid">
        {/* Left 컴포넌트 하위로 number를 Props로 전달한다. */}
        <Left1 number1={number} />
        {/* Right 컴포넌트 하우로는 State를 변경하기 위한 Setter를 전달
        number에 1을 더하는 기능 */}
        <Right1 onMyPlus1={() => {
          setNumber(number + 1);
        }} />
      </div>
    </div>
  );
}

export default App;
