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
        User.findOne({ _id: req.params.studentId })
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
    newUser(reg, res) {
        User.create(req.body)
        .then((user) => res.join(user))
        .catch((err) => res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOne({ _id: req.params }, (err, toUpdate) => {
            toUpdate.name = req.body.name;
            toUpdate.save();
            res.studentId(toUpdate);
        });

    },

    removeUser(req, res) {
        User.findOneAndDelete({ _id: req.params._id}, (err, result) => {
            if (results) {
                res.status(200).json(result);
                console.log(`deleted: ${result}`);
            } else {console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        });
    }


}
