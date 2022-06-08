import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';

import { AuthRoute, AuthorRoute, BookRoute, CouponRoute, MailRoute, OrderRoute, TokenRoute, UserRoute } from "@server/routes";
import { db } from "@server/config";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setDatabase();
    this.setConfiguration();
    this.setMiddleware();
    this.setRoutes();
    this.setExtra();
  }

  setDatabase() {
    const isDev = String(process.env.NODE_ENV).includes('dev')
    const connectionString = isDev
      ? `mongodb://${db.dev.domain}:27017/${db.dev.database}`
      : `mongodb://${db.production.username}:${db.production.password}@${db.production.domain}:27017/${db.production.database}`
    mongoose.connect(connectionString, {
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