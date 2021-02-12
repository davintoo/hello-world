'use strict';

const http = require('http');
const fs = require('fs');

const SERVER_PORT = process.env.SERVER_PORT || 8080;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const logger = require('pino')({
    level: LOG_LEVEL
});

const COUNTER_FILE = '/mnt/counter/file.txt';

(async () => {
    try {
        fs.writeFileSync(COUNTER_FILE, '0');
        const requestListener = function (req, res) {
            res.writeHead(200);
            let counter = parseInt(fs.readFileSync(COUNTER_FILE).toString(), 10);
            counter++;
            fs.writeFileSync(COUNTER_FILE, counter + '');
            res.end(`I'm "${process.env.HOSTNAME || 'unknown'}" host, counter: ${counter}`);
        }
        const server = http.createServer(requestListener);
        server.listen(SERVER_PORT);
        logger.info(`Listen on ${SERVER_PORT}`);
    } catch (e) {
        logger.error(e);
    }
})();
