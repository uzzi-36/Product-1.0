import mongoose from 'mongoose';


let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
    createdOn: { type: Date, default: Date.now }
});
export const productModel = mongoose.model('products', productSchema);


const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
});
export const userModel = mongoose.model('Users', userSchema);



const mongodbURI = process.env.mongodbURI || "mongodb+srv://db_user:uzair0336@cluster0.btba4v8.mongodb.net/productdatabase?retryWrites=true&w=majority";

// working
//  "mongodb+srv://saad:sdsdsd@cluster0.9bemtsg.mongodb.net/ecommerce?retryWrites=true&w=majority";

 //new also working
 //mongodb+srv://heck:heck123@cluster0.oud3rz1.mongodb.net/?retryWrites=true&w=majority

//  "mongodb+srv://dbuser:dbpassword@cluster0.gq9n2zr.mongodb.net/abcdatabase?retryWrites=true&w=majority";


// // saad 
// // "mongodb+srv://saad:sdsdsd@cluster0.9bemtsg.mongodb.net/ecommerce?retryWrites=true&w=majority";

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
 
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////