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
    if(currentState === undefined){
        return {
            number : 0,
        };
    }
    const newState = { ...currentState };

    if(action.type === 'PLUS'){
        newState.number ++;
    }else if(action.type ==='M'){
      newState.number --;
    }

    return newState;
}

const store = createStore(reducer);

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

function Right3(){
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

const Left3 = () => {
    // 어떤 스테이트를 받을지 결정하기 위한 함수 정의
    // function f(state){
    //     return state.number;
    // }
    // 정의한 함수를 인수로 전달한다.
    // const number = useSelector(f);

    const number = useSelector((state)=>{ return state.number });
    return (
        <div>
            <h2>Left3 : {number}</h2>
        </div>
    );
};

function App() {
    //const [number, setNumber] = useState(1);
    return (
        <div className="root">
            <h2>React - Redux</h2>
            <div id="grid">
                <Provider store={store}>
                    <Left1/>
                    <Right1/>
                </Provider>
            </div>
        </div>
    );
}

export default App;
