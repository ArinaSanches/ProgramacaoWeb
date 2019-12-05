const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const CampusSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true,
    },
    nome :{
        type : String,
        required: true,
    },
    cursos:[{
        type: String,
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Campus', CampusSchema);