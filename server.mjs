import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

let products = []; // TODO: connect with mongodb instead

app.post('/product', (req, res) => {

    const body = req.body;

    if (
        !body.name ||
        !body.price ||
        !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }

    console.log(body.name)
    console.log(body.price)
    console.log(body.description)

    products.push({
        id: `${new Date().getTime()}`,
        name: body.name,
        price: body.price,
        description: body.description
    });

    res.send({
        message: "product added successfully"
    });
})

app.get('/products', (req, res) => {

    res.send({
        message: "Got all products successfully",
        data: products
    })

})

app.get('/product/:id', (req, res) => {

    const id = req.params.id;

    let isFound = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            res.send({
                message: "get product by id: " + products[i] + "success",
                data: products[i]
            });
            isFound = true
            break;
        }

    }

    if (isFound = false) {
        res.status(404)
        res.send({ message: "Product not found" });
    }
    return;

})

app.delete('/product/:id', (req, res) => {

    const id = req.params.id;

    let isFound = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {

            products.splice(i, 1)
            res.send({
                message: "product deleted successfully"
            });
            isFound = true
            break;
        }

    }

    if (isFound = false) {
        res.status(404)
        res.send({
            message: "Delete fail: Product not found"
        });
    }
})

app.put('/product/:id', (req, res) => {

    const body = req.body;

    if (
        !body.name ||
        !body.price ||
        !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }

    console.log(body.name)
    console.log(body.price)
    console.log(body.description)

    let isFound = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {

            products[i].name = body.name;
            products[i].name = body.price;
            products[i].name = body.description;

            res.send({
                message: "product modified successfully"
            });
            isFound = true
            break;
        }

    }

    if (!isFound) {
        res.status(404)
        res.send({
            message: "Edit fail: Product not found"
        });
    }
    res.send({
        message: "Product added successfully"
    });

})

// const __dirname = path.resolve();
// app.use('/', express.static(path.join(__dirname, './web/build')))
// app.use('*', express.static(path.join(__dirname, './web/build')))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})