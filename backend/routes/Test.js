const express = require("express") 
const router = express.Router()
const {Event} = require("../models")

router.get("/", async (req, res)=>{
    const listEvent = await Event.findAll() 
    res.json(listEvent)
})
router.post("/", async (req,res) => {
    const post = req.body;
   await Event.create(post)
   res.json(post)
})

router.put("/:id", async (req, res) => {
    const eventId = req.params.id;
    const eventData = req.body;
    try {
        const updatedEvent = await Event.update(eventData, {
            where: { event_id: eventId },
        });
        if (updatedEvent[0] === 1) {
            res.json({ message: "Event updated successfully" });
        } else {
            res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Failed to update event" });
    }
});

router.delete("/:id", async (req, res) => {
    const eventId = req.params.id;
    try {
        // Delete the event from the database
        const deletedEventCount = await Event.destroy({
            where: { event_id: eventId },
        });
        
        // Check if the event was deleted successfully
        if (deletedEventCount === 1) {
            res.json({ message: "Event deleted successfully" });
        } else {
            res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: "Failed to delete event" });
    }
});


module.exports = router