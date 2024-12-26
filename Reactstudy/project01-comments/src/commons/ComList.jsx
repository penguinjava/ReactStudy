import React from "react";

function ComList(props){


  const lists = [];
  
  for(let i=0;i<props.myData.length;i++){
    let row = props.myData[i];
    lists.push(<table id="boardTable">
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td className="cen">Writer:{row.writer}</td>
        <td className="cen">{row.date}
          <button type="button" onclick="">수정</button>							
          <button type="button" onclick="">삭제</button>
        </td>
      </tr>
      <tr>
        <td colspan="3" className="subject">{row.comment}</td>
      </tr>
    </table>);
  }

  return (<>
    {lists}
  </>);
}

export default ComList;  
