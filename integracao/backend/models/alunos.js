const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const AlunoSchema = new mongoose.Schema({
    matricula: {
        type: Number,
        required: true,
        unique: true,
    },
    nome :{
        type : String,
        required: true,
    },
    campi :{
        type : Number,
        required: true,
    },
    curso:{
        type: String,
        required: true,
    },
    nascimento:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    ddd:{
        type : String,
        required : true,
    },
    telefone:{
        type : String,
        required : true,
    },
    operadora:{
        type : String,
        required : true,    
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Aluno', AlunoSchema);