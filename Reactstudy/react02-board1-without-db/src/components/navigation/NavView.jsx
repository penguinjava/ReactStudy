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
        /** HTML에서는 window개체를 주로 생략하지만 JSX에서는 생략
         * 하면 안된다.
         */
        if(window.confirm('삭제할까요?')){
          props.onChangeMode('delete');
        }
      }}>삭제</a>
    </nav>
  )
}

export default NavView;