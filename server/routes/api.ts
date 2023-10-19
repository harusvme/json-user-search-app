import express from "express";
import { validateEmail, validateNumber } from "../validation/validation";
import * as usersController from "../controllers/users";

const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    const { email, number } = req.body;

    if (!validateEmail(email) || (number && !validateNumber(number))) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const filteredUsers = await usersController.searchUsers(email, number);

    res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
