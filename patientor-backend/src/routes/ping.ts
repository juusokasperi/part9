import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("someone pinged here");
  res.status(200).send("pong");
});

export default router;
