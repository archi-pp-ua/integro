'use strict'

const server = require('./server')
const events = require('./events')
const calls = require('./calls')

const integro = {} 

integro.call = async function (method, params) {
    return await calls.call(method, params, integro.call, integro.emit)
}

integro.emit = async function (event, params) {
    events.emit(event, params, integro.call, integro.emit)
}

integro.startServer = function () {
    server((req, res) => {
        const path = req.url.split('/')
        path[1] = path[1].split('?')[0]
        path[1] = path[1] || 'index'
        try {
            const mod = require('../modules/' + path[1])
            mod(req, res, integro.call, integro.emit)
        } catch (e) {
            // console.error(e)
            res.sendStatus(404)
        }
    })
}

integro.loadMethods = async function () {
    await calls.load()
}

integro.loadEvents = async function () {
    await events.load()
    integro.emit('startup', {})
}

module.exports = integro
