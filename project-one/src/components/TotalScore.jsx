import React from 'react';

const TotalScore = ({ score }) => {
  return (
    <div className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto text-center p-4'>
      <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold leading-tight'>
        {score}
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl font-medium mt-2'>
        Total Score
      </p>
    </div>
  );
};

export default TotalScore;
