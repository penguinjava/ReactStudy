import React from "react";

//게시판 읽기
function ArticleView(props){
  <article>
    <table id="boardTable">
      <colgroup>
      <col width="20%" /> <col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>작성자</th>
          <th>성유겸</th>
        </tr>
        <tr>
          <th>제목</th>
          <th>오늘은 React공부하는날</th>
        </tr>
        <tr>
          <th>날짜</th>
          <td>2023-05-05</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>열심히 배워봅시당 <br/>열공합시당</td>
        </tr>
      </tbody>
    </table>
  </article>
}

export default ArticleView;