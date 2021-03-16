const markerRouter = require('../routes/marker.routes');
const generateRouter = require('../routes/generate.routes');
module.exports = (app) => {
    app.use('/marker',markerRouter);
    app.use('/generate',generateRouter);
}