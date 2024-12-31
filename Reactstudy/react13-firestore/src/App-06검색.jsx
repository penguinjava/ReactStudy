import './App.css';
import { firestore } from './firestoreConfig';
import {doc, deleteDoc, getDoc, collection, getDocs} from "firebase/firestore";
import { useState, useEffect} from 'react';

function App() {
  const [showData, setShowData] = useState([]);

  //검색을 위한 함수. 검색필드와 검색어를 매개변수로 정의
  const getCollection = async (sField, sStr)=>{
    console.log("선택", sField);
    let getRows = [];

    if(sField==='id'){
      /**아이디를 통한 검색은 도큐먼트를 찾는것으로 구현한다.
      우리는 아이디를 문서명으로 사용했기 때문에 이렇게 구현할 수 있다.
      */
      const docRef = doc(firestore,"members",sStr);
      //참조값을 통해 도큐먼트를 찾는다.
      const docSnap  = await getDoc(docRef);
      if(docSnap.exists()){
        ///데이터를 배열에 추가한다.
        getRows.push(docSnap.data());
      }else{
        console.log("No such document!");
      }
    }else if(sField==='name'){
      /** 이름으로 검색하는 경우에는 whre, query함수를
       * 사용한다. 먼저 컬렉션을 얻어온다.
       */
      const membersRef = collection(firestore,"memebers");
      /** query함수를 통해 where(조건)에 맞는 데이터를 검색한다.
       * 여시서는 name 컬럼에 일치하는 값이 있는 도큐먼트를 검색한다.*/
      const q = queryy(membersRef, where("name","==",sStr));
      //조건에 일치하는 도큐먼트는 2개 이상일 수 있으므로 forEach로 반복한다.
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc)=>{
        console.log("반복인출", doc.id,doc.data());
        getRows.push(doc.data());
      })
    }

    //검색된 항복의 갯수만큼 <tr> 태그를 추가한다.
    let trArray = [];
    console.log("getRows", getRows);
    getRows.forEach((row)=>{
      trArray.push(
        <tr key={row.id}>
          <td className="cen">{row.id}</td>
          <td className="cen">{row.pass}</td>
          <td className="cen">{row.name}</td>
          <td className="cen">{row.regdate}</td>
        </tr>
      );
    });
    setShowData(trArray);
  }
  return (
    <>
      <div className="App">
        <h2>Firebase =Firestore 연동 App</h2>
        <h3>검색하기</h3>
        <form onSubmit={(e)=>{
          e.preventDefault();
          //폼값을 submit 하면 입력값을 받은 후 검색을 위한
          //함수 호출
          let sf = e.target.searchField.value;
          let ss = e.target.searchStr.value;
          getCollection(sf,ss);
        }}>
          <div class="input-group" id="myForm">
            <select name="searchField" className="form-control">
              <option value="id">아이디</option>
              <option value="name">이름</option>
            </select>
            <input type="text" name="searchStr" className="form-control" />
            <button typ="submit" className="btn-secondary">전체조회</button>
          </div>
        </form>
        <table className='table table-bordered'>
          <thead>
            <tr className='text-center'>
              <th>아이디</th><th>비밀번호</th><th>이름</th><th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {showData}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default App;
