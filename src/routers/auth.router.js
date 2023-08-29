import express from "express";
const router = express.Router();

import { AuthController } from "../controllers/auth.controller.js";

//CREATE USER
router.post("/createUser", AuthController.createUser);

router.post("/login", AuthController.login);

//GET ALL USER
router.get("/getAllUser", AuthController.getAllUser);

//GET AN USER
router.get("/getUser/:id", AuthController.getUser);

//UPDATE AN USER
router.put("/updateUser/:id", AuthController.updateUser);

//DELETE AN USER
router.delete("/deleteUser/:id", AuthController.deleteUser);

export default router;
