const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const connect = require("./schemas");
const indexRouter = require("./routes");
const usersRouter = require("./routes/users");

const app = express();
app.set("port", process.env.PORT || 3002);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});
connect();

app.use(morgan("dev"));
// public 폴더의 정적 파일들을 제공합니다 (mongoose.js 포함)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} no routers.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log("EC2 서버에서 " + app.get("port") + " 포트로 실행 중입니다.");
  console.log("public 폴더의 mongoose.js도 함께 실행됩니다.");
});
