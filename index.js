// imports
const express = require('express');
const body = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const app = express();

// default settings
app.use(body.urlencoded({
  extended: true
}));
app.use(fileUpload());

app.use(express.static("public"));
app.use('/productImages', express.static('productImages'));

// db connection
mongoose.connect('mongodb://localhost:27017/shopDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're Connected to Database.");
});

// for storing products
const productSchema = {
  name: String,
  image: String,
  quantity: Number,
  description: String,
  price: Number
}

const Product = mongoose.model('Product', productSchema);

// for storing cart
const cartSchema = {
  product_id:String,
  product: Object,
  quantity: Number,
}

const Cart = mongoose.model('Cart', cartSchema);

// route for adding / viewing a product/ products.

app.route("/api/product")
  .get(function(req, res) {

    Product.find(function(err, products) {
      if (!err) {
        displayProducts = []
        products.forEach(function(product, index) {
          object = {
            id: product._id,
            name: product.name,
            image: 'http://localhost:3000/productImages/' + product.name + product.image,
            quantity: product.quantity,
            description: product.description,
            price: product.price
          }
          displayProducts.push(object)
        });

        res.status(200).send(displayProducts);
      } else {
        res.status(400).send(err);
      }
    });

  })

  .post(function(req, res) {

    // for storing images of products.
    const image = req.files.image;
    const uploadPath = __dirname + '/public/productImages/' + req.body.name + image.name;

    // Using the mv() method to place the file somewhere on your server
    image.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      } else {
        //validating
        if (image.name && image.data && req.body.name && req.body.quantity && req.body.description && req.body.price) {
          const newProduct = new Product({
            name: req.body.name,
            image: req.files.image.name,
            quantity: req.body.quantity,
            description: req.body.description,
            price: req.body.price
          });
          newProduct.save(function(err) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).send("Successfully Added New Product!");
            }
          });
        } else {
          res.status(400).send("Enter All Data.");
        }

      }
    });

  });


// for adding product to cart
app.post("/api/cart/:product_id", function(req, res) {

  Product.findOne({
    _id: req.params.product_id
  }, function(err, product) {
    if (err) {
      res.status(400).send("No Such Product Id.");
    } else {

      Cart.findOne({product_id:req.params.product_id},function(err,item){
        if(!item){
          const newItem = new Cart({
            product_id:product._id,
            product: {
              name: product.name,
              image: 'http://localhost:3000/productImages/' + product.name + product.image,
              quantity: product.quantity,
              description: product.description,
              price: product.price
            },
            quantity: 1
          });
          newItem.save(err, function(err) {
            if (!err) {
              res.status(200).send("Item Added To Cart Successfully!");
            } else {
              res.status(400).send(err);
            }
          });

        }
        else{
          res.status(400).send("Item Already in Cart!");
        }
      });

    }
  });

});

// for viewing cart
app.get("/api/cart", function(req, res) {
  Cart.find(function(err, items) {
    if (!err) {
      res.status(200).send({
        'Your Cart': items
      });
    } else {
      res.status(400).send(err);
    }
  })
});

// for updating quantity
app.patch("/api/cart/:cart_id/:quantity", function(req, res) {
  const cart_id = req.params.cart_id;
  const quantity = req.params.quantity;

  Cart.findOne({
    _id: cart_id
  }, function(err, item) {
    if (err) {
      res.status(400).send("No Such Item In the Cart!");
    } else {
      Cart.updateOne({
        _id: cart_id
      }, {
        quantity: quantity
      }, function(err) {
        if (err) {
          res.status(400);
        } else {
          res.status(200).send("Quantity Of Product Updated!");
        }
      });
    }
  })

});

// for listening onto this port
app.listen('3000', function() {
  console.log("Connected on port 3000");
})
