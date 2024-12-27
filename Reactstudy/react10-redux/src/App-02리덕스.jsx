import './App.css';
//리덕스 스토어를 생성하기 위한 패키지 임포트
import { legacy_createStore as createStore } from 'redux';
/** 리덕스를 관리하기 위해 필요한 Provider 컴포넌트와 관련 Hook에 대한
 * 패키지 임포트
 */
import { Provider, useSelector, useDispatch } from 'react-redux';

/**
Redux(리덕스)란..??
: React로 제작한 애플리케이션의 상태관리를 위한 라이브러리로 React와 함께
사용되지만 써드파티로 제공되므로 별도로 설치해야한다.
 */


/**
store 생성시 주입할 Reducer(리듀서) 함수를 먼저 생성한다.
리듀서는 Store에 있는 State를 변경하기 위한 코드를 실행부로 정의한다.
파라미터는 2개가 필요하다.
  currentState : 현재 State 값
  action : State 변경에 필요한 요청 파라미터. 2개 이상의 값을 전달할 수
    있어야 하므로 JSON 객체를 주로 사용한다.
 */
function reducer(currentState, action){

    /**
    최초 State가 정의되지 않는 상태라면 number를 1로 설정한다.
    기존 App에서는 최상위 컴포넌트에서 useState를 통해 State를 생성했지만
    Redux가 도입되면 Store에서 State를 생성 및 관리한다.
     */
    if(currentState === undefined){
        return {
            number : 0,
        };
    }

    //현재 State의 복사본을 스프레드 연산자를 이용해서 생성
    const newState = { ...currentState };
    //요청 (Action)을 분석한 후 상태(State)를 변경
    if(action.type === 'PLUS'){
        newState.number ++;
    }else if(action.type ==='M'){
      newState.number --;
    }
    /**
    변경된 State를 반환하여 적용한다. setter를 호출하는
    것과 동일하다.
     */
    return newState;
}

//앞에서 정의한 Reducer 함수를 인자로 Store를 생성한다.
const store = createStore(reducer);
/**
Store가 도입되면 Right, Left 컴포넌트에서 Props를 통해
관리하던 값이나 함수는 더이상 필요하지않다. 따라서 기존 코드에서
제거한다.
*/

function Right1(){
  const number = useSelector((state)=>{ return state.number });
    return (
        <div>
            <h2>Right1 : {number}</h2>
            <Right2></Right2>
        </div>
    );
}

function Right2(){
  const number = useSelector((state)=>{ return state.number });
    return (
        <div>
            <h2>Right2 : {number}</h2>
            <Right3></Right3>
        </div>
    );
}

/**
useDispatch 훅
  : State 값을 변경할 때 Reducer 함수를 호출하는 역할을 한다.
*/
function Right3(){
  /**
  type을 PLUS로 설정하여 Store에 정의된 Reducer를 호출한다.
  JSON 객체로 생성하면되고, 이 객체를 Action 
   */
    const dispatch = useDispatch();
    const number = useSelector((state)=>{ return state.number });
    return (
        <div>
            <h2>Right3 : {number}</h2>
            <input type="button" value="+" onClick={()=>{
                dispatch({ type : 'PLUS' })
            }}/>
            <input type="button" value="-" onClick={()=>{
                dispatch({ type : 'M' })
            }}/>
        </div>
    );
}

const Left1 = () => {

  const number = useSelector((state)=>{ return state.number });
    return (
        <div>
            <h2>Left1 : {number}</h2>
            <Left2></Left2>
        </div>
    );
};

const Left2 = () => {

  const number = useSelector((state)=>{ return state.number });
    return (
        <div>
            <h2>Left2 : {number}</h2>
            <Left3></Left3>
        </div>
    );
};
/**
useSelector 훅
  : State값을 선택할 때 사용한다.
 */
const Left3 = () => {
    // 어떤 스테이트를 받을지 결정하기 위한 함수 정의
    // function f(state){
    //     return state.number;
    // }
    // 정의한 함수를 인수로 전달한다.
    // const number = useSelector(f);

    /**
    Store에 정의된 여러개의 State중 어떤값을 받을지를 정의한
    함수를 useSelector의 인자로 전달한다. 이함수는 개발자가 여러 형태로
    커스텀 할 수 있다.
     */

    const number = useSelector((state)=>{ return state.number });
    return (
        <div>
            <h2>Left3 : {number}</h2>
        </div>
    );
};

function App() {
    //Store가 생성되었으므로App에서는 State를 관리하지 않는다.
    //const [number, setNumber] = useState(1);
    
    /**
    <Provider> 컴포넌트
    : 어떤 컴포넌트에 State를 제공하지 결정하는 Wrapper
    컴포넌트로 여기서 App 컴포넌트 하위의 <Left>,<Right>컴포넌트를 감싸준다.
    그러면 하위의 모든 컴포넌트에서 Store를 공유할 수 있다.
     */
    return (
        <div className="root">
            <h2>React - Redux</h2>
            <div id="grid">
                <Provider store={store}>
                    <Left1></Left1>
                    <Right1></Right1>
                </Provider>
            </div>
        </div>
    );
}

export default App;
