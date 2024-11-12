require('newrelic');

const express = require('express');
const pino = require('pino');
const pinoHttp = require('pino-http');

const app = express();
const logger = pino({ level: 'debug' });

let customSuccessMessage = undefined;

// Uncomment the following line to use a custom success message
// customSuccessMessage = (req, res) => (!req.readableAborted && res.writableEnded ?
//     'Http Request Completed' :
//     'Http Request Aborted');


app.use(pinoHttp({ logger, customSuccessMessage }));

app.get('/', (req, res) => {
    logger.info('Handling request for root route');
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
