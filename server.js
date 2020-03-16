const next = require("next");
const mongoose = require("mongoose");
const compression = require("compression");
const bodyParser = require("body-parser");

const routes = require("./routes");
const {
    config: { isDev, PORT, URL },
} = require("./server/config");

const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);

let urlMongo = "";

if (process.env.DB_USER) {
    urlMongo = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`;
} else {
    urlMongo = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}

mongoose.set("useCreateIndex", true);

mongoose.connect(urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const TelegramService = require("./server/services/TelegramService");
const TelegramServiceInstance = new TelegramService();

const MercadoPagoService = require("./server/services/MercadoPagoService");
const MercadoPagoServiceInstance = new MercadoPagoService();

const CoffeeService = require("./server/services/CoffeeService");
const CoffeeServiceInstance = new CoffeeService();

const CoffeeController = require("./server/controllers/CoffeeController");
const CoffeeInstance = new CoffeeController(
    TelegramServiceInstance,
    CoffeeServiceInstance,
    MercadoPagoServiceInstance
);

CoffeeInstance.getCoffeesWithoutImages();

const express = require("express");

app.prepare().then(() => {
    const server = express();

    server.use("/static", express.static("public"));

    server.use(compression());

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.post("/api/send_coffee", CoffeeInstance.sendCoffee);
    server.post("/api/send_answer", CoffeeInstance.sendAnswer);
    server.post("/api/delete_coffee", CoffeeInstance.deleteCoffee);
    server.get("/api/coffees", CoffeeInstance.getCoffees);

    server.get(
        "/api/get_payment_by_coffe/:id",
        CoffeeInstance.getPaymentByCoffeId
    );

    server.post("/api/ipn", CoffeeInstance.savePayment);

    server.use(handler);

    server.listen(PORT);

    console.log(`Server started on port ${PORT} | Url: ${URL}`);
});
