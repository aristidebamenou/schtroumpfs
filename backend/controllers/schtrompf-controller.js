const Schtrompf = require('../models/schtrompf')

module.exports = {

    readAll(req, res) {
        Schtrompf.find().then(
            schtrompfs => res.status(200).json(schtrompfs),
            err => res.status(400).json({
                message: "Erreur lors de la récupération des schtrompfs",
                erreur: err
            })
        );
    },

    read(req, res) {
        const { id } = req.params;
        Schtrompf.findById(id).then(
            schtrompf => res.status(200).json(schtrompf),
            err => res.status(400).json({
                message: "Erreur lors de la récupération d'un schtrompf",
                erreur: err
            })
        );
    },

    create(req, res) {
        const { name } = req.body;
        const { family } = req.body;
        const { race } = req.body;
        const { foods } = req.body;

        const schtrompf = new Schtrompf({ name, family, race, foods });

        schtrompf.save().then(
            schtrompf => res.status(201).json({
                message: "Création d'un schtrompf",
                schtrompf: schtrompf
            }),
            err => res.status(400).json({
                message: "Erreur lors de la création du schtrompf",
                erreur: err
            })
        );
    },

    put(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const { family } = req.body;
        const { race } = req.body;
        const { foods } = req.body;

        Schtrompf.findOneAndUpdate(id, { name, family, race, foods }).then(
            () => res.status(200).json({ message: "Modification d'un schtrompf" }),
            err => res.status(400).json({
                message: "Erreur lors de la modification d'un schtrompf",
                erreur: err
            })
        );
    },

    delete(req, res) {
        const { id } = req.body;

        Schtrompf.findByIdAndRemove(id).then(
            () => {
                Schtrompf.find().then(
                    (schtrompfs) => {
                        schtrompfs.forEach(schtrompf => {
                            index = schtrompf.friends.indexOf(id)
                            if (index > -1) {
                                schtrompf.friends.splice(index, 1);
                            }
                            schtrompf.save()
                        })
                    }
                );

                res.status(204).json({
                    message: "Suppression du schtrompf",
                });
            },

            err => res.status(400).json({
                message: "Erreur lors de la suppression d'un schtrompf",
                erreur: err
            })
        );
    },

    retrieveFriends(req, res) {
        const { id } = req.params;

        Schtrompf.findById(id).populate('friends').then(
            (schtrompf) => res.status(200).json(schtrompf.friends),
            err => res.status(400).json({ message: "Erreur lors des amis", erreur: err })
        )

    },

    addFriend(req, res) {
        const { id } = req.params;
        const { friend_id } = req.body;

        Schtrompf.findById(id).then(
            schtrompf => {
                Schtrompf.findById(friend_id).then(
                    (friend) => {

                        schtrompf.friends.push(friend);

                        schtrompf.save().then(
                            (schtrompf) => {
                                res.status(201).json({
                                    message: "Création d'un ami",
                                    schtrompf: schtrompf
                                })
                            },
                            err => res.status(400).json({
                                message: "Erreur lors de l'ajout d'ami",
                                erreur: err
                            })
                        )

                    },
                    err => res.status(404).json({
                        message: "Erreur lors de la récupération de l'ami",
                        erreur: err
                    })
                )

            },
            err => res.status(404).json({
                message: "Erreur lors de la récupération du schtrompf",
                erreur: err
            })
        )

    },

    removeFriend(req, res) {
        const { id } = req.params;
        const { friend_id } = req.body;

        Schtrompf.findById(id).then(
            (schtrompf) => {
                index = schtrompf.friends.indexOf(friend_id)

                if (index > -1) {
                    schtrompf.friends.splice(index, 1);
                }


                schtrompf.save().then(
                    (schtrompf) => {
                        res.status(204).json({
                            message: "Suppression d'un ami",
                            schtrompf: schtrompf
                        })
                    },
                    err => res.status(400).json({
                        message: "Erreur lors de la suppression d'ami",
                        erreur: err
                    })
                )

            },
            err => res.status(400).json({
                message: "Erreur lors de la récupération du schtrompf",
                erreur: err
            })
        )
    },

}