const router = require("express").Router();
// const memberRouter = require("./member.route.js");
const uploadCommunityMember = require("../../config/multer/index.js");
const controller = require("../controllers/member.controller.js");

// CREATE
router.post(
  "/createMember",
  uploadCommunityMember.single("image_url"),
  controller.createPost
);

// READ
router.get("/getAllMembers", controller.getAllMembers);

// READ BY ID
router.get("/getMemberById/:id", controller.getMemberById);

// UPDATE
router.post(
  "/updateMember/:id",
  uploadCommunityMember.single("image_url"),
  controller.updateMember
);

// DELETE
router.delete("/deleteMember/:id", controller.deleteMember);

module.exports = router;
