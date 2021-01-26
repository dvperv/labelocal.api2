module.exports = (app) => {
    // create a meta
    app.post('/api/meta', (request, reply) => {});

    // get the list of metas
    app.get('/api/meta', (request, reply) => {});

    // get a single meta
    app.get('/api/meta/:id', (request, reply) => {});

    // update a meta
    app.put('/api/meta/:id', (request, reply) => {});

    // delete a meta
    app.delete('/api/meta/:id', (request, reply) => {});
}
