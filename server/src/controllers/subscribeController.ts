import { Request, Response, NextFunction } from 'express';
import { SubscribeModel } from '../models/subscribe.models';


export const getAllSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allSubscriptions = await SubscribeModel.find().sort({ event_date: 1 });

    res.status(200).json(allSubscriptions);
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newSubscriptionData: any = { ...req.body };  
   
    const newSubscription = new SubscribeModel(newSubscriptionData);
    await newSubscription.save();
    
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error", details: "Unknown error" });
    }
  }
};


export const deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
  const subscriptionId = req.params.id;

  try {
    const deletedSubscription = await SubscribeModel.findByIdAndDelete(subscriptionId);

    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

  res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
      next(error);
    }
};
  


