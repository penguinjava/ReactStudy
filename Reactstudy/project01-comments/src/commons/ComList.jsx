import React from "react";

function ComList(props){


  const lists = [];

  const [showEdit, setShowEdit] = useState(false);
  const [editNo, setEditNo] = useState(null);

  const chekEdit = (no)=>{
    if(showEdit=== true){
      alert("현재 수정 mode입니다. 수정 취소를 먼저 눌러주세요");
      setShowEdit(true);
    }else{
      setEditNo(no);
    }
  };
  
  for(let i=0;i<props.myData.length;i++){
    let row = props.myData[i];
    lists.push(<table id="boardTable">
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td className="cen">Writer:{row.writer}</td>
        <td className="cen">{row.date}
          <button type="button" onclick={(e)=>{
            e.preventDefault();
            setShowEdit(!showEdit);
            checkEdit(row.no);
            console.log(showEdit);
          }}>수정</button>							
          <button type="button" onclick={()=>{
            if(window.confirm('삭제하시겠습니까?')){
              props.onDeleteComment(row.no);
            }
          }}>삭제</button>
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
