import {Router} from 'express';
import {HttpStatus} from "../../core/types/httpCodes";
import {Video} from "../types/video";
import {CreateVideoInputModel} from "../dto/createVideoInputModel";

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
    availableResolutions: ['P144']
  }, {
    id: 2,
    title: 'Video 02',
    author: 'Author 02',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: '2025-05-01T12:00:00Z',
    publicationDate: '2025-05-02T12:00:00Z',
    availableResolutions: ['P144']
  }, {
    id: 3,
    title: 'Video 03',
    author: 'Author 03',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: '2025-05-01T12:00:00Z',
    publicationDate: '2025-05-02T12:00:00Z',
    availableResolutions: ['P144']
  }]
}

export const createErrorMessages = (
  errors: any[],
): { errorMessages: any[] } => {
  return {errorMessages: errors};
};


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


homeTask01Router.get('/videos', (req, res) => {
  res.status(HttpStatus.Ok).send(db.videos);
});

homeTask01Router.post('/videos', (req, res) => {


    if (req.body.title.trim() > 40 || typeof req.body.title !== 'string' || !req.body.title) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages([{
        field: 'title',
        message: 'Incorrect title'
      }]));
    }


    if (req.body.author.trim() > 20 || typeof req.body.author !== 'string' || !req.body.author) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages([{
        field: 'author',
        message: 'Incorrect author'
      }]));
    }

    if (!req.body.availableResolutions.length) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages([{
        field: 'availableResolutions',
        message: 'At least one resolution should be added'
      }]));
    }

    if (req.body.availableResolutions.length) {
      const allowedValues = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
      const isValid = req.body.availableResolutions.every(item => allowedValues.includes(item));


      if (!isValid) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages([{
          field: 'availableResolutions',
          message: 'At least one resolution should be added'
        }]));
      }
    }

    const newDriver: CreateVideoInputModel | any = {
      title: req.body.title,
      author: req.body.author,
      availableResolutions: req.body.availableResolutions,
    }

    db.videos.push(newDriver);
    res.status(HttpStatus.Created).send(newDriver);
  }
)
;

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
