import { Router } from "express";

import timeCardReport from "./models/timeCardRecord.js";
import timeCardReportDetail from "./models/timeCardReportDetail.js";
import employees from "./models/employees.js";
import departments from "./models/departments.js";
import shifts from "./models/shifts.js";
import path from "path";

const routes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employees:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home Page
 *     description: Can be used to testing an API.
 */
routes.get("/", async function (req, res) {
  res.send("WellCome!");
});

routes.get("/api/timecards/detail", async (req, res) => {
  const items = await timeCardReportDetail.getTimeCardReportDetail();

  sendJsonResult(res, items);
});

routes.get("/api/reports/individuals", async (req, res) => {
  const items = await timeCardReport.getTimeCardReport();
  await timeCardReport.fillExcell(items);
  //sendJsonResult(res, items);
  var file = path.join("./content/template1.xlsx");
  console.log(file);
  res.download(file);
});

routes.get("/api/search/:table", async (req, res) => {
  const items = await timeCardReportDetail.mysqlQuery(req.params.table);
  sendJsonResult(res, items);
});

routes.get("/api/reports/simplerep", async (req, res) => {
  const items = await timeCardReport.getTimeCardReportForSimpleShchedule();
  await timeCardReport.fillSimpleExcell(items);
  //sendJsonResult(res, items);
  var file = path.join("./content/template2.xlsx");
  console.log(file);
  res.download(file);
});

routes.get("/api/reports/employees", async (req, res) => {
  const items = await employees.getEmployees();
  sendJsonResult(res, items);
});

routes.get("/api/employees", async (req, res) => {
  const items = await employees.getEmployees();
  sendJsonResult(res, items);
});

routes.get("/api/employ/:id", async (req, res) => {
  const item = await employees.getEmploy(req.params.id);
  sendJsonResult(res, item);
});

routes.get("/api/departments", async (req, res) => {
  const items = await departments.getDepartments();
  sendJsonResult(res, items);
});

routes.get("/api/department/:id", async (req, res) => {
  const item = await departments.getDepartment(req.params.id);
  sendJsonResult(res, item);
});

routes.get("/api/shifts", async (req, res) => {
  const items = await shifts.getShifts();
  sendJsonResult(res, items);
});

routes.get("api/shift/:id", async (req, res) => {
  const item = await shifts.getShift(req.params.id);
  sendJsonResult(res, item);
});

function sendJsonResult(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

export default routes;
