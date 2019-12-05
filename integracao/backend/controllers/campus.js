const mongoose = require('mongoose');
const Campus = require("../models/campus");
var controllerAlunos = require("../controllers/alunos.js");


module.exports.listaCampis = async function(req, res){
    const campi = await Campus.find({});
    return res.json(campi);
}

module.exports.obterCampi = async function(req, res){
    var campi = await Campus.findById(req.params.id);
    if(campi){
        res.status(200).send(campi);
    }else{
        res.status(404).send("Campi não encontrado");
    }
}

module.exports.addCampi = async function(req, res){
    
    dadosCampi = req.body;

    var campi = await Campus.find({"codigo": dadosCampi.codigo});

    if(campi.length != 0){
        res.status(400).send("Ja existe um campi cadastrado com esse codigo");
    }else{
        if(typeof dadosCampi.cursos !== 'undefined' && dadosCampi.cursos.length > 0){
            const campus = await Campus.create(req.body);            
            res.status(200).send(campus);
        }else{
            res.status(404).send("Nao eh possivel cadastrar campi sem curso!");
        }
    }          
}

module.exports.updateCampi = async function(req, res){

    var campus =  await Campus.findById(req.params.id);
    
    if(campus){
        
        dadosCampi = req.body;
        if(typeof dadosCampi.cursos !== 'undefined' && dadosCampi.cursos.length > 0){
            campus = await Campus.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).send(campus);
        }else{
            res.status(404).send("Nao eh possivel atualizar campi sem curso!");
        }

    }else{
        res.status(404).send("Não existe campi cadastrado com esse id!");  
    }
}

module.exports.deleteCampi = async function(req, res){

    var campi = await Campus.findByIdAndRemove(req.params.id);

    if(campi){
        controllerAlunos.deletarAlunosCampi(campi.codigo);
        res.status(200).send(campi);        
    }else{
        res.status(404).send("Não existe campi cadastrado com esse id!");        
    }
}