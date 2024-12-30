import './App.css';
import { useState } from 'react';

import {ThemeContext} from './context/ThemeContext';
import { SimpleContext } from './context/SimpleContext';
import Page from "./components/Page";


function App() {
  const [isDark, setIsDark]=useState(false);
  return (
    /** SimpleContext를 주석 처리하면 모듈에서 초기화 한값이 출력되고,
    활송화하면 value속성으로 부여한 값이 출력된다.
    즉 프로바이더로 랩핑하여 value로 적용한 값이 우선순위가 높다.*/
    // <SimpleContext.Provider value={'Welcome 헝딜동'}>
    <ThemeContext.Provider value={{isDark,setIsDark}}>
      <div className="App">
        <Page></Page>
      </div>
    </ThemeContext.Provider>
    // </SimpleContext.Provider>
    );
}

export default App;
