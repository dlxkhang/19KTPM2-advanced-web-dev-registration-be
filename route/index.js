const authRouter = require("../api/auth");
const userRouter = require("../api/user");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
}

module.exports = route;
