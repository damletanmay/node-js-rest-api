# Node-Js-Rest-Api


Node-Js-Rest-Api Is an RESTful API which has certain features like adding-viewing data, etc.

It can be used for a system across any platform. It doesn't contain any pages or UI because it's just an API.

It's an API For A Shop.

There are 2 Models in this app.

1. Products - To store all products.
2. Cart - To store products which user selects.

## Coding & Requirements

1. Back-End In - ``` Node Js```
2. Server - ``` Express Js ```
3. Modules - ``` express-fileupload, mongoose, nodemon, Postman ```
4. Database- ``` MongoDB ```


Comments are added wherever necessary so that the code can be easily understood.

## Test Cases 

### 1. Adding A Product.

Path: localhost:3000/api/product

Request Type: POST

Data Required: form-data

fields: name,image(actual image in data),quantity,description, price.

Output In Postman:

![1](https://github.com/damletanmay/node-js-rest-api/blob/main/test_cases/1.png)

### 2. Listing all Products.

Path: localhost:3000/api/product

Request Type: GET

Data Required: None

Output In Postman:

![2](https://github.com/damletanmay/node-js-rest-api/blob/main/test_cases/2.png)

### 3. Add an item to cart.

Path:localhost:3000/api/cart/:product_id

Request Type: POST

Data Required: None

Output In Postman:

![3](https://github.com/damletanmay/node-js-rest-api/blob/main/test_cases/3.png)

### 4. View Cart.

Path:localhost:3000/api/cart

Request Type: GET

Data Required: None

Output In Postman:

![4](https://github.com/damletanmay/node-js-rest-api/blob/main/test_cases/4.png)

### 5. Update Quantity Field of Cart.

Path:localhost:3000/api/cart/:cart_id/:quantity_to_increase

Request Type: PATCH

Data Required: None

Output In Postman:

![5](https://github.com/damletanmay/node-js-rest-api/blob/main/test_cases/5.png)
