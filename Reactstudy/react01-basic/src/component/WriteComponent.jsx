import React from "react";

function WriteComponent(props){
    return(
        <>
     <header>
        <h2>게시판-작성</h2>
     </header>
     <nav>
        <a href="/" onClick={(event)=>{
          event.preventDefault();
          props.changeMode('list');
        }}>목록</a>
     </nav>
     <article>
        <form>
            <table id="boardTable">
                <tbody>
                    <tr>
                        <th>작성자</th>
                        <td><input type="text" name="writer"/></td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td><input type="text" name="title"/></td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td><input type="contents" cols="22" rows="3"/></td>
                    </tr>
                </tbody>
                {/* JSX는 HTML과 유사한 문법을 사용하지만, XML의
								문법을 따르므로 반드시 쌍(Pair)을 이뤄야한다. 따라서<input>태그도
								아래와 같이 종료태그를 작성해 야한다.*/}
                <input type="submit" value="전송"></input>
            </table>
        </form>
     </article>
        </>
    )
}

export default WriteComponent;