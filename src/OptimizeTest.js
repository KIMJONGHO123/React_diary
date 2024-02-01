import React, { useEffect, useState } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Counter A Update - count : ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`Counter B Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (preProps, nextProps) => {
  if (preProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false; // count가 달라지면 그때 리렌더링 해
  // return true 이전 프롭스화 현재 프롭스가 같다. -> 리렌더링을 일으키지 않음
  // return false  이전과 현재가 다르다 -> 리렌더링을 일으키라
};

const MEmoizedCounterB = React.memo(CounterB, areEqual);
const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button
          onClick={() => {
            setCount(count);
          }}
        >
          A button
        </button>
      </div>
      <div>
        <h2>Count B</h2>
        <MEmoizedCounterB obj={obj} />
        <button
          onClick={() => {
            setObj({
              count: obj.count,
            });
          }}
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
