const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app); //server creation by http inbuit node module;
const { connection } = require("./Configs/Config");

require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8000; 

//Different Routers for different frontend pages in UI;
const { userRouter } = require("./Routes/users.route");
const { fileRouter } = require("./Routes/fs.route");

//Inbuilt middlewares;
app.use(express.text());
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Welcome in Tummoc App😊!!!");
});

app.use('/users', userRouter);
app.use('/files', fileRouter);


httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (e) {
        console.log({ message: e.message });
    }
    console.log(`Server is running at port ${PORT}`);
});