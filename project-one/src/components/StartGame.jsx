import React from 'react';
import { Button } from './styled/Button.js';

const StartGame = ({ toggle }) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen max-w-screen-xl mx-auto p-4'>
      <img src='/img/dice.png' alt='Dice' className='w-48 md:w-64 mb-6' />
      <div className='text-center'>
        <h1 className='text-4xl md:text-6xl font-bold whitespace-nowrap mb-4'>
          Dice Game
        </h1>
        <Button onClick={toggle} className='mt-4'>
          Play Now
        </Button>
      </div>
    </div>
  );
};

export default StartGame;
