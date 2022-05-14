const express = require("express");
const {
  errorHandlerMiddleware,
} = require("./middlewares/error-handler.middleware");
const morganMiddleware = require("./middlewares/morgan.middleware");
const apiRouter = require("./routes/v1");

const app = express();
app.use(express.json());
app.use(morganMiddleware);
app.use("/api", apiRouter);
app.all("*", async (req, res) => {
  res.status(404).send({ message: "Not Found!", code: 404 });
});

app.use(errorHandlerMiddleware);

module.exports = app;
