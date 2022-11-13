import express, { Router, Response, Request } from "express";
import path from "path";
import * as fs from "fs";
import { signUp, User } from "../helper/interfaces";
import { cleanData, UserModel } from "../helper/util";
import bcrypt from "bcrypt";
import data from "../data/User.json";
import { generateAccessToken, verifyAccessToken } from "../helper/jwt";
import UserType from "../types/index";

export const hello = async (req: Request, res: Response): Promise<Object> => {
  try {
    const token = req.cookies["jwt"];
    const _email = verifyAccessToken(token);

    if (!_email) return res.status(401).json({ Error: "Unauthorized!" });

    let user: User = data[_email];

    if (!(user.role == UserType.USER))
      return res.status(403).json({ Forbidden: "Can't access this endpoint" });

    const { password, ...result } = user;

    return res.status(302).json({ Success: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const all_user = async (
  req: Request,
  res: Response
): Promise<Object> => {
  try {
    const token = req.cookies["jwt"];
    const _email = verifyAccessToken(token);

    if (!_email) return res.status(401).json({ Error: "Unauthorized!" });

    let admin: User = data[_email];

    if (!(admin.role == UserType.ADMIN))
      return res.status(403).json({ Forbidden: "Can't access this endpoint" });

    const newData = data;
    const result = await cleanData(newData);

    return res.status(200).json({ Success: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const register = async (
  req: Request,
  res: Response
): Promise<Object> => {
  try {
    const dataKeys = Object.keys(data);

    const _id = dataKeys.length + 1;

    const { email, firstname, lastname, password, address } = req.body;
    const _role = UserType.USER;

    const passwordHash = await bcrypt.hash(password, 10);

    const user: User = new UserModel(
      _id,
      _role,
      firstname,
      lastname,
      email,
      passwordHash,
      address
    );

    const newData = data;
    newData[email] = user;

    fs.writeFile(
      path.join(__dirname, "../data/User.json"),
      JSON.stringify(newData),
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );

    return res.status(201).json({ Success: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response): Promise<Object> => {
  try {
    const dataKeys = Object.keys(data);

    const { email, password } = req.body;

    if (!dataKeys.includes(email))
      return res.status(404).json({
        Error:
          "Email and password combination do not match an existing user. e",
      });

    const user: User = data[email];

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({
        Error:
          "Email and password combination do not match an existing user. p",
      });

    const jwt = generateAccessToken(user);

    res.cookie("jwt", jwt, { httpOnly: true });

    return res.status(200).json({
      access_token: jwt,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const update_user = async (
  req: Request,
  res: Response
): Promise<Object> => {
  try {
    const token = req.cookies["jwt"];
    const _email = verifyAccessToken(token);

    if (!_email) return res.status(401).json({ Error: "Unauthorized!" });

    let user: User = data[_email];

    if (!(user.role == UserType.USER))
      return res.status(403).json({ Forbidden: "Can't access this endpoint" });

    const newAddress = req.body.newAddress;
    user.address = newAddress;

    const newData = data;
    newData[_email] = user;

    fs.writeFile(
      path.join(__dirname, "../data/User.json"),
      JSON.stringify(newData),
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );

    return res.status(201).json({ message: "Updated successfully!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
