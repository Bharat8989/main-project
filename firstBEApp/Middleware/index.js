const express = require('express')
const app = express()
const port = 3000
// loading the middleware into the app 


// express.json()
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.body);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})