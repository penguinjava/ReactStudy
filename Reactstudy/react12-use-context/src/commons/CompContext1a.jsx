import React from 'react';
import CompContext2a from './CompContext2a';

//Props없이 컴포넌트 추가
const CompContext1a = ()=>{
  return(
    <div>
      <h4>Context1a 컴포넌트</h4>
      <CompContext2a/>
    </div>
  );
}

export default CompContext1a;