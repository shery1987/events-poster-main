import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api';
import { errorHandler } from './middlewares/errorMiddleware';
import cors from 'cors';
import './cron/eventUpdaterCron'; 

require('dotenv').config();

const app = express();

console.log('DB_SERVER:', process.env.DB_SERVER);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);

// App variables
const PORT = process.env.PORT || 3030;
const DB_SERVER = process.env.DB_SERVER;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(`mongodb://${DB_SERVER}:${DB_PORT}/${DB_NAME}`)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/api', apiRoutes);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
