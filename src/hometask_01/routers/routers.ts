import {Router} from 'express';
import {HttpStatus} from "../../core/types/httpCodes";

export const homeTask01Router = Router({});

homeTask01Router.get('/videos', (req, res) => {
  res.status(200).send('hello world!!!');
});

homeTask01Router.post('/videos', (req, res) => {
  res.status(201).send('hello world!!!');
});

homeTask01Router.get('/videos/:id', (req, res) => {
  res.status(200).send('hello world!!!');
});

homeTask01Router.put('/videos/:id', (req, res) => {
  res.status(200).send('hello world!!!');
});

homeTask01Router.delete('/videos/:id', (req, res) => {
  res.status(200).send('hello world!!!');
});

homeTask01Router.delete('/testing/all-data', (req, res) => {
  res.status(HttpStatus.NoContent).send('hello world!!!');
});
