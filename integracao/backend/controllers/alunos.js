const mongoose = require('mongoose');
const Aluno = require("../models/alunos"); 
const Campus = require("../models/campus");


module.exports.listaAlunos = async function(req, res){
    const alunos = await Aluno.find({});
    return res.status(200).send(alunos);
}

module.exports.obterAluno = async function(req, res){
    
    var aluno = await Aluno.findById(req.params.id);
    if(aluno){
        res.status(200).send(aluno);
    }else{
        res.status(404).send("Aluno não encontrado");
    }

}

module.exports.addAluno = async function(req, res){
        
    dadosAluno = req.body;

    var aluno = await Aluno.find({"matricula": dadosAluno.matricula});

    if(aluno.length != 0){
        res.status(404).send("Ja existe aluno matriculado com esse numero de matricula");
    }else{      

        var campi = await Campus.find({"codigo": dadosAluno.campi});
        
        if(campi.length != 0){

            curso = campi[0].cursos.find(curso =>(curso == dadosAluno.curso))

            if(curso){
                await Aluno.create(req.body);            
                res.status(200).send(req.body);
            }else{
                res.status(404).send("Curso invalido! Aluno deve estar matriculado em curso existente no campus informado.");   
            }

        }else{
            res.status(404).send("Campus invalido!"); 
        }
    }    
}

module.exports.updateAluno = async function(req, res){

    dadosAluno = req.body;

    var aluno = await Aluno.find({"matricula": dadosAluno.matricula});

    if(aluno.length != 0){

        var campi = await Campus.find({"codigo": dadosAluno.campi});
        
        if(campi.length != 0){

            curso = campi[0].cursos.find(curso =>(curso == dadosAluno.curso))

            if(curso){
                aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).send(aluno);
            }else{
                res.status(404).send("Curso invalido! Aluno deve estar matriculado em curso existente no campus informado.");   
            }
        }else{
            res.status(404).send("Campus invalido!"); 
        }
    }else{      
        res.status(404).send("Nao existe aluno matriculado com esse numero de matricula");        
    } 
       
}

module.exports.deleteAluno = async function(req, res){

    var aluno = await Aluno.findByIdAndRemove(req.params.id);

    if(aluno){
        res.status(200).send(aluno);        
    }else{
        res.status(404).send("Não existe aluno cadastrado com esse id!");        
    } 

}

module.exports.deletarAlunosCampi = function(campi){
    Aluno.remove({"campi": campi}).exec();
    /*Aluno.pre('remove', function(next) {
        this.model('Aluno').remove({ "campi": campi }, next);
        next();
    });*/
}





