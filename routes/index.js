const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

// 이 라우터는 메인 페이지('/')에 대한 GET 요청을 처리합니다.
// MongoDB에서 모든 사용자 정보를 가져와서 index.html 템플릿에 전달합니다.
router.get("/", async (req, res, next) => {
  try {
    // User.find({})로 모든 사용자 데이터를 조회합니다
    const users = await User.find({});
    console.log("조회된 사용자:", users);
    // mongoose.html 템플릿에 users 데이터를 전달하여 렌더링합니다
    res.render("mongoose", { users });
  } catch (err) {
    console.error("사용자 조회 중 오류 발생:", err);
    next(err);
  }
});

module.exports = router;
