// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose');
const remote = require('./remote.file')
const config = require('./config')
const routesMeta = require('./routes/routes.file.meta')

//connected fastify to mongoose
try {//
    mongoose.connect(config.mongo);
} catch (e) {
    console.error(e);
}

fastify.register(require('fastify-cors'), {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE'
})

// Declare a route
routesMeta(fastify);

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.get('/file', async (request, reply) => {
    let res = await remote.get();
    return { res:  res}
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
