import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { AuthRoute, AuthorRoute, BookRoute, CouponRoute, MailRoute, OrderRoute, TokenRoute, UserRoute } from "@server/routes";

class App {
  public express: express.Application;

  constructor() {
    dotenv.config();

    this.express = express();
    this.setDatabase();
    this.setConfiguration();
    this.setMiddleware();
    this.setRoutes();
    this.setExtra();
  }

  setDatabase() {
    mongoose.connect(String(process.env.MONGODB_URI), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    const databaseConnection = mongoose.connection
    databaseConnection.on('error', console.error.bind(console, 'MongoDB Connection error'))
  }

  setConfiguration() {
    this.express.use(cors())
    this.express.use(express.json({ limit: "10mb" }))
    this.express.use(express.urlencoded({ extended: true }))
  }

  setRoutes() {
    this.express.use('/auth', AuthRoute)
    this.express.use('/authors', AuthorRoute)
    this.express.use('/books', BookRoute)
    this.express.use('/coupons', CouponRoute)
    this.express.use('/mails', MailRoute)
    this.express.use('/orders', OrderRoute)
    this.express.use('/tokens', TokenRoute)
    this.express.use('/users', UserRoute)
  }

  setMiddleware() {
    // this.express.use(jwt)
  }

  setExtra() {
    this.express.use('/cover', express.static('static/image'))
  }
}

export default new App().express