var campis = [{codigo:1, nome:"Pici", cursos:["ciencia", "engenharia"]}] 

var controllerAlunos =  require("./alunos.js");

module.exports.campis = campis

module.exports.listaCampis = function(req, res){
    res.json(campis);
}

module.exports.obterCampi = function(req, res){
    var codigo = req.params.codigo;
    var campi = campis.find(campi => (campi.codigo == codigo));
    if(campi){
        res.json(campi);
    }else{
        res.status(404).send("Campi não encontrado");
    }
}

module.exports.addCampi = function(req, res){
    dadosCampi = req.body;

    var campi = campis.find(campi => (campi.codigo == dadosCampi.codigo));

    if(campi){
        //ajeitar para o erro correto
        res.status(404).send("Já existe campi cadastrado com esse codigo!");
    }else{
        if(typeof dadosCampi.cursos !== 'undefined' && dadosCampi.cursos.length > 0){
            campis.push(req.body);
            res.status(200).send(req.body);
        }else{
            //ajeitar para o erro correto
            res.status(404).send("Nao eh possivel cadastrar campi sem curso!");
        }
    }    
}

module.exports.updateCampi = function(req, res){
    dadosCampi = req.body;
    var codigo = req.params.codigo;

    var campi = campis.find(campi => (campi.codigo == codigo));

    if(campi){

        if(typeof dadosCampi.cursos !== 'undefined' && dadosCampi.cursos.length > 0){
            campi.nome = dadosCampi.nome;
            campi.cursos = dadosCampi.cursos;
            res.status(200).send(campi);
        }else{
            //ajeitar para o erro correto
            res.status(404).send("Nao eh possivel atualizar campi sem curso!");
        }
    }else{
        //ajeitar para o erro correto
        res.status(404).send("Não existe campi cadastrado com esse codigo!");        
    } 
}

module.exports.deleteCampi = function(req, res){
    var codigo = req.params.codigo;

    var campi = campis.find(campi => (campi.codigo == codigo));

    if(campi){
        var index = campis.indexOf(campi)
        campis.splice(index, 1);

        var alunos = controllerAlunos.alunos;
        
        aluno_del_indexes = []

        alunos.forEach((aluno) => {
            if(aluno.campi == campi.codigo){
                aluno_del_indexes.push(aluno);
            }
        })

        aluno_del_indexes.forEach((index)=> {
            var i = alunos.indexOf(index);
            alunos.splice(i, 1);
        })

        res.status(200).send(campi);        
    }else{
        //ajeitar para o erro correto
        res.status(404).send("Não existe campi cadastrado com esse codigo!");        
    } 

}