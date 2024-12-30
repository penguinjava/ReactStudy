import './App.css';
import {useReducer, useState} from 'react';

// 학생 컴포넌트.
/**
컴포넌트에서 매개변수를 정의하는 2가지 방법
1.props라는 대표 매개변수를 사용한다.
  이때는 2개이상의 인수를 객체형태로 박데 되므로 'props.인수명'
  으로 사용한다.
2.인수를 개별 변수로 전달받는다.
  {매개변수1, 매개변수2, .. N}
 */
const Student = ({name, dispatch,id,isHere})=>{
  return(<>
    {/* 학생이름. 클릭시 출석 기능 토글됨. */}
    <div>
      <span style={{}}
      onClick={()=>{
        alert('출석처리');
      }}
      onChange={()=>{

      }}>{name}</span>
      {/* 삭제 버튼 */}
      <button onClick={()=>{
        alert('삭제');
      }}>삭제</button>
    </div>
  </>);
}

//리듀서 함수 선언. 이전 State값과 Action을 매개변수로 정의.
const reducer = (state,action)=>{
  switch(action.type){
    case 'add': //학생추가
      //학생이름을 파라미터를 통해 받기
      const name =action.param.name;
      //새로운 학생 객체 생성
      const newStudent = {
        id: Date.now(),
        name, /** 이름은 key와 value가 동일하므로 하나만 작성 */
        isHere: false, /** 출석여부 */
      }
      return {
        count:state.count +1,
        //스프레드 연산자로 기존 배열에 새로운 객체를 추가한다.
        students:[...state.students,newStudent],
      }
    case 'delete':
      return{

      }
    case 'mark':
      return{

      }
    default:
  }
}

const initialState ={
  count :1,
  students : [
    {
      id:Date.now(), name: '김철수', isHere:false,
    },
  ],
}

function App() {
  //추가할 할생의 이름
  const [name,setName] = useState('');
  //Reducer 변수 생성. studentInfo는 initialState를 초기값으로 설정.
  const [studentInfo,dispatch]=useReducer(reducer,initialState);

  return (
    <div className="App">
      <p>총학생수 : {studentInfo.count}</p>
      {/* 추가할 학새으이 이름을 입력하기 위한 상자 */}
      <input type="text" placeholder='이름을 입력하세요'
      value={name} onChange={(e)=>{
        setName(e.target.value)
      }}/>
      {/* 버튼을 누르면 dispatch를 통해 Action(객체)을 reducer로
      전달하여 학생을 추가한다. */}
      <button onClick={()=>{
        dispatch({type:'add', param:{name}});
      }}>추가</button>
      {/* 데이터에 입력된 학생수만큼 반복하여 <Student> 컴포넌트를
      반복 출력한다. */}
      {
        studentInfo.students.map((student)=>{
          // 컴포넌트에서 사용할 값을 Props로 전달한다.
          return <Student key={student.id} name={student.name}
          dispatch={dispatch} id={student.id}
          isHere={student.isHere}/>
        })
      }
    </div>
  );
}
export default App;
