var controller = require("../controllers/campus.js");

module.exports = function(app){
    app.get("/api/campi", controller.listaCampis);
    app.get("/api/campi/:codigo", controller.obterCampi);
    app.post("/api/campi", controller.addCampi);
    app.put("/api/campi/:codigo", controller.updateCampi);
    app.delete("/api/campi/:codigo", controller.deleteCampi)
}