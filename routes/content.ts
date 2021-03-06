import express from "express";
const router = express.Router();
import checkToken from "./checkToken";

const { contentController } = require("../controller");

router.post("/create", checkToken, contentController.contentCreate);
router.put("/:id/update", checkToken, contentController.contentUpdate);
router.delete("/:id/delete", checkToken, contentController.contentDelete);
router.get("/:id", contentController.contentPage);
router.post("/list", contentController.contentList);
router.post("/itemAc", contentController.itemAverageCost);
router.put("/:id/invite", checkToken, contentController.contentInvite);

export default router;
