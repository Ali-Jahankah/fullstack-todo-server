import { body, ValidationChain } from "express-validator";
export const tasksValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title must not be empty")
    .isString()
    .withMessage("must be a a plain text")
    .trim(),

  body("description")
    .trim()
    .isString()
    .withMessage("must be a a plain text")
    .not()
    .isEmpty()
    .withMessage("Description must not be empty"),
  body("date")
    .isString()
    .withMessage("must be a a plain text")
    .not()
    .isEmpty()
    .withMessage("Date must not be empty"),
  body("status")
    .isString()
    .withMessage("must be a a plain text")
    .not()
    .isEmpty()
    .withMessage("Date must not be empty")
    .isIn(["New", "In Progress", "Done"]),
  body("level")
    .isString()
    .withMessage("must be a a plain text")
    .not()
    .isEmpty()
    .withMessage("Date must not be empty")
    .isIn(["Easy", "Challenging", "Difficult"]),
];

export const updateValidator = [
  body("id").not().isEmpty().trim(),
  body("status")
    .not()
    .isEmpty()
    .trim()
    .isString()
    .isIn(["New", "In Progress", "Done"])
    .withMessage(
      "Value must be one of these :New, In Progress or Done",
    ),
];
