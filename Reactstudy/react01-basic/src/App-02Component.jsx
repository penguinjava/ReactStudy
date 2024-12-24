import './App.css'
// 컴포넌트는 일반적인 JS의 함수와 동일하게 제작한다.

// function MyBody(){
// 화살표함수로도 컴포넌트를 작성할 수 있다.

const MyBody = () => {
  /*
  함수형 컴포넌트에서 return은 UI를 화면상에 렌더링하는 역할을 한다.
  따라서 반드시 기술해야한다.
  */
  return(<>
        <ol>
      <li>프론트앤드</li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Javascript</li>
        <li>jQuery</li>
      </ul>
      <li>백앤드</li>
      <ul>
        <li>Java</li>
        <li>Oracle</li>
        <li>JSP</li>
        <li>Spring Boot</li>
      </ul>
    </ol>
  </>);
}

/*
Vite를 통해 React프로젝트를 생성하면 최상위 컴포넌트는 App이 된다.
App하위에 자식 컴포넌트를 추가하면서 웹애플리케이션을 개발하게된다.
*/
function App() {
    /*
  컴포넌트에서의 UI는 반드시 최상위 엘리먼트가 1개여야 한다.
  만약 2개 이상 되는 경우가 있다면 하나의 태그로 묶어줘야한다
  React에서는 이를 위해 프레그먼트(<></>)를 제공한다.
  */
  return (<>
    <h2>React - 기본</h2>
    {/* 부모컴포넌트 하위에 자식컴포넌트를 삽입할때는 HTML 태그와 같이
    기술하면 된다. */}
    <MyBody></MyBody>
  </>)
}

export default App
