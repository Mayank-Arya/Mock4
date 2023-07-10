const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://mayank:arya@cluster0.8xr2pbh.mongodb.net/FindBook?retryWrites=true&w=majority')


module.exports = {
    connection
}