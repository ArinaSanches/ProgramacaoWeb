var controller = require("../controllers/campus.js");

module.exports = function(app){
    app.get("/api/campi", controller.listaCampis);
    app.get("/api/campi/:id", controller.obterCampi);
    app.post("/api/campi", controller.addCampi);
    app.put("/api/campi/:id", controller.updateCampi);
    app.delete("/api/campi/:id", controller.deleteCampi)
}