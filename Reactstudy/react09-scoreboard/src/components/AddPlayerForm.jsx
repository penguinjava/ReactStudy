import React from "react";

// 컴포넌트의 선언과 동시에 export 할 수 있다.
export default function AddPlayerForm(props) {
  return (<>
    <form className="form" noValidate
    onSubmit={(e)=>{
      e.preventDefault();
      //Event객체를 통해 입력값 얻어옴
      let playerName = e.target.player.value;
      
      if(playerName===''){
        e.target.player.focus();
        alert("이름을 입력하세요");
        return;
      }

      //부모에서 전달된 함수를 호출하여 플레이어 추가
      props.onAddPlayer(playerName);
      // 다음 입력을 위해 입력란을 미워준다.
      e.target.player.value = '';
    }}>
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="이름을 추가하세요" required onChange={()=>{}} />
      <input type="submit" className="input" value="Add Player"/>
    </form>
  </>);
}