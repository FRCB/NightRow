module.exports = {

    getCategory: (req, res) => {
        const db = req.app.get('db');
        const category = req.params.category;

        db.get_category([category])
            .then(category => res.status(200).send(category))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

    createEvent: (req, res) => {
        const db = req.app.get('db');
        const { category, title, date, time, address, about, contact, price } = req.body

        db.create_event([category, title, date, time, address, about, contact, price])
            .then(event => res.status(200).send(event))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

    getEvent: (req, res) => {
        const db = req.app.get('db');
        const id = req.params.id;

        db.get_event([id])
            .then(event => res.status(200).send(event))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

    editEvent: (req, res) => {
        console.log(req.body)
        const db = req.app.get('db');
        const id = req.params.id;
        const { title, date, time, address, about, contact, price } = req.body

        db.edit_event([title, date, time, address, about, contact, price, id])
            .then(event => res.status(200).send(event))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

    deleteEvent: (req, res) => {
        const db = req.app.get('db');
        const id = req.params.id;

        db.delete_event([id])
            .then(event => res.status(200).send(event))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

    createReservation: (req, res) => {
        const db = req.app.get('db');
        const { user_id, event_id } = req.body

        db.create_reservation([user_id, event_id])
            .then(reservation => res.status(200).send(reservation))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

    getReservations: (req, res) => {
        const db = req.app.get('db');

        db.get_reservations([req.user.id])
            .then(reservation => res.status(200).send(reservation))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

    deleteReservation: (req, res) => {
        const db = req.app.get('db');
        const id = req.params.id;

        db.delete_reservation([id])
            .then(event => res.status(200).send(event))
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    },

}
