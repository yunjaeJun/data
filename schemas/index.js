const mongoose = require("mongoose");

// mongoose.js와 연결되어 있습니다.
// app.js에서 이 connect 함수를 불러와서 실행하고,
// mongoose.js는 프론트엔드에서 axios를 통해 서버와 통신합니다.
mongoose.set("strictQuery", false);
const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose
    .connect("mongodb://admin:Passw0rd123!!@3.37.17.227:3002/visitor", {
      dbName: "nodejs",
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDB 연결 성공");
    })
    .catch((err) => {
      console.error("MongoDB 연결 에러", err);
    });
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("MongoDB 연결이 끊겼습니다. 재연결을 시도합니다...");
  connect();
});

module.exports = connect;
