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
    fetch: async (request, reply) => {
        try {
            const metas = await modelFileMeta.find({});
            reply.code(200).send(metas);
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#get a single one
    get: async (request, reply) => {
        try {
            const metaId = request.params.id;
            const meta = await modelFileMeta.findById(metaId);
            reply.code(200).send(meta);
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#update
    update: async (request, reply) => {
        try {
            const metaId = request.params.id;
            const updates = request.body;
            await modelFileMeta.findByIdAndUpdate(metaId, updates);
            const updatedMeta = await modelFileMeta.findById(metaId);
            reply.code(200).send({ data: updatedMeta });
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#delete
    delete: async (request, reply) => {
        try {
            const metaId = request.params.id;
            const metaToDelete = await modelFileMeta.findById(metaId);
            await modelFileMeta.findByIdAndDelete(metaId);
            reply.code(200).send({ data: metaToDelete });
        } catch (e) {
            reply.code(500).send(e);
        }
    },
};
