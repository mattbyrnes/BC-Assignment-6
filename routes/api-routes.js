const toDoList = require('../data/list.js');
const sampleList = require('../data/sample-list.json');

module.exports = function (app) {
    app.get('/api/list', function (req, res) {
        res.json(toDoList);
    });

    app.post('/api/list', function (req, res) {
        for (let key in req.body) {
            if (!sampleList.hasOwnProperty(key)) {
                return res.json({ success: false });
            }
        }
        for (let key in sampleList) {
            if (!req.body.hasOwnProperty(key)) {
                return res.json({ success: false });
            }
        }
        toDoList.push(req.body);
        res.json({ success: true });
    });

    app.get('/api/list/:index', function (req, res) {
        res.json(toDoList[req.params.index]);
    });

    app.delete('/api/list', function (req, res) {
        for (let i = 0; i < toDoList.length; i++) {
            if (req.body.newInput === toDoList[i].newInput) {
                toDoList.splice(i, 1);
                return res.json({ success: true });
            }
        }
        return res.json({ success: false });
    });

    app.put('/api/list/:select', function (req, res) {
        for (let i = 0; i < toDoList.length; i++) {
            if (toDoList[i].newInput === req.params.select) {
                toDoList.splice(i, req.body);
                return res.json({ success: true });
            }
        }
        return res.json({ success: false });
    });

    // HTML Routes //

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });

}