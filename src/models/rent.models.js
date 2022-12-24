import joi from 'joi';

export const rentSchema = joi.object({
    customerId: joi.number().integer().required(),
    gameId: joi.number().integer().required(),
    rentDate: joi.date().required(),
    daysRented: joi.number().integer().required(),
    returnDate: joi.date(),
    originalPrice: joi.number().integer().required(),
    delayFee: joi.number().integer()
})