const cron = require('node-cron');

import { getDataFromBrowserAi } from '../controllers/eventsController';
import { Request, Response, NextFunction } from 'express';

cron.schedule('0 */12 * * *', async () => {
  try {
    console.log('Cron job started: Updating events');
    
    await getDataFromBrowserAi(undefined as unknown as Request, undefined as unknown as Response, undefined as unknown as NextFunction);
    
    console.log('Cron job completed: Events successfully updated');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});
