import React from 'react';
import CompProps2 from './CompProps2';

//부모에서 전달된 Props를 {}를 이용해서 이름 그대로 전달받는다.
const CompProps1 = ({propData, myNumber})=>{
  return(
    <div>
      <h4>Props1 컴포넌트</h4>
      {propData}
      {/* Props를 통해 하위 컴포넌트로 다시 전달한다. */}
      <CompProps2 propData2={propData}
      myNumber={myNumber}/>
    </div>
  );
}

export default CompProps1;