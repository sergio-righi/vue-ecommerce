import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { ModelType } from '@server/interfaces';

export class BaseController {
  protected readonly model: ModelType;
  protected readonly useModReturnNew = { useFindAndModify: false, new: true }

  constructor(model: any) {
    this.model = model;
  }

  json(doc: any, res: Response) {
    res.status(200).json(doc);
  }

  error(_: any, res: Response, message = 'Sever Error', status = 500) {
    res.status(status).json({ error: message });
  }

  all(res: Response, msg = 'Failed to find documents') {
    this.model.all().then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }

  find(res: Response, req: Request, msg = `Failed to find document`) {
    const { id } = req.params;
    this.model.find(id).then(doc => this.json(doc, res), err => this.error(err, res, msg)).catch(err => { this.error(err, res, 'Failed to retrieve doc') });
  }

  findOne(res: Response, req: Request, msg = `Failed to find document`) {
    this.model.findOne(req.body).then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }

  findMany(res: Response, req: Request, msg = `Failed to find document`) {
    this.model.findMany(req.body).then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }

  create(res: Response, req: Request, msg = 'Failed to create') {
    this.model.create<mongoose.Document>(req.body).then((doc: mongoose.Document) => this.json(doc, res)).catch(err => { this.error(err, res, msg) })
  }

  update(res: Response, req: Request, msg = `Failed to update document`) {
    const { _id: id, ...document } = req.body;
    this.model.update(id, document).then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }

  delete(res: Response, req: Request, msg = `Failed to delete document`) {
    const { id } = req.params;
    this.model.delete(id).then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }

  soft(res: Response, req: Request, msg = `Failed to delete document`) {
    const { id } = req.params;
    this.model.soft(id).then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }

  restore(res: Response, req: Request, msg = `Failed to delete document`) {
    const { id } = req.params;
    this.model.restore(id).then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }

  exists(res: Response, req: Request, msg = `Failed to check document`) {
    const { id, ...options } = req.body;
    this.model.exists(id, options).then(doc => this.json(doc, res), err => this.error(err, res, msg));
  }
}