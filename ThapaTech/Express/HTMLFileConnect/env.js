// env.js
const z = require('zod');

// Define the portSchema using Zod to validate the port number
const portSchema = z.coerce.number().min(1).max(6500).default(3000);

// Parse and validate process.env.PORT, and fall back to default if invalid
const PORT = portSchema.parse(process.env.PORT);

module.exports = { PORT };
  