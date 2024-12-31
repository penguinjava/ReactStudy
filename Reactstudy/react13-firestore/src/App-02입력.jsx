import './App.css';
import { firestore } from './firestoreConfig';
import {doc, setDoc} from "firebase/firestore";

function App() {
  console.log("firestore", firestore);

  //현재 날짜를 0000-00-00 포맷으로 생성
  const nowDate = () =>{
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0"+ (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" +day;
  }

  //Firestore에 내용 입력
  const memberWrite = async (p_collection, p_id, p_pass, p_name)=>{
    //doc()으로 컬렉션과 도큐먼트를 생성 후 setDoc()으로 내용 입력
    await setDoc(doc(firestore,p_collection,p_id),{
      id: p_id,
      pass: p_pass,
      name:p_name,
      regdate:nowDate(),
    });
  console.log("입력성공");
  }
  return (<>
      <div className="App">
        <h2>Firebase - Firestore 연동 App</h2>
        <h3>입력하기</h3>
        <form onSubmit={(e)=>{
          e.preventDefault();

          // 입력한 폼값을 target 속성으로 얻어옴
          let collection = e.target.collection.value;
          let id = e.target.id.value;
          let pass = e.target.pass.value;
          let name = e.target.name.value;

          //입력값이 없는 경우 경고창 띄움
          if(id===''){ alert('아이디를 입력하세요'); return;}
          if(pass===''){ alert('비밀번호를 입력하세요'); return;}
          if(name===''){ alert('이름을 입력하세요'); return;}

          //입력값을 인자로 입력함수 호출
          memberWrite(collection, id, pass, name);

          e.target.id.value = '';
          e.target.pass.value = '';
          e.target.name.value = '';
        }}>
          <table className='table table-bosrderd table-striped'>
            <tr>
              <td>컬렉션(테이블)</td>
              <td><input type="text" name="collection"
              value="members" /></td>
            </tr>
            <tr>
              <td>아이디</td>
              <td><input type="text" name="id"></input></td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td><input type="password" name="pass"></input></td>
            </tr>
            <tr>
              <td>이름</td>
              <td><input type="text" name="name"></input></td>
            </tr>
          </table>
          <button type="submit">입력</button>
        </form>
      </div>
  </>);
}
export default App;
