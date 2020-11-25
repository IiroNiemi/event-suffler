const Router = require('express-promise-router')
const Event_controller = require('../controllers/EventController')
const router = new Router()
module.exports = router;


/**
 * Get all events.
 */
router.get('/list', Event_controller.event_all_get);

/**
 * Find event with id.
 */
router.get('/:id', Event_controller.event_id_get);

/**
 * Create new event.
 */
router.post('/', Event_controller.event_create_post);

/**
 * Add vote to a event.
 */
router.post('/:id/vote', Event_controller.event_vote_post);

/**
 * Add vote to a event.
 */
router.get('/:id/results',Event_controller.event_results_get);


router.get('*', async (req, res) => {
    res.status(404).send('Not found!');
})
  