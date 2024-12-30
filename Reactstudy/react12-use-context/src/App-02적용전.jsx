import './App.css';
import { useState } from 'react';

//App컴포넌트가 전달한 Props를 다시 하위 컴포넌트로 전달
const Page =({isDark, setIsDark})=>{
  return(
    <div className="page">
      <Header isDark={isDark}></Header>
      <Content isDark={isDark}></Content>
      <Footer isDark={isDark} setIsDark={setIsDark}></Footer>
    </div>
  );
}

const Header = ({isDark})=>{
  // isDark의 값에 따라 배경색과 글자새깅 토글되도록 스타일을 설정
  return(
    <header className="header"
    style={{
      backgroundColor :isDark ? 'black' :'lightgray',
      color : isDark ? 'white' : 'black'
    }}>
      <h1>Welcome 헝딜동..!!</h1>
    </header>
  );
}

const Content = ({isDark})=>{
  return(
    <div className="content"
    style={{
      backgroundColor : isDark ?'black' : 'lightgray',
      color : isDark ? 'white' : 'black'
    }}>
      <p>헝딜동 반가워.. ㅋㅋ</p>
    </div>
  )
}

const Footer = ({isDark, setIsDark})=>{
  //다크모드를 토글시켜주는 함수
  const toggleTheme = () =>{
    //State를 변경하는 세터 함수를 사용
    setIsDark(!isDark);
  }
  return (
    //isDark의 값에 따라 배경색이 변경
    <div className="footer"
    style={{
      backgroundColor : isDark ?'black' : 'lightgray'
    }}>
      {/* 버튼을 누를때마다 다크모드가 전체적으로 토글되어 적용된다. */}
      <input type="button" value="Dark Mode" className="button"
      onClick ={toggleTheme}></input>
    </div>
  );
}
function App() {
  // 다크모드 변경을 위한 State
  const [isDark, setIsDark]=useState(false);
  return (<>
    <div className="App">
      {/* 자식 컴포넌트로 State로 선언한 변수와
      함수를 전달 */}
      <Page isDark={isDark} setIsDark={setIsDark}></Page>
    </div>
  </>);
}

export default App;
