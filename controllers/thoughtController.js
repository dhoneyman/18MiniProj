const { Thought, User, Reaction } = require('../models');

module.exports = {
    //get all users
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            const thoughtObj = {
                thoughts
            };
            return res.json(thoughtObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //get single Thought
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({
                thought
              }))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },


    //create new Thought
    newThought(req, res) {
        Thought.create(req.body)
        .then((updateUser => { 
            console.log(req.body);
            console.log(updateUser);
            User.findOneAndUpdate(
            { userName: req.body.userName },
            { $addToSet: { thoughts: updateUser._id } },
            // { runValidators: true, new: true }
            )}
        ))
        
        .then((thought) => {
            console.log(thought)
            res.json(thought)})
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)})
        
        
    },

    updateThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }, (err, toUpdate) => {
            toUpdate.thoughtText = req.body.thoughtText;
            toUpdate.save();
            res.status(200).json(toUpdate);
        });
    },

    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId}, (err, result) => {
            if (result) {
                res.status(200).json(result);
                console.log(`deleted: ${result}`);
            } else {console.log('Uh Oh, something went wrong');
            console.log(err);
                res.status(500).json({ message: 'something went wrong' });
            }
        });
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
    //   { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
        
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { userId: req.params.reactionId } } },
        //   { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },


}