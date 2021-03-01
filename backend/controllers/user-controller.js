const User = require('../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports = {

    authentication(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            const userId = decodedToken.userId;
            if (req.body.userId && req.body.userId !== userId) {
                throw 'Utilisteur invalide!';
            } else {
                next();
            }
        } catch {
            res.status(401).json({ message: "Veuillez vous connectez." });
        }
    },

    signup(req, res) {

        const { username } = req.body;
        const { password } = req.body;

        bcrypt.hash(password, 10).then(
            hash => {
                const user = new User({
                    username: username,
                    password: hash
                });
                user.save().then(
                    () => res.status(201).json({ message: 'Utilisateur créé !' }),
                    () => res.status(400).json({ message: "Impossible de créer l'utilisateur" })
                );
            },
            () => res.status(500).json({ message: "Impossible de créer l'utilisateur" })
        )
    },

    login(req, res) {

        const { username } = req.body;
        const { password } = req.body;

        User.findOne({ username: username }).then(
            user => {
                if (!user) {
                    return res.status(401).json({ message: 'Utilisateur non trouvé !' });
                }
                bcrypt.compare(password, user.password).then(
                    valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Mot de passe incorrect !' });
                        }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
                        });
                    },
                    () => res.status(500).json({ message: "Impossible de se connecter" })
                );
            },
            () => res.status(500).json({ message: "Impossible de se connecter" })
        );
    }

}