import React from 'react';
import {useContext} from 'react';
//컨텍스트 파일 임포트
import {SimpleContext} from '../context/SimpleContext';

const CompContext2a = ()=>{
  //useContext 변수 생성. 이때 임포트할 파일을 인수로 전달.
  const contextData = useContext(SimpleContext);
  return(
    <div>
      <h4>Context2a 컴포넌트</h4>
      {contextData}
    </div>
  );
}

export default CompContext2a;