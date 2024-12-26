import './App.css';
import { useId } from 'react';

function App() {
  const myId = useId();
  console.log("myId",myId);

  return (
    <div className="App">
      <MyInput />
    </div>
  );
}

function MyInput(){
  const ageId = useId();
  console.log("ageId",ageId);
  return(
    <div>
      <label htmlFor='name'>이름</label>
      <input type="text" id="name"/>
      <br />
      <label htmlFor={ageId}>나이</label>
      <input type="text" id={ageId} />
    </div>
  )
}

export default App;