import JoiBase from 'joi';
import JoiDate from '@joi/date'

const joi = JoiBase.extend(JoiDate)

export const createCustomerSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.string().min(10).max(11).regex(/^\d+$/).required(),
    cpf: joi.string().min(11).regex(/^\d+$/).required(),
    birthday: joi.date().format('YYYY-MM-DD').required()
})

export const updateCustomerSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.string().min(10).max(11).regex(/^\d+$/).required(),
    birthday: joi.date().format('YYYY-MM-DD').required()
})