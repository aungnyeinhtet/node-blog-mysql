import { Router } from "express";
import authRoute from "./auth.route";

const router = Router();
router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
router.use(authRoute);
export default router;
