const Box = require('../models/Box');

class BoxController {
    async store(req, res) {
        const boxName = req.body.title;

        const boxFinded = await Box.find({ title: boxName });

        if (boxFinded.length > 0) return res.json(boxFinded[0]);

        const box = await Box.create({ title: req.body.title });

        return res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(box);
    }
}

module.exports = new BoxController();
