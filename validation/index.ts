import express, { Response, Request, NextFunction } from "express";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);
import data from "../model/User.json";

export const signUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email().required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .messages({
        "password.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "password.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "password.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
      })
      .required(),
    address: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body, { abortEarly: false });

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: validationResult.error.details.map((i) => i.message) });
  }

  if (req.body.email in data)
    return res.status(400).json({ Error: "Email unavailable!" });

  next();
};

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body, { abortEarly: false });

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: validationResult.error.details.map((i) => i.message) });
  }

  next();
};

export const updateValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    newAddress: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body, { abortEarly: false });

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: validationResult.error.details.map((i) => i.message) });
  }

  next();
};
