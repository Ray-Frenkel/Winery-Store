import express from 'express';
import Shopping from '../models/shoppingModel.js';

const shoppingRouter = express.Router();

shoppingRouter.post('/', async (req, res) => {//Post Request - On Buy Now - Get the information and send it to addShopping function in db.js 
    console.log("click in shopping!");
    var winery = req.body.winery;
    var wine = req.body.wine;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var email = req.body.email;
    const data = {
        products: [
            {
                // _id: '1',
                email: email,
                winery: winery,
                wine: wine,
                quantity: quantity,
                price: price,
            },
        ]
    }
    const addedShopping = await Shopping.insertMany(data.products);
    res.send({ addedShopping });
});
export default shoppingRouter;