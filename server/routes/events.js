const express = require("express");

const router = express.Router();


const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");


const {
    protect,
    admin
} = require("../middleware/auth");



// Public

router.get("/", getEvents);

router.get("/:id", getEventById);



// Admin

const upload = require('../middleware/upload');


router.post(
    '/',
    protect,
    admin,
    upload.single("image"),
    createEvent
);


router.put(
    "/:id",
    protect,
    admin,
    updateEvent
);


router.delete(
    "/:id",
    protect,
    admin,
    deleteEvent
);



module.exports = router;