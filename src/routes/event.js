const Router = require('express-promise-router')
const EventController = require('../controllers/EventController')
const router = new Router()
module.exports = router;


/**
 * Get all events.
 */
router.get('/list', EventController.getAllEvents);

/**
 * Find event with id.
 */
router.get('/:id', EventController.getEventId);

/**
 * Create new event.
 */
router.post('/', EventController.postCreateEvent);

/**
 * Add vote to a event.
 */
router.post('/:id/vote', EventController.postEventVote);

/**
 * Add vote to a event.
 */
router.get('/:id/results',EventController.getEventResults);


router.get('*', async (req, res) => {
    res.status(404).send('Not found!');
})
  