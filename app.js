'use strict'

const integro = require('./integro')

process.on('uncaughtException', function (e) {
    console.error(e)
})

async function init () {
    await integro.loadMethods()
    await integro.loadEvents()
    integro.startServer()
}

init()
