// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const remote = require('./remote.file')
const config = require('./config')
const routesMeta = require('./routes/routes.file.meta')

fastify.register(require('fastify-auth0-verify'), {
    domain: config.authprovider.domain,
    audience: config.authprovider.audience,
});

//connected fastify to mongoose
try {
    console.log(config.mongo)
    mongoose.connect(config.mongo, { useNewUrlParser: true,  useUnifiedTopology: true });
} catch (e) {
    console.error(e);
}

fastify.register(require('fastify-cors'), {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
})

fastify.addHook("onRequest",
    async (
        request,
        reply) => {
        try {
            // if (request.method === 'OPTIONS') {
            //     reply
            //         .header('Access-Control-Allow-Origin', '*')
            //         .header('Access-Control-Allow-Headers', 'content-type')
            //         .send();
            // }
            // else
                await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    });
// Declare a route
routesMeta(fastify);

fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
})

fastify.post('/dir', async (request, reply) => {
    console.log("Dir Path: " + request.body.path);
    let res = null;
    try {
        res = await remote.getDir(request.body.path);
    }
    catch (e) {
        console.log('Error on DIR request: ' + e.toString())
    }
    return res;
})

fastify.post('/file', async (request, reply) => {
    console.log("File Path: " + request.body.path);
    let res = null;
    try {
        res = await remote.getFile(request.body.path);
    }
    catch (e) {
        console.log('Error on FILE request: ' + e.toString())
    }
    return res;
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, (process.env.MODE_DEV == 1 ? 'localhost' : '0.0.0.0'))
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
