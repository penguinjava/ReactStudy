import React from "react";

//열람의 네비게이션
function NavView(props){
  //띄어쓰기를 할때는 &nbsp; 혹은 {" "}를 사용할 수
  return(
    <nav>
      <a href="#" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>{" "}

      <a href="#" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{" "}

      <a href="#" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('delete');
      }}>삭제</a>
    </nav>
  )
}

export default NavView;