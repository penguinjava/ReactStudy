import React from 'react';
import {useContext} from 'react';
import { SimpleContext } from '../context/SimpleContext';

const CompContext2b = ()=>{
  const contextData = useContext(SimpleContext);
  return(
    <div>
      <h4>Context2b 컴포넌트</h4>
      {/* 컨텍스트 프로바이더로 랩핑할때 value속성을
      통해 전달된 데이터를 공유받게 된다. 이데이터는
      JSON객체이므로 아래와 같이 사용할 수 있다. */}
      {contextData.str}<br/>
      myNumber : {contextData.num}
    </div>
  );
}

export default CompContext2b;