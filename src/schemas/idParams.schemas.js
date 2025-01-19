import Joi from "joi";

export const idParamsSchema = Joi.object({
  id: Joi.number().integer().min(1).required()
})