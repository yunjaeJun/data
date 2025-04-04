const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

// 이 파일은 사용자 관련 API 엔드포인트를 처리하는 라우터입니다.

// GET /users - 모든 사용자 목록을 조회합니다
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST /users - 새로운 사용자를 생성합니다
router.post("/", async (req, res, next) => {
  try {
    const { name, age, married } = req.body;
    const user = await User.create({
      name,
      age,
      married,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// /users/:id 경로에 대한 GET, PATCH, DELETE 요청을 처리합니다
router
  .route("/:id")
  // GET - 특정 ID의 사용자를 조회합니다
  .get(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  // PATCH - 특정 ID의 사용자 정보를 수정합니다
  .patch(async (req, res, next) => {
    try {
      const { name, age, married } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, age, married },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  // DELETE - 특정 ID의 사용자를 삭제합니다
  .delete(async (req, res, next) => {
    try {
      const result = await User.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }
      res.json({ message: "사용자가 삭제되었습니다." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// PUT /users/:id - 특정 ID의 사용자 이름을 수정합니다
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
