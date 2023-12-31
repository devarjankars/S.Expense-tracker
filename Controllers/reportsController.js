const path = require("path");
const Expense = require("../Models/expenseModel");
const { Op } = require("sequelize");



exports.getReportsPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "Report.html"));
};

exports.dailyReports = async (req, res, next) => {
  try {
    const date = req.body.date;
    console.log(date);
    const expenses = await Expense.findAll({
      where: { date: date, userId: req.user.id },
    });
    return res.send(expenses);
  } catch (error) {
    console.log(error);
  }
};

exports.monthlyReports = async (req, res, next) => {
  try {
    const month = req.body.month;
   console.log(month);
    const expenses = await Expense.findAll({
      where: {
        date: {
          [Op.like]: `%-${month}-%`,
        },
        userId: req.user.id,
      },
      raw: true,
    });

    return res.send(expenses);
  } catch (error) {
    console.log(error);
  }
};
