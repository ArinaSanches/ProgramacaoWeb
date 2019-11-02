var alunos = [{_id:1, nome:"Joao",matricula:"123",campi:1, curso:"engenharia", nascimento:"1994/04/19"}, {_id:
    2,nome:"Pedro",matricula:"234",campi:"1", curso:"ciencia", nascimento:"1996/04/19"}, {_id:
        2,nome:"Luisa",matricula:"567",campi:"1", curso:"ciencia", nascimento:"2001/04/6"},{_id:
            2,nome:"Ana",matricula:"891",campi:"1", curso:"engenharia", nascimento:"2000/01/31"}];

var controllerCampi =  require("./campus.js");

module.exports.alunos = alunos

module.exports.listaAlunos = function(req, res){
    var alunosSelecionados = alunos.slice();

    if(req.query.curso){
        var curso = req.query.curso;
        alunosSelecionados = alunosSelecionados.filter((aluno) => (aluno.curso == curso));                        
    }
    if(req.query.campi){
        var campi = req.query.campi;
        alunosSelecionados = alunosSelecionados.filter((aluno) => (aluno.campi == campi));                        
    }
    if(req.query.min_data && req.query.max_data){

        alunos.forEach((aluno) =>{
            if(req.query.min_data <= aluno.nascimento && req.query.max_data >= aluno.nascimento){
                console.log(aluno)
            }
        });
    }
    res.json(alunosSelecionados);
}

module.exports.obterAluno = function(req, res){
    var matricula = req.params.matricula;
    var aluno = alunos.find(aluno => (aluno.matricula == matricula));
    if(aluno){
        res.json(aluno);
    }else{
        res.status(404).send("Aluno não encontrado");
    }
}

module.exports.addAluno = function(req, res){
    dadosAluno = req.body;
    var aluno = alunos.find(aluno => (aluno.matricula == dadosAluno.matricula));

    if(aluno){
        res.status(404).send("Já existe aluno cadastrado com essa matricula!");
    }else{      
        var campis = controllerCampi.campis ;
        campi = campis.find(campi =>(campi.codigo == dadosAluno.campi))
        if(campi){
            curso = campi.cursos.find(curso =>(curso == dadosAluno.curso))
            if(curso){
                alunos.push(req.body);
                res.status(200).send(req.body);
            }else{
                res.status(404).send("Curso invalido! Aluno deve estar matriculado em curso existente no campus informado.");   
            }
        }else{
            res.status(404).send("Campus invalido!"); 
        }
    }    
}

module.exports.updateAluno = function(req, res){
    dadosAluno = req.body;
    var aluno = alunos.find(aluno => (aluno.matricula == dadosAluno.matricula));

    if(aluno){
        var campis = controllerCampi.campis;
        campi = campis.find(campi =>(campi.codigo == dadosAluno.campi))
        if(campi){
            curso = campi.cursos.find(curso =>(curso == dadosAluno.curso))
            if(curso){
                aluno.nome = dadosAluno.nome;
                aluno.campi = dadosAluno.campi;
                aluno.curso = dadosAluno.curso;
                res.status(200).send(aluno);
            }else{
                res.status(404).send("Curso invalido! Aluno deve estar matriculado em curso existente no campus informado.");   
            }
        }else{
            res.status(404).send("Campus invalido!"); 
        }
    }else{      
        res.status(404).send("Não existe aluno cadastrado com essa matricula!");
    }    
}

module.exports.deleteAluno = function(req, res){
    var matricula = req.params.matricula;

    var aluno = alunos.find(aluno => (aluno.matricula == matricula));

    if(aluno){
        var index = alunos.indexOf(aluno)
        alunos.splice(index, 1);
        res.status(200).send(aluno);        
    }else{
        //ajeitar para o erro correto
        res.status(404).send("Não existe aluno cadastrado com essa matricula!");        
    } 

}





