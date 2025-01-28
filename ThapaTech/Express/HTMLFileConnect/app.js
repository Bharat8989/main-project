
const express=require('express')


const path=require('path')
// import { fileURLToPath } from 'url'; // Import to handle import.meta.url

const { PORT } = require('./env');

const app = express();


// Basic route 
app.get('/', (req, res) => {
  const homePagePath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(homePagePath);
});

app.use(express.static('public'))

// Start the server on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
