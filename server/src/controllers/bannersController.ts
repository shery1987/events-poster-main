import { Request, Response, NextFunction } from 'express';
import { BannerModel } from '../models/banner.models';


export const getAllBanners = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allBanners = await BannerModel.find().sort({ event_date: 1 });

      res.status(200).json(allBanners);
    } catch (error) {
      next(error);
    }
};

export const createBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBannerData: any = { ...req.body };  
        console.log(newBannerData)
     
      const newBanner = new BannerModel(newBannerData);
      await newBanner.save();
      
      res.status(201).json(newBanner);
    } catch (error) {
      console.error("Error creating subscription:", error);
      
      if (error instanceof Error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error", details: "Unknown error" });
      }
    }
};


export const deleteBunner = async (req: Request, res: Response, next: NextFunction) => {
    const bannerId = req.params.id;

    try {
      const deletedBanner = await BannerModel.findByIdAndDelete(bannerId);

      if (!deletedBanner) {
        return res.status(404).json({ message: 'Banner not found' });
      }

      res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
      next(error);
    }
};
  


