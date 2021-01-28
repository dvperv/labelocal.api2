const controller = require('../controllers/controller.file.meta')

module.exports = (app) => {
    // create a meta
    app.post('/api/meta', controller.create);

    // get the list of metas
    app.get('/api/meta', controller.fetch);

    // get a single meta
    app.get('/api/meta/:id', controller.get);

    // update a meta
    app.put('/api/meta/:id', controller.update);

    // delete a meta
    app.delete('/api/meta/:id', controller.delete);
}
