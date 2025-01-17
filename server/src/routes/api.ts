import express from 'express';
import { registerUser, authoriseUser, getUser, logOut } from '../controllers/userController';
import { createEvent, getAllEvents, getSingleEvent, deleteEvent, approveEvent, getAdditionalEventData } from '../controllers/eventsController';
import { getAllSubscriptions, createSubscription, deleteSubscription} from '../controllers/subscribeController';
import { getAllBanners, createBanner, deleteBunner } from '../controllers/bannersController';
const router = express.Router();


// ***
// Events API routers
// ***

// Route for creating new event in DB
router.post('/create-event', createEvent);

// Route to get all events from DB
router.get('/all-events', getAllEvents);

// Route to get single event from DB
router.get('/single-event/:id', getSingleEvent);

// Route for event deleting
router.delete('/delete-event/:id', deleteEvent);

// Route for event approval
router.put('/approve-event/:id', approveEvent);

// Route for additional event data
router.post('/additional-event-data', getAdditionalEventData);


// ***
// User API routers
// ***

router.post('/sign-up', registerUser);

router.post('/login', authoriseUser);

router.get('/user/:id', getUser);

router.post('/logout', logOut);


// ***
// Subscribe routers
// ***

router.get('/all-subscriptions', getAllSubscriptions);

router.post('/create-subscribe', createSubscription);

router.delete('/delete-subscription/:id', deleteSubscription);


// ***
// Banner roters
// ***

router.get('/all-banners', getAllBanners);

router.post('/create-banner', createBanner);

router.delete('/delete-banner/:id', deleteBunner);


export default router;
