import React from "react";

//게시판 작성
function ArticleWrite(props){
  return(
    <article>
      <form>
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
              <td><input type="contents" cols="22" rows="3"/></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송"></input>
      </form>
    </article>
  );
}

export default ArticleWrite;