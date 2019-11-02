var controller = require("../controllers/alunos.js");

module.exports = function(app){
    app.get("/api/alunos", controller.listaAlunos);
    app.get("/api/alunos/:matricula", controller.obterAluno);
    app.post("/api/alunos", controller.addAluno);
    app.put("/api/alunos/:matricula", controller.updateAluno);
    app.delete("/api/alunos/:matricula?", controller.deleteAluno);
}