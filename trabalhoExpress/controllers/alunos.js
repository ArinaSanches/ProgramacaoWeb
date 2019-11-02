var alunos = [{_id:1, nome:"Joao",matricula:"123"}, {_id:
    2,nome:"Pedro",matricula:"234"}];

module.exports.listaAlunos = function(req, res){
    res.json(alunos);
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





