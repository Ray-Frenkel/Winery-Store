import express from 'express';
import Shopping from '../models/shoppingModel.js';
import data from '../data.js';
import Product from '../models/productModel.js';

const AdminRouter = express.Router();

AdminRouter.post('/', async (req, res) => {//Post Request - On Buy Now - Get the information and send it to addShopping function in db.js 

    Product.findOne({ _id: req.body._id }, function (err, product) {
        if (!err) {
            console.log(product.price);
            product.winery = req.body.winery;
            product.wine = req.body.wine;
            product.rating = {
                average: req.body.rating
            };
            product.location = req.body.location;
            product.image = req.body.image;
            product.id = req.body.id;
            product.slug = req.body.slug;
            product.type = req.body.type;
            product.price = req.body.price;
            console.log(product.rating);

            product.save(function (err) {
                if (!err) {
                    console.log("Updated!");
                }
                else {
                    console.log("Error: could not save");
                }
            });
        }
    });

    //console.log(productUpdate.price);
    //const product = await Product.updateOne(productUpdate);
    //const addedShopping = await Shopping.insertMany(data.products);
    //res.send({ addedShopping });
});
AdminRouter.post('/delete', async (req, res) => {//Post Request - On Buy Now - Get the information and send it to addShopping function in db.js 
    Product.deleteOne({ _id: req.body._id }, function (err, product) {
        console.log("delete!!!")
    });

});
AdminRouter.post('/add', async (req, res) => {//Post Request - On Buy Now - Get the information and send it to addShopping function in db.js 
    const data = {
        winery: req.body.winery,
        wine: req.body.wine,
        rating: {
            average: req.body.average,
            reviews: req.body.reviews
        },
        location: req.body.location,
        image: req.body.image,
        id: req.body.id,
        slug: req.body.id,
        type: req.body.type,
        price: req.body.price,

    };
    console.log(data);
    Product.insertMany(data)

});
export default AdminRouter;