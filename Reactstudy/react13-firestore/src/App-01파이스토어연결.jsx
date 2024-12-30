import './App.css'
import { firestore } from './firestoreConfig';
//새로운 문서를 입력하거나 읽을때 사용하는 함수를 적용
import {doc, setDoc, getDoc} from "firebase/firestore";

function App() {
  //파이어스토어 연결 확인
  console.log("firestore",firestore);

  //도큐먼트 추가
  const addMessage =async()=>{
    /**
    컬렉션 : 테이블과 비슷. Korea로 작성
    도큐먼트 : 레코드와 비슷. Seoul로 작성
    하위 데이터는 JSON 객체 형식으로 작성하면 된다.
    테이블 처럼 정형화된 것이 아니므로 원하는 데로 객체에
    정보를 추가할 수 있다.
    */
    //doc()으로 도큐먼트를 만든 객체를 생성
    await setDoc(doc(firestore, "Korea", "Seoul"),{
      gu: "종로구",
      dong: "관철동",
      hotplace: "더조은IT",
    });
    console.log("입력성공");
  }


  const getMessage = async () =>{
    //입력된 컬렉션과 도큐먼트를 통해 문서의 참조를 가져온다.
    const docRef = doc(firestore, "Korea", "Seoul");
    //참조를 통해 도큐먼트를 얻어온다.
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      //해당 도큐먼트가 존재하면 콘솔에 내용 출력
      console.log("Document data:", docSnap.data());
    }
    else{
      console.log("No such document!");
    }
  }

  return (
    <>
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>Firebase 연결</h3>
      <input type="button" value='입력' onClick={addMessage}/>
      <input type="button" value='일기' onClick={getMessage}/>
    </div>
    </>
  )
}

export default App
