import './App.css';
import { useState } from 'react';

//컨텍스트 임포트
import {ThemeContext} from './context/ThemeContext';
import { SimpleContext } from './context/SimpleContext';

//모듈화된 컴포넌트 임포트
import Page from "./components/Page";


function App() {
  //테마 변경을 위한 State
  const [isDark, setIsDark]=useState(false);
  
  /** 데이터 공유를 위한 프로바이더는 2개 이상을 겹쳐서 래핑할 수 있다. */
  return (<>
    {/* <SimpleContext.Provider value={'Welcome 헝딜동'}> */}
    <ThemeContext.Provider value={{isDark,setIsDark}}>
      <div className="App">
        <Page></Page>
      </div>
    </ThemeContext.Provider>
    {/* </SimpleContext.Provider> */}
  </>);
}

export default App;
