import './App.css';
import { useState, useEffect, useCallback } from 'react';

//Box컴포넌트. Props를 통해 <div>의 스타을 전달받음.
const Box = ({ createBoxStyle }) => {
  // State :초기값으로 빈 객체를 설정
  const [style, setStyle] = useState({});

  //Props를 통해 전달받은 createBoxStyle이 변경될때 마다 호출되도록 정의
  useEffect(() => {
    console.log('박스 키우기');
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  //<div> 박스를 렌더링한다.
  return <div style={style}></div>;
};

function App() {
  //박스와 배경색을 위한 State 선언
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  /**
  Step1 : App 컴포넌트가 렌더링될때마다 새로운 참조값이 부여된다. 따라서
   테마변경을 눌러도 이와 상관없는 '박스키우기'가 출력된다.
   */
//  const createBoxStyle = () => {
//    return {
//      backgroundColor: 'pink',
//      width: `${size}px`,
//      height: `${size}px`,
//    };
//  };

  /**
  Step2 : useCallback 훅을 적용함. size가 변경될때만 새롭게 함수를
  메모리제이션 하므로 애플리케이션의 퍼포먼스가 향상된다.
   */
  const createBoxStyle = useCallback(()=>{
    return {
            backgroundColor: 'pink',
            width: `${size}px`,
            height: `${size}px`,
          };
  },[size]);

  return (
    //<div> 박스의 배경색이 isDark에 따라 black/white로 변경된다.
    <div
      className="App" 
      style={{
        background: isDark ? 'black' : 'white',
      }}
    >
      <h2>useCallback()</h2>
      {/* 스핀박스로 변경한 값이 size를 변경하고, 새롭게 렌더링된다. */}
      <input 
        type="number" 
        value={size}
        step={5}
        onChange={(e) => setSize(e.target.value)}
      />
      {/* 버튼을 누를때마다 black/white가 토글된다. */}
      <button onClick={() => setIsDark(!isDark)}>
        테마변경
      </button>
      {/* Style을 반환하는 함수를 Props로 전달한다. */}
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
}

export default App;