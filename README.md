# Stationery Shop B4A2V5

## Overview :

The Stationery Shop is a TypeScript-based RESTful API application built with Express and MongoDB using Mongoose. It allows efficient management of stationery products and orders, with robust schema validation to ensure data integrity. The application includes features for managing products, handling orders, and calculating revenue, making it ideal for a small business stationery shop.

---

## Links

- **Live Demo**: [Stationery Shop API](https://your-live-link.com)

**Clone the Repository**

```bash
git clone https://github.com/your-username/stationery-shop.git
cd stationery-shop
```

## Features :

### Product Management :

- **Add Products**: Create new stationery products with detailed information.
- **View All Products**: Retrieve all products or filter by name, brand, or category.
- **Search Products**: Use query parameters to search for products by specific criteria.
- **View a Product**: Get details of a specific product using its unique ID.
- **Update Products**: Modify product details such as price, quantity, and stock status.
- **Delete Products**: Remove a product from the database.

### Order Management :

- **Place Orders**: Create orders by specifying the product, quantity, and total price.
- **Inventory Updates**: Automatically update stock levels after an order is placed. Products marked out of stock if inventory runs out.
- **Error Handling**: Prevent orders if the requested quantity exceeds available stock.

### Revenue Calculation :

- **Total Revenue**: Calculate total revenue generated from all completed orders using MongoDB aggregation.

### Error Handling :

- **Comprehensive Responses**: Clear and informative error messages with details for debugging in non-production environments.

---

## Technology used :

- **Backend**: Node.js with Express and TypeScript.
- **Database**: MongoDB with Mongoose for schema-based modeling.
- **Environment Variables**: Managed using `.env` file.

---

## Setup Instructions :

### Prerequisites

**Node.js**: Install [Node.js](https://nodejs.org) (v14 or higher recommended).
**MongoDB**: Ensure a MongoDB instance is running locally or via a cloud provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Steps to Set Up Locally

### Start the Application:

    ## For development: npm run start:dev

### For production: \* npm run build

                    * npm run start:prod

### Test Endpoints:

Use tools like Postman or curl to interact with the API.

### API Endpoints:

### Product Management:

# Action------------ Method -----Endpoint ---------------------------Request Body

- Add a Product-------POST ----/api/products -{ name, brand, price, category, description, quantity, inStock }

- View All Products --GET -----/api/products ------ Query: searchTerm=name/brand/category (optional)

- View a Product -----GET -----/api/products/:productId

- Update a Product ---PUT -----/api/products/:productId { fieldToUpdate: value }

- Delete a Product ---DELETE --/api/products/:productId -

### Order Management:

# Action--------------------Method--------- Endpoint------------------------------ Request Body

- Place an Order -----------POST----- /api/orders -------------------{ email, product, quantity, totalPrice }-----------------
- Calculate Total Revenue-- GET ------/api/orders/revenue ----------------------------------------------------
