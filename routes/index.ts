import express, { Router, Response, Request } from "express";
import {
  register,
  login,
  hello,
  update_user,
  all_user,
} from "../controllers/auth";
import {
  signUpValidation,
  loginValidation,
  updateValidation,
} from "../validation/index";

const routes = Router();

routes.get("/", async (req: Request, res: Response): Promise<Object> => {
  return res.status(200).json({ Ok: "Success" });
});

routes.route("/hello").get(hello);

routes.route("/all-user").get(all_user);

routes.route("/signup").post(signUpValidation, register);

routes.route("/login").post(loginValidation, login);

routes.route("/update_user").patch(updateValidation, update_user);

export default routes;
