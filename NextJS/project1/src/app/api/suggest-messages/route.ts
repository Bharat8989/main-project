import { NextResponse } from 'next/server';

// Function to generate random open-ended questions
function generateQuestions() {
  const questions = [
    "What’s a hobby you’ve recently started?",
    "If you could have dinner with any historical figure, who would it be?",
    "What’s a simple thing that makes you happy?",
    "If you could visit any country, where would you go and why?",
    "What’s the most memorable experience you’ve had this year?",
    "If you had unlimited time and resources, what would you spend your days doing?",
    "What’s your favorite book or movie and why does it resonate with you?",
    "If you could master any skill instantly, what would it be?",
    "What’s something that always makes you smile?",
    "If you could switch lives with someone for a day, who would it be?",
    "What’s a goal you’re currently working on?",
    "If you could relive any day in your life, which one would it be and why?",
    "What’s one piece of advice you’d give your younger self?",
    "If you could time travel, would you go to the past or future?",
    "What’s a skill you’ve always wanted to learn but never had the chance?",
    "What’s a personal achievement you’re really proud of?",
    "If you could have any superpower, what would it be and how would you use it?",
    "What’s the best compliment you’ve ever received?",
    "If you had to live in a different era, which one would you choose and why?",
    "What’s one thing you do to relax and unwind after a long day?",
    "If you could create a new holiday, what would it be about?",
    "What’s the best trip you’ve ever been on?",
    "If you had to describe yourself in three words, what would they be?",
    "What’s something you believe in strongly, even if others disagree?",
    "If you could switch careers for a day, what job would you try?",
    "What’s the best piece of advice you’ve ever received?",
    "If your life were a movie, what would the title be?",
    "What’s a random act of kindness you’ve witnessed or done recently?",
    "If you had a theme song that played every time you walked into a room, what would it be?",
    "What’s one thing you hope to accomplish in the next year?"
  ];
  

  // Shuffle and pick 3 random questions
  const shuffled = questions.sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffled.slice(0, 3);

  return selectedQuestions.join(' || ');
}

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Generate the list of 3 random questions
    const questions = generateQuestions();

    // Return the questions as a response
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('An unexpected error occurred:', error);

    // Return an error response
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
