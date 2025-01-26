import https from 'https';
import chalk from 'chalk';

const getJoke = () => {
  const url = 'https://official-joke-api.appspot.com/random_joke';

  https.get(url, (response) => {
    let data = '';

    // Collecting data in chunks
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Parsing and displaying the joke once all data is received
    response.on('end', () => {
      try {
        const joke = JSON.parse(data); // Parse the response data
        console.log(`Here is a random ${joke.type} joke:`); 
        console.log(chalk.red(joke.setup)); // Corrected chalk usage
        console.log(chalk.blue.bgRed.bold(joke.punchline)); // Corrected chalk usage
      } catch (err) {
        console.error("Error parsing the joke data:", err.message);
      }
    });

    // Handling HTTP errors (like 404, 500, etc.)
    response.on('error', (err) => {
      console.error(`Error fetching the joke: ${err.message}`);
    });
  }).on('error', (err) => { // Added error handler for `https.get` itself
    console.error(`Request failed: ${err.message}`);
  });
};

getJoke();
