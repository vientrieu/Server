const pointRouter = require('../routes/point.routes');
module.exports = (app) => {
    app.use('/point',pointRouter);
}