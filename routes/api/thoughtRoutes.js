const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// Get all thoughts or post a new one
// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// Get a single thought, update its content, or delete it
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Add or remove a reaction from a thought
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
