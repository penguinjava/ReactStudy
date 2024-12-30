import './App.css';
import {useReducer, useState} from 'react';

const Student = ({name, dispatch,id,isHere})=>{
  
  return(<>
    <div>
      <span style={{
        textDecoration: isHere? 'line-through': 'none',
        color: isHere ?'gray':'black',
      }}
      onClick={()=>{
        alert('출석');
        dispatch({type:'mark', param:{id}});
      }
      }>{name}</span>
      <button onClick={()=>{
        let del = confirm('삭제할래?');
        if(del===true){
          dispatch({type:'delete', param:{id}});
        }
      }}>삭제</button>
    </div>
  </>);
}

const reducer = (state,action)=>{
  switch(action.type){
    case 'add':
      const name =action.param.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      }
      return {
        count:state.count +1,
        students:[...state.students,newStudent],
      }
    case 'delete':
      let newStudents = state.students.filter((cur)=>{
        return cur.id!==action.param.id;
      });
      return{
        count:state.count -1,
        students:[...newStudents],
      }
    case 'mark':
      return{
        count:state.count -1,
        students:state.students.map((cur)=>{
          if(cur.id === action.param.id){
            return {...cur,isHere: !cur.isHere};
          }
          return cur;
        })
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
  const [name,setName] = useState('');
  const [studentInfo,dispatch]=useReducer(reducer,initialState);
  

  return (
    <div className="App">
      <p>총학생수 : {studentInfo.count}</p>
      <input type="text" placeholder='이름을 입력하세요'
      value={name} onChange={(e)=>{
        setName(e.target.value)
      }}/>
      <button onClick={()=>{
        dispatch({type:'add', param:{name}});
        setName('');
      }}>추가</button>
      {
        studentInfo.students.map((student)=>{
          return <Student key={student.id} name={student.name}
          dispatch={dispatch} id={student.id}
          isHere={student.isHere}/>
        })
      }
    </div>
  );
}
export default App;
