const router = require("express").Router();
const projectRoutes = require("./projects");
const reviewRoutes = require("./reviews");
const userRoutes = require("./users");

router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
