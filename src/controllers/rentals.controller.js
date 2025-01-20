import { rentalsService } from "../services/rentals.service.js";
import dayjs from "dayjs";

export async function postRental(req, res) {
    const rentDate = dayjs(Date.now()).format('YYYY-MM-DD')
    const returnDate = null;
    const delayFee = null;
    const {customerId, gameId, daysRented} = req.body

    try {
        await rentalsService.postRental({ customerId, gameId, rentDate, daysRented, returnDate, delayFee })
        return res.status(201).send({
            message:
                `Aluguel de ${rentDate} cadastrado`
        });
    } catch (error) {
        console.log(error);
        error.status ? res.status(error.status).send(error) :
        res.status(500).send(error.message);
    }

}

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;
    try {
        const rentals = await rentalsService.getRentals({ customerId, gameId });
        res.status(200).send(rentals);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function postRentReturn(req, res) {
    const {id} = req.params;
    try {
        const gameRented = await rentalsService.rentalReturn(id);
        return res.status(200).send({message: `Aluguel de ${gameRented.name} devolvido`})
    }
    catch (error) {
        console.log(error);
        error.status ? res.status(error.status).send(error) :
        res.status(500).send(error.message);
    }
}
export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        await rentalsService.deleteRental(id);
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        error.status ? res.status(error.status).send(error) :
        res.status(500).send(error.message);
    }
}