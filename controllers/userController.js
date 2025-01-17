const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            
            res.json({ message: 'User and thoughts deleted!' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: { _id: req.params.friendId } } },
                { new: true },
            );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true },
            );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};
