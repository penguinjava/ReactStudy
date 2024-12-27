import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import AddPlayerForm from './components/AddPlayerForm';
import Player from './components/Player';
import EditPlayerForm from './components/EditPlayerForm';

function App() {
  //데이터로 사용할 객체형 배열 생성
  const [playerData, setPlayerData] = useState([
    { idx: 1, name: '홍길동', score: 10 },
    { idx: 2, name: '손오공', score: 20 },
    { idx: 3, name: '유비', score: 30 },
    { idx: 4, name: '달타냥', score: 40 },
  ]);
  //시퀀스로 사용할 State생성
  const [nextVal, setNextVal] = useState(5);

  //플레이어 추가를 위한 함수
  const addPlayerProcess = (pName) => {
  if(pName==="")
    {
    alert("이름 추가해라")
  }
  else{ 
    //이름만 매개변수로 받은 후 추가할 객체 생성 
    console.log('onAddPlayer', pName);
    let addPlayer = { idx: nextVal, name: pName, score: 0 };

    // 추가 후 화면이 리렌더링 됨
    //데이터의 복사본 생성
    let copyPlayers = [...playerData];
    //복사본에 데이터 추가
    copyPlayers.push(addPlayer);
    //State를 변경하면 새롭게 렌더링된다.
    setPlayerData(copyPlayers);

    // 데이터가 추가되지만 리렌더링되지 않음
    // playerData.push(addPlayer);
    // setPlayerData(players);
    // console.log(players);

    // 추가 후 시퀀스 증가
    //새로운 플레이어 추가를 위해 시퀀스 증가
    setNextVal(nextVal + 1);
    alert("추가 되었습니다^^.");
  }
};
  //점수의 증감. 매개변수는 증감, 플레이어의 일련번호로 정의
  const scoreChangeProcess = (flag, playerIdx) => {
    console.log('idx', playerIdx, 'flag', flag);
    //복사본 새엇ㅇ
    let copyPlayers = [...playerData];
    //복사본을 통해 루프
    copyPlayers.forEach((row)=>{
      //현재루프의 객체에서 일련번호와 수정할 플레이어의 일련번호 확인
      if(row.idx===playerIdx){
        console.log(row.name);
        //flag에 따라 5점씩 증감한다.
        if(flag === '+')
          row.score +=5;
        else
        row.score -= 5;

        if(row.score < 0){
          alert("0점이하입니다.")
          row.score = 0
        };
      }
    });
    //복사본을 통해 State
    setPlayerData(copyPlayers);
  }

  //플레이어 삭제
  const deletePlayerProcess = (playerIdx)=>{
    //삭제를 위해서는 플레이어의 idx만 있으면 됨.
    console.log('삭제idx',playerIdx);
    
    //초기값으로 빈 배열을 선언. 따라서 prev의 초기값이 빈 배열이 된다.
    let newPlayerData = playerData.reduce((prev,curr)=>{
      //삭제할 플레이어를 제외한 나머지 객체를 prev에 추가
      if(curr.idx !== playerIdx){
        prev.push(curr);
      }
      //즉 선택한 플레이어는 삭제된다.
      return prev;
    },[]);
    
    // -> 내풀이
    //let del = confirm("정말 삭제 하시겠습니까?");
    //let copyPlayers = [...playerData];
    //if(del===true){
    //  copyPlayers.splice(playerIdx-1,1);
    //}

    setPlayerData(newPlayerData);
    //console.log(copyPlayers);
  }

  const editPlayerProcess = (idx,name)=>{
    console.log('수정',idx,name);
    let newPlayersData = playerData.filter((row)=>{
      if(row.idx===idx){
        row.name=name;
      }
      return row;
    });
    setPlayerData(newPlayersData);
  }

  return (
    <div className="scoreboard">
      <Header title="My Scoreboard" playersData={playerData} />
      {
      //점수 변경을 위한 함수를 Props로 전달
      playerData.map((playerRow) => (
        <Player playerData={playerRow} key={playerRow.idx}
        onChangeScore={scoreChangeProcess} 
        deletePlayerProcess={deletePlayerProcess}
        onEditPlayer={editPlayerProcess}/>
      ))}
      
      <AddPlayerForm onAddPlayer={addPlayerProcess}></AddPlayerForm>
    </div>
  );
}

export default App;
