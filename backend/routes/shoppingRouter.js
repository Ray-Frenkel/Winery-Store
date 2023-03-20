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
    var image = req.body.image;
    const data = {
        products: [
            {
                // _id: '1',
                email: email,
                winery: winery,
                wine: wine,
                quantity: quantity,
                price: price,
                image: image,
            },
        ]
    }
    const addedShopping = await Shopping.insertMany(data.products);
    res.send({ addedShopping });
});
shoppingRouter.get('/purchase/:email', async (req, res) => {
    console.log("clicked purchase!")
    const purchase = await Shopping.find({ "email": req.params.email });
    if (purchase) {
        res.send(purchase);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
shoppingRouter.get('/stats', async (req, res) => {
    const pipeline = [
        {
            $group: {
                _id: "$winery",
                totalPrice: { $sum: "$price" },
                totalQuantity: { $sum: "$quantity" }
            }
        }
    ];

    const result = await Shopping.aggregate(pipeline);

    console.log(result);
    res.json(result);
});

export default shoppingRouter;