'use strict'

const fs = require('fs')

const events = {
    list: {}
}

events.emit = function (event, params, call, emit) {
    if (events.list[event]) {
        for (const i in events.list[event]) {
            const func = events.list[event][i]
            func(event, params, call, emit)
        }
    }
}

events.load = async function () {

    let dirList = []
    try {
        dirList = await fs.promises.readdir(__dirname + '/../modules')
    } catch (e) {}

    for (const i in dirList) {
        try {
            if (fs.existsSync(__dirname + '/../modules/' + dirList[i] + '/subscriptions.js')) {
                const subscriptions = require('../modules/' + dirList[i] + '/subscriptions')
                for (const i in subscriptions) {
                    events.list[i] = events.list[i] || []
                    events.list[i].push(subscriptions[i])
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    
    return true
    
}

module.exports = events
