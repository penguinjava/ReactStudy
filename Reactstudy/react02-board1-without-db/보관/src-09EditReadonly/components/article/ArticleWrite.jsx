import React from "react";

/* 
 퀴즈] 작성시 입력값이 없어도 등록이 되는 문제가 있으므로 빈값을 검증한 후
  모든 값이 입력되었을때만 등록이 되도록 수정하시오
*/

//게시판 작성
function ArticleWrite(props){
  return(
    <article>
      <form onSubmit={(event)=>{
        //폼 값이 전송되지 않도록 차단
        event.preventDefault();
        /** event 객체의 target 속성으로 <input>의 DOM에 접근한 후 입력값을
         * 얻어온다.
         */
        let title =  event.target.title.value;
        let writer =  event.target.writer.value;
        let contents =  event.target.contents.value;

        //부모 컴포넌트에서 Props로 전달해준 함수를 호출하여 데이터를 전달한다.
        // if(title!==''&&writer!==''&&contents!==''){
          // props.writeAction(title, writer, contents);
          // }else{
            //   alert("글을 작성하세요")
        // } -> 내가 푼문제

        if(writer===''){
          alert('제목을 입력하세요');
          event.target.writer.focus();
          return;
        }
        if(title===''){
          alert('제목을 입력하세요');
          event.target.title.focus();
          return;
        }
        if(contents===''){
          alert('제목을 입력하세요');
          event.target.contents.focus();
          return;
        }

        props.writeAction(title, writer, contents);

      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer"/></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title"/></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" rows='3'></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송"></input>
      </form>
    </article>
  );
}

export default ArticleWrite;