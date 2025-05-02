import {Router} from 'express';
import {HttpStatus} from "../../core/types/httpCodes";
import {Video} from "../types/video";

export const homeTask01Router = Router({});

const db = {
  videos: <Video[]>[{
    id: 1,
    title: 'Video 01',
    author: 'Author 01',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: '2025-05-01T12:00:00Z',
    publicationDate: '2025-05-02T12:00:00Z',
    availableResolutions: ['P240', "P720"]
  }, {
    id: 2,
    title: 'Video 02',
    author: 'Author 02',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: '2025-05-01T12:00:00Z',
    publicationDate: '2025-05-02T12:00:00Z',
    availableResolutions: ['P240', "P1080"]
  }, {
    id: 3,
    title: 'Video 03',
    author: 'Author 03',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: '2025-05-01T12:00:00Z',
    publicationDate: '2025-05-02T12:00:00Z',
    availableResolutions: ['P240', "P360"]
  }]
}

export const createErrorMessages = (
  errors: any[],
): { errorMessages: any[] } => {
  return {errorMessages: errors};
};


homeTask01Router.get('/videos', (req, res) => {
  res.status(HttpStatus.Ok).send(db.videos);
});

homeTask01Router.post('/videos', (req, res) => {
  res.status(201).send('hello world!!!');
});

homeTask01Router.get('/videos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const driver = db.videos.find((d) => d.id === id);

  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{field: 'id', message: "If video for passed id doesn't exist"}]),
      );
    return;
  }
  res.status(200).send(driver);
});

homeTask01Router.put('/videos/:id', (req, res) => {
  res.status(200).send('hello world!!!');
});

homeTask01Router.delete('/videos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  //ищет первый элемент, у которого функция внутри возвращает true и возвращает индекс этого элемента в массиве, если id ни у кого не совпал, то findIndex вернёт -1.
  const index = db.videos.findIndex((v) => v.id === id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{field: 'id', message: 'Not found'}]),
      );
    return;
  }

  db.videos.splice(index, 1);
  res.sendStatus(HttpStatus.NoContent);

  res.status(HttpStatus.NoContent).send('video by id')
});

homeTask01Router.delete('/testing/all-data', (req, res) => {
  res.status(HttpStatus.NoContent).send([]);
});
