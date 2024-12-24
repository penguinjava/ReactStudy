import './App.css'
import {useState} from 'react';

function WriteForm(props){
  return(
    /** submit 이벤트 리스너를 통해 폼값을 처리한다. */
    <form onSubmit={(e)=>{
      //이벤트 리스너에서는 event객체를 매개변수로 받을 수 있다.
      console.log("이벤트객체e",e);
      //이벤트 객체를 통해 submit 이벤트를 차단한다.
      e.preventDefault();
      //이벤트 target속성을 통해 입력한 폼값을 얻어온다.
      let writer = e.target.writer.value;
      let title = e.target.title.value;
      let contents = e.target.contents.value;
      //부모 컴포넌트에서 props로 전달해준 함수를 호출하여 폼값이 전달한다.
      props.writeAction(title, writer, contents);
    }}>
      <table id="boardTable">
                <tbody>
                    <tr>
                        <th>작성자</th>
                        <td><input type="text" name="writer"/></td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td><input type="text" name="title"/></td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea name="contents" cols="22" rows="3">
                        </textarea></td>
                    </tr>
                </tbody>
                <input type="submit" value="전송"></input>
            </table>
      </form>
  );
}

function App() {
  //message 라는 state를 생성
  const [message,setMessage] = useState('폼값 검증 진행중');
  return (
    <div className="App">
      {/* 작성폼 컴포넌트를 추가하면서 props를 통해 폼값을
      받아 콘솔에 출력하는 함수를 전달한다. 3가지 모두 빈값이 아니라면
      state를 '완료'로 변경한다. */}
      <WriteForm writeAction={(wr,ti,con)=>{
        console.log("Form값",wr,ti,con);
        //폼값 검증이 완료되면 state를 변경한다.
        if(wr!=='' && ti!==''&&con!==''){
          setMessage('폼값 검증 완료');
        }
      }}></WriteForm>
        {/* state가 변경되면 새롭게 랜더링이 되므로 아래
        텍스트가 변경되는것을 볼 수 있다. 즉 폼값검증이
        완료되었을때 변경된다. */}
      <p>{message}</p>
    </div>
  );
}

export default App