const express = require("express");
const router = express.Router();
const reportsController = require('../Controllers/reportsController')
const authy = require('../middleware/Auth');

router.get("/getReportsPage", reportsController.getReportsPage);
router.post(
  "/dailyReports",
  authy,
  reportsController.dailyReports
);
router.post(
  "/monthlyReports",
  authy,
  reportsController.monthlyReports
);

module.exports = router;
