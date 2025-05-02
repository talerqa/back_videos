import {Router} from 'express';
import {HttpStatus} from "../../core/types/httpCodes";
import {Video} from "../types/video";
import {createErrorMessages} from "../../core/utils/createErrorMessages";
import {validateVideoData} from "../../core/utils/IsValidateVideoData";

export const homeTask01Router = Router({});

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: "string",
      author: "string",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: today.toISOString(),
      publicationDate: tomorrow.toISOString(),
      availableResolutions: [
        "P144"
      ]
    }]
}

homeTask01Router.get('/videos', (req, res) => {
  res.status(HttpStatus.Ok).send(db.videos);
});

homeTask01Router.post('/videos', (req, res) => {
  const errors = validateVideoData(req.body, 'POST')
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const newDriver: any = {
    id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
    title: req.body.title,
    author: req.body.author,
    createdAt: new Date().toISOString(),
    publicationDate: tomorrow.toISOString(),
    canBeDownloaded: false,
    minAgeRestriction: null,
    availableResolutions: req.body.availableResolutions,
  }

  db.videos.push(newDriver);
  res.status(HttpStatus.Created).send(newDriver);
})

homeTask01Router.get('/videos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const driver = db.videos.find((d) => d.id === id);

  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{field: 'id', message: "Video doesn't exist"}]),
      );
    return;
  }
  res.status(HttpStatus.Ok).send(driver);
});

homeTask01Router.put('/videos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.videos.findIndex((v) => v.id === id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{field: 'id', message: 'Video not found'}]),
      );
    return;
  }

  const errors = validateVideoData(req.body, 'PUT')

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  const driver = db.videos[index];

  driver.title = req.body.title ? req.body.title : driver.title;
  driver.author = req.body.author ? req.body.author : driver.author;
  driver.canBeDownloaded = req.body.canBeDownloaded ? req.body.canBeDownloaded : driver.canBeDownloaded;
  driver.minAgeRestriction = req.body.minAgeRestriction ? req.body.minAgeRestriction : driver.minAgeRestriction;
  driver.publicationDate = req.body.publicationDate ? req.body.publicationDate : driver.publicationDate;
  driver.availableResolutions = req.body.availableResolutions ? req.body.availableResolutions : driver.availableResolutions;


  res.status(HttpStatus.NoContent).send()
});

homeTask01Router.delete('/videos/:id', (req, res) => {

  const id = parseInt(req.params.id);

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
  res.status(HttpStatus.NoContent).send('delete video by id')
});

homeTask01Router.delete('/testing/all-data', (req, res) => {
  res.status(HttpStatus.NoContent).send([]);
});
