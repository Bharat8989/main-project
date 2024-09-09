import React from 'react';

const Rules = () => {
  return (
    <div className='max-w-3xl mx-auto bg-[#fbf1f1] p-6 mt-10 rounded-lg'>
      <h2 className='text-2xl font-semibold mb-6'>
        How to play dice game
      </h2>
      <div className='space-y-4'>
        <p>Select any number</p>
        <p>Click on dice image</p>
        <p>
          After clicking on the dice, if the selected number is equal to the dice number, you will get the same points as the dice.
        </p>
        <p>If you get a wrong guess, then 2 points will be deducted.</p>
      </div>
    </div>
  );
};

export default Rules;
