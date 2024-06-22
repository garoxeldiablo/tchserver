// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import db from "./config/db.js";
// import router from "./routes/route.js";

// dotenv.config();
// const app = express();

// try {
//     await db.getConnection();
//     console.log('Database terhubung...');
// } catch (error) {
//     console.log('batal terhubung',error);
// }


// app.use(cors({ credentials:true, origin:'http://localhost:5173' }));
// app.use(cookieParser());
// app.use(express.json());
// app.use(router);

// app.listen(5000, ()=> console.log('Server running at port 5000'));

const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./config/db.js');
const router = require('./routes/route.js');

dotenv.config();
const app = express();

async function startServer() {
    try {
        await db.getConnection();
        console.log('Database connected...');
    } catch (error) {
        console.log('Failed to connect to the database', error);
    }

    app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(router);

    app.listen(5000, () => console.log('Server running at port 5000'));
}

// Call the async function to start the server
startServer();
