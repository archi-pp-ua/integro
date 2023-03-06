'use strict'

const fs = require('fs')

const calls = {
    methods: {}
}

calls.call = async function (method, params, call, emit) {
    let result = null

    try {
        result = await calls.methods[method](method, params, call, emit)
    } catch (e) {
        console.error(e)
    }

    return result
}

calls.load = async function () {
    let dirList = []
    try {
        dirList = await fs.promises.readdir(__dirname + '/../modules')
    } catch (e) {}

    for (const i in dirList) {
        try {
            if (fs.existsSync(__dirname + '/../modules/' + dirList[i] + '/methods.js')) {
                const methods = require('../modules/' + dirList[i] + '/methods')
                for (const i in methods) {
                    calls.methods[i] = methods[i]
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    
    return true
}

module.exports = calls
