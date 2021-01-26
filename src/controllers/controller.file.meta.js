const modelFileMeta = require('../model/model.file.meta');

module.exports = {
    //# create
    create: async (request, reply) => {
        try {
            const meta = request.body;
            const newMeta = await modelFileMeta.create(meta);
            reply.code(201).send(newMeta);
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#get the list
    fetch: async (request, reply) => {},

    //#get a single one
    get: async (request, reply) => {},

    //#update
    update: async (request, reply) => {},

    //#delete
    delete: async (request, reply) => {},
};
