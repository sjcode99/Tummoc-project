const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app); //server creation by http inbuit node module;
const { connection } = require("./Configs/Config");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8000; //defined port 8080 (default 3000) excluding 27017 (reserved port by Mongod);

//Different Routers for different frontend pages in UI;
const { userRouter } = require("./Routes/users.route");
const { homeRouter } = require("./Routes/home.route");
const { validate } = require("./Middleware/validate.middleware");
const { fileRouter } = require("./Routes/fs.route");
const { overviewRouter } = require("./Routes/overview.route");

//Inbuilt middlewares;
app.use(express.text());
app.use(express.json());
app.use(cors());

//Landing/default route;
app.get("/", async (req, res) => {
    res.send("Welcome in Tummoc App😊!!!");
});

//Fixed starting end points for making nested dynamic route;
app.use('/users', userRouter);
// app.use('/home', validate, homeRouter); // use custom middleware
app.use('/files', fileRouter);
// app.use('/overview', overviewRouter);

//server code for start or live my server at defined port;
httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (e) {
        console.log({ message: e.message });
    }
    console.log(`Server is running at port ${PORT}`);
});