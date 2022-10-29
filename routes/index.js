const authRouter = require("./auth");

function route(app) {
  // app.use("/", (req, res) => {
  //   res.send('hello')
  // });
  app.use("/auth", authRouter);
}

module.exports = route;
