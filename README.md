# Store API

A NodeJS API application with advance search filtering
Taken from: https://www.udemy.com/course/nodejs-tutorial-and-projects-course/?referralCode=E94792BEAE9ADD204BC7

## Stack

- Backend - NodeJS
- Framework - Express
- ORM - Mongoose
- Database - MongoDb (Cloud)

## Endpoints

- {{URL}}/products?featured=true&company=caressa&name=wooden&sort=name,-price&fields=company&limit=1&page=6&numericFilters=price>40
- {{URL}}/products/static - for testing

## Running

Update the `MONGO_URI` in the `.env` file.
Use MongoDB atlas: https://www.mongodb.com/atlas/database
