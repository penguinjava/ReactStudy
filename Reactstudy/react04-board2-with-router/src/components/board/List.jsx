import React from "react";
import { Link } from "react-router-dom";

function List(props){
  /** App컴포넌트에서 Props를 통해 전달한 배열데이터를 map()함수를 통해
   *  반복해서, 목록을 생성한다.
   */
  const lists = props.boardData.map((row, idx)=>{
    //매개변수 idx는 현재 루프의 인덱스를 반환하는데, 필요없다면 생략할 수 있다.
    return(
      <tr key={row}>
        <td className="cen">{row.no}</td>
        {/* 열람으로 이동하기위한 링크는 "/view/일련번호"와 같이 구성하고
        라우터 처리 부분에서 :no로 기술되어 있다. */}
        <td><Link to={`/view/${row.no}`}>{row.title}</Link></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    )
  })
  return(<>
     <header>
        <h2>게시판-목록</h2>
      </header>
      <nav>
        <Link to="/write">글쓰기</Link>
      </nav>
      <article>
        <table id="boardTable">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {lists}
          </tbody>
        </table>
      </article>
  </>);
}

export default List;