const { User } = require('../models');

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //get single user
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user
              }))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },


    //create new user
    newUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        // console.log(`added`)
        .catch((err) => res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOne({ _id: req.params.userId }, (err, toUpdate) => {
            toUpdate.userName = req.body.userName;
            toUpdate.save();
            res.status(200).json(toUpdate);
        });

    },

    removeUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId}, (err, result) => {
            if (result) {
                res.status(200).json(result);
                console.log(`deleted: ${result}`);
            } else {console.log('Uh Oh, something went wrong');
            console.log(err);
                res.status(500).json({ message: 'something went wrong' });
            }
        });
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
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

    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } },
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


};
