var controller = require("../controllers/alunos.js");

module.exports = function(app){
    app.get("/api/alunos", controller.listaAlunos);
    app.get("/api/alunos/:id", controller.obterAluno);
    app.post("/api/alunos", controller.addAluno);
    app.put("/api/alunos/:id", controller.updateAluno);
    app.delete("/api/alunos/:id", controller.deleteAluno);
}