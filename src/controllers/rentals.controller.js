import { connectionDB } from "../database/db.js";
import { rentalsService } from "../services/rentals.service.js";

export async function postRental(req, res) {
    const {
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        delayFee
    } = res.locals.rent;

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

export async function getRents(req, res) {
    const { customerId, gameId } = req.query;
    let rents;
    try {
        const rentals = await rentalsService.getRentals({ customerId, gameId });

        for (let i = 0; i < rents.length; i++) {
            rents[i].customer = (await connectionDB.query(`
            SELECT id, name FROM customers WHERE id=$1;`,
                [rents[i].customerId])).rows[0];
        }

        for (let i = 0; i < rents.length; i++) {
            rents[i].game = (await connectionDB.query(`SELECT 
            games.id, games.name, games."categoryId",
            categories.name AS "categoryName" FROM 
            games JOIN categories ON games."categoryId"=categories.id 
            WHERE games.id=$1;`, [rents[i].gameId])).rows[0];
        }
        res.status(200).send(rents);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function postRentReturn(req, res) {
    const { rent } = res.locals;
    console.log(rent);
    try {
        // await rentalsService.RentalReturn({rent});
        // return res.status(200).send({message: `Aluguel de ${rent.game}`})
    }
    catch (error) {
        console.log(error);
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
        res.status(500).send(error.message);
    }
}