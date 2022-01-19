const router = require('express').Router();
const {
    getThoughts,
    getThought,
    newThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(newThought);

router.route('/:thoughtId').get(getThought).delete(removeThought).put(updateThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

// router.route('/:ThoughtId/assignments').post(addAssignment);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;