const express = require("express");
const router = express.Router();
const employee = require("../models/employee");
// const controllers = require("../controllers/table")
const sequelize = require("../config/database");

//test
sequelize.authenticate().catch((err) => console.log("Error: " + err));

router.use(express.json());

sequelize.sync().catch((error) => {
  console.error("Unable to create table : ", error);
});

router.get("/", async (req, res) => {
  const empData = await sequelize.models.employees.findAll({
    attributes: [
      "employeeId",
      "firstName",
      "lastName",
      "middleName",
      "designation",
      "email",
      "companyEmail",
      "contactNumber",
      "workMode",
    ],
  });

  res.json(
    empData.map((emp) => ({
      employeeId: emp.employeeId,
      firstName: emp.firstName,
      middleName: emp.middleName,
      lastName: emp.lastName,
      designation: emp.designation,
      email: emp.email,
      companyEmail: emp.companyEmail,
      contactNumber: emp.contactNumber,
      workMode: emp.workMode,
    }))
  );
});

router.post("/", async (req, res) => {
  let empData = await sequelize.models.employees.create(req.body);
  res.send(req.body);
  console.log(req.body);
});

router.delete("/:employee_id", async (req, res) => {
  const userId = req.params.employee_id;
  await sequelize.models.employees.destroy({
    where: { employeeId: userId },
  });
  res.send();
});

router.put("/:employee_id", async (req, res) => {
  const userId = req.params.employee_id;
  await sequelize.models.employees.update(req.body, {
    where: { employeeId: userId },
  });
  res.send(req.body);
});


module.exports = router;
