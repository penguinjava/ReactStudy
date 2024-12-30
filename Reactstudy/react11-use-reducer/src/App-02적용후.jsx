import './App.css';
import {useReducer, useState}  from 'react';

/**
useReducer
-useState와 유사하게 상태를 관리한다.
-여러개의 하위값을 가진 State를 관리할때 유용하다.
-컴포넌트에서 상태를 업데이트 하는 로직을 분리할 수 있다.
형식]
  Dispatch(Action) ==> Reducer(pervState, Action)
  즉 디스패치를 통해 리듀서 함수를 호출하고, 파라미터로 전달된 액션에
  따라 State를 업데이트(변경)한다.
*/

//Reducer함수 : State를 업데이트 하는 역할을 한다.(Redux의 Store와 유사)
const countReducer = (prevCount,action)=>{
  /**
  매개변수로 전달된 Action을 분석해서 State를 변경한 후 반환한다.
  반환 즉시 반영되어 새롭게 렌더링된다.
  */
  if(action.mode ==='up'){
    return prevCount + action.number;
  }else if(action.mode === 'down'){
    return prevCount -action.number;
  }else if(action.mode === 'reset'){
    return 0;
  }
}

function App() {
  /**
  useReducer 훅 선언
  형식]
    [State변수명, Dispatch함수] = useReducer(Reducer함수명, 초기값);
    Dispatch를 통해 Reducer함수를 호출하여 상태를 변경한다.
    count의 초기값은 0으로 선언
    */
  const [count, countDispatch] = useReducer(countReducer,0);
  //number의 초기값을 1로 선언
  const [number, setNumber] = useState(1);
  
  /**
  number 타입의 <input>에서 스피박스를 통해 값을 변경하면
  호출된다. 변경된 값이 State의 setter함수를 통해 변경되고 새롭게 렌더링 된다.
   */
  const changeNumber = (e)=>{
    setNumber(Number(e.target.value));
  }

  /**
  각 버튼을 누르면 Dispatch를 통해 Reducer 함수를 호출한다.
  인수로 전달하는 객체를 Action이라고 하고, 이를 분석해서 증가, 감소, 리셋
  3가지로 상태를 변경한다.
   */
  const down = ()=>{
    countDispatch({mode:'down',number:number});
  }
  const up =() =>{
    countDispatch({mode:'up', number:number});
  }
  const reset =()=>{
    countDispatch({mode:'reset',number:number});
  }
  return (
    <div className="App">
      <h2>useReducer 훅 사용하기</h2>
      <div>
        <input type="button" value="-" onClick={down} />
        <input type="button" value="0" onClick={reset} />
        <input type="button" value="+" onClick={up} />
        <input type="number" value={number} onChange={changeNumber} />
        <span>{count}</span>
      </div>
    </div>
  );
}
export default App;
