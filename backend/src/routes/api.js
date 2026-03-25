const express = require("express");
const { authRequired } = require("../middleware/auth");
const authController = require("../controllers/auth");
const companiesController = require("../controllers/companies");
const radarController = require("../controllers/radar");
const gipController = require("../controllers/gip");
const messagesController = require("../controllers/messages");

const router = express.Router();

router.post("/auth/login", authController.login);

router.get("/companies", authRequired, companiesController.listCompanies);
router.post("/companies", authRequired, companiesController.createCompany);
router.patch("/companies/:id", authRequired, companiesController.updateCompany);
router.delete("/companies/:id", authRequired, companiesController.removeCompany);
router.post("/companies/generate", authRequired, companiesController.generateCompanies);

router.get("/radar", authRequired, radarController.listRadar);
router.post("/radar", authRequired, radarController.createRadar);
router.post("/radar/generate", authRequired, radarController.generateRadar);

router.get("/gip-map", authRequired, gipController.listGipMap);
router.post("/gip-map", authRequired, gipController.createGipMap);
router.post("/gip-map/generate", authRequired, gipController.generateGipMap);

router.get("/messages", authRequired, messagesController.listMessages);
router.post("/messages", authRequired, messagesController.createMessage);
router.patch("/messages/:id", authRequired, messagesController.updateMessage);
router.post("/messages/generate", authRequired, messagesController.generateMessage);

module.exports = router;
