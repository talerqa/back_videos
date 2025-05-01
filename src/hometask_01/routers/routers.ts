import {Router} from 'express';
import {HttpStatus} from "../../core/types/httpCodes";
import {Video} from "../types/video";

export const homeTask01Router = Router({});

const db: Video[] = [{
  id: 1,
  title: 'Video 01',
  author: 'Author 01',
  canBeDownloaded: true,
  minAgeRestriction: 18,
  createdAt: '2025-05-01T12:00:00Z',
  publicationDate: '2023-05-01T12:00:00Z',
  availableResolutions: ['P240', "P720"]
}, {
  id: 2,
  title: 'Video 02',
  author: 'Author 02',
  canBeDownloaded: true,
  minAgeRestriction: 18,
  createdAt: '2025-05-01T12:00:00Z',
  publicationDate: '2023-05-01T12:00:00Z',
  availableResolutions: ['P240', "P1080"]
}, {
  id: 3,
  title: 'Video 03',
  author: 'Author 03',
  canBeDownloaded: true,
  minAgeRestriction: 18,
  createdAt: '2025-05-01T12:00:00Z',
  publicationDate: '2023-05-01T12:00:00Z',
  availableResolutions: ['P240', "P360"]
}]


homeTask01Router.get('/videos', (req, res) => {
  res.status(200).send(db);
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
  res.status(HttpStatus.NoContent).send('All data is deleted');
});
