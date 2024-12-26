import './App.css';
import {useState} from 'react';

import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
import ComEdit from './commons/ComEdit';

function App() {
  const [myData, setMyData] = useState([
    {no:1, comment:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, comment:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'},
    {no:3, comment:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'},
  ]);

  const [nextNo, setNextNo] = useState(4);

  const writeAction=(w,c)=>{
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month =("0"+(1+dateObj.getMonth())).slice(-2);
    let day = ("0"+dateObj.getDate()).slice(-2);
    let nowDate = year +"-"+month+"-"+day;

    let addMyData = {no:nextNo, writer:w, comment:c, date:nowDate};

    

    let copyMyData = [...myData];
    copyMyData.push(addMyData);
    setMyData(copyMyData);

    //다음 번호로 증가
    setNextNo(nextNo+1);
  }

  return (<>
      <Board></Board>
      <ComList myData={myData}></ComList>
      <ComWrite writeAction={writeAction}/>
      <ComEdit />
    </>);
}

export default App;
