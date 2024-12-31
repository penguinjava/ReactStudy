import './App.css';
import { firestore } from './firestoreConfig';
import {doc, deleteDoc, getDoc, collection, getDocs} from "firebase/firestore";
import { useState, useEffect} from 'react';

function App() {
  const [showData,setShowData] = useState([]);
  useEffect(()=>{
    const getCollection = async()=>{
      let trArray = [];
      const querySnapshot = await getDocs(collection(firestore,"members"));
      querySnapshot.forEach((doc)=>{
        let memberInfo = doc.data();
        trArray.push(
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }
    getCollection().then((result)=>{
      console.log('result',result);
      setShowData(result);
    });
  },[]);

  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <div className='App'>
        <h2>Firebase = Firestore 연동 App</h2>
        <h3>개별 조회 및 삭제하기</h3>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          let id = e.target.id.value;
          console.log("삭제",id);
          if(id===''){alert('사용자를 먼저 선택해주세요'); return;}

          await deleteDoc(doc(firestore, "members",e.target.id.value));

          setId('');
          setPass('');
          setName('');
        }}>
          <div className="input-group" id="myForm">
            <select className="form-control" onChange={async (e)=>{
              let user_id = e.target.value;
              const docRef = doc(firestore,"members", user_id);
              const docSnap = await getDoc(docRef);
              if(docSnap.exists()){
                let callData = docSnap.data();
                setId(user_id);
                setPass(callData.pass);
                setName(callData.name);
              }else{
                console.log("No such document!");
              }
            }}>
              <option value="">선택하세요</option>
              {showData}
            </select>
            <button type="submit" className="btn btn-danger">삭제</button>
          </div>
          <table className='table table-bordered'>
            <tr>
              <td>컬렉션(테이블)</td>
              <td><input type="text" name="collection"
              value="members"/></td>
            </tr>
            <tr>
              <td>아이디(변경불가)</td>
              <td><input type="text" name="id"
              value={id} onChange={(e)=>{
                setId(e.target.value);
              }} readOnly/></td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td><input type="password" name="pass"
              value={pass} onChange={(e)=>{
                setPass(e.target.value);
              }}/></td>
            </tr>
            <tr>
              <td>이름</td>
              <td><input type="text" name="name"
              value={name} onChange={(e)=>{
                setName(e.target.value);
              }}/></td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
}
export default App;
