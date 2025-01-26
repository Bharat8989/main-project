import readline from 'readline'; // Removed unused `read` import

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [];

const showMenu = () => {
  console.log("\n1: Add a Task");
  console.log("2: View Tasks");
  console.log("3: Exit");
  rl.question("Choose an option: ", handleInput); // Fixed typo in question text and updated argument
};

const handleInput = (option) => { // Added `option` parameter
  const parsedOption = parseInt(option); // Added parsing to ensure numeric comparison

  if (parsedOption === 1) { // Used `parsedOption` instead of `option`
    rl.question("Enter the Task: ", (task) => {
      todos.push(task);
      console.log("Task Added:", task);
      showMenu();
    });
  } else if (parsedOption === 2) { // Used `parsedOption` instead of `option`
    console.log("\nYour Todo List:");
    todos.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
    showMenu();
  } else if (parsedOption === 3) { // Used `parsedOption` instead of `option`
    console.log("Goodbye!");
    rl.close();
  } else {
    console.log("Invalid Option. Please try again.");
    showMenu();
  }
};

showMenu();
