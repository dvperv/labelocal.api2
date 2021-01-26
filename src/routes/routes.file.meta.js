const controllerFileMeta = require('../controllers/controller.file.meta')

module.exports = (app) => {
    // create a meta
    app.post('/api/meta', controllerFileMeta.create);

    // get the list of metas
    app.get('/api/meta', controllerFileMeta.fetch);

    // get a single meta
    app.get('/api/meta/:id', controllerFileMeta.get);

    // update a meta
    app.put('/api/meta/:id', controllerFileMeta.update);

    // delete a meta
    app.delete('/api/meta/:id', controllerFileMeta.delete);
}
