const markerRouter = require('../routes/marker.routes');
const trafficSignRouter = require('../routes/trafficSign.routes');
const categoryRouter = require('../routes/category.routes');
const generateRouter = require('../routes/generate.routes');
module.exports = (app) => {
    app.use('/marker',markerRouter);
    app.use('/traffic-sign',trafficSignRouter);
    app.use('/category',categoryRouter);
    app.use('/generate',generateRouter);
}