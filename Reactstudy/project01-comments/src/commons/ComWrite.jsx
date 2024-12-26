import React from "react";

function ComWrite(props){
  return (<>
    <form onSubmit={(e)=>{
      e.preventDefault();

      let writer = e.target.writer.value;
      let comment = e.target.comment.value;

      props.writeAction(writer,comment);

    }}>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer"/></td>
          <td rowspan="2"><input type="submit" value="댓글작성" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment"></textarea></td>
        </tr>
      </table>
    </form>
  </>);
}

export default ComWrite;  
