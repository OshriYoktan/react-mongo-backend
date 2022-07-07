const dbService = require('../../services/dbService')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    addToy,
    updateToy,
    getById,
    removeToy
}

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection('todo_list')
        const toy = await collection.find().toArray()
        var toysCopy = JSON.parse(JSON.stringify(toy))
        var toysForDisplay = toysCopy
        if (filterBy.q) {
            return toysForDisplay = toysCopy.filter((toy) => {
                return toy.title.toLowerCase().includes(filterBy.q.toLowerCase())
            })
        } else {
            return toysForDisplay
        }
    }
    catch (err) {
        console.log('Error - query:', err.message);
    }
}


async function addToy(toy) {
    try {
        const collection = await dbService.getCollection('todo_list')
        await collection.insertOne(toy)
        return toy;
    } catch (err) {
        console.log('Error - add:', err.message);
    }
}

async function updateToy(toy) {
    try {
        toy._id = ObjectId(toy._id)
        const collection = await dbService.getCollection('todo_list')
        await collection.updateOne({ '_id': toy._id }, { $set: toy })
        return toy;
    } catch (err) {
        console.log('Error - add:', err.message);
    }
}

async function getById(id) {
    const collection = await dbService.getCollection('toy')
    const toy = await collection.findOne({ '_id': ObjectId(id) })
    return toy
}

async function removeToy(toyId) {
    try {
        const collection = await dbService.getCollection('todo_list')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        console.log('Error - add:', err.message);
    }
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}