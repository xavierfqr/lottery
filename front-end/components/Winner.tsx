import { useLotteryRead } from '@/hooks/hooks';
import React from 'react';

const Winner = () => {
  const { data: dataWinner = '' } = useLotteryRead('lastWinner');

  return <div>{dataWinner ? <div>last winner : {dataWinner}</div> : <div>no winner yet</div>}</div>;
};

export default Winner;
