import joi from 'joi';

export const clientSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.number().required(),
    cpf: joi.string().required(),
    birthday: joi.date().required()
})