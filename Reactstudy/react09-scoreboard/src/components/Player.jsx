import React from "react";
import Counter from "../components/Counter";
import EditPlayerForm from "./EditPlayerForm";
import { useState } from "react";

export default function Player(props) {

  let row = props.playerData;
  
  const [showEdit,setShowEdit] = useState(false);
  let editForm;
  if(showEdit===false){
    editForm ='';
  }else{
    editForm =<EditPlayerForm playerName={row.name}
    playerIdx={row.idx} onEditPlayer={props.onEditPlayer}
    showEdit={showEdit} setShowEdit={setShowEdit}></EditPlayerForm>;
  }

  return (
    <>
      <div className="player">
        <span className="player-name">
          <button className="remove-player" onClick={(e) => {
            //JSX에서는 window객체를 이용해서 하위 함수를 호출한다.
            if(window.confirm('삭제할까요?')){
              props.deletePlayerProcess(row.idx);
            }
            //console.log("idx",row.idx);
           }}> x </button>
          <a href="/" onClick={(e)=>{
            e.preventDefault();
            setShowEdit(!showEdit);
          }}>{row.name}</a>
        </span>
        {/* App컴포넌트에서 전달받은 함수를 자식 컴포넌트로 다시 전달한다.
        React는 Top-down방식으로 데이터를 전달하는 구조를 가지고 있으므로
        컴포넌트의 구조가 복잡해질수록 상태관리가 어려워진다는 단점이 있따. */}
        <Counter idx={row.idx} score={row.score} onChangeScore={props.onChangeScore} />
      </div>
      {editForm}
    </>
  );
}
