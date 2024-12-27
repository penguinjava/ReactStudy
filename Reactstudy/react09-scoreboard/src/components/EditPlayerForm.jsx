import React from "react";
import { useState } from "react";

export default function EditPlayerForm(props) {
  const [playerName,setPlayName] = useState(props.playerName);
  return (<>
    <form className="form" noValidate
    onSubmit={(e)=>{
      e.preventDefault();
      let playerName = e.target.player.vlue;
      props.setShowEdit(false);
    }}>
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="수정할 이름을 작성하세요" required onChange={(e)=>{
          setPlayName(e.target.value);
        }} value={playerName}/>
      <input type="submit" className="input" value="Edit"/>
    </form>
  </>);
}