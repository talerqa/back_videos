import {Router} from 'express';
import {HttpStatus} from "../../core/types/httpCodes";
import {Video} from "../types/video";

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

export const createErrorMessages = (
  errors: any[],
): { errorsMessages: any[] } => {
  return {errorsMessages: errors};
};

homeTask01Router.get('/videos', (req, res) => {
  res.status(HttpStatus.Ok).send(db.videos);
});

homeTask01Router.post('/videos', (req, res) => {
    const errors: any[] = [];

    if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.trim() > 40) {
      errors.push({
        field: 'title',
        message: 'Incorrect title'
      })
    }

    if (!req.body.author || typeof req.body.author !== 'string' || req.body.author.trim() > 20) {
      errors.push({
        field: 'author',
        message: 'Incorrect author'
      })
    }



    if (req.body.availableResolutions?.length) {
      const allowedValues = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
      const isValid = req.body.availableResolutions.every(item => allowedValues.includes(item));


      if (!isValid) {
        errors.push({
          field: 'availableResolutions',
          message: 'At least one resolution should be added'
        })
      }
    } else {
      errors.push({
        field: 'availableResolutions',
        message: 'At least one resolution should be added'
      })
    }

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
  }
)

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
  const errors: any[] = [];
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

  if (req.body.title !== undefined) {
    if (req.body.title === null || typeof req.body.title !== 'string' || req.body.title.trim() > 40) {
      errors.push({
        field: 'title',
        message: 'Incorrect title'
      })
    }
  }

  if (req.body.author !== undefined) {
    if (
      req.body.author === null ||
      typeof req.body.author !== 'string' ||
      req.body.author.trim().length === 0 ||
      req.body.author.trim().length > 20
    ) {
      errors.push({
        field: 'author',
        message: 'Incorrect author',
      });
    }
  }

  if (req.body.canBeDownloaded !== undefined) {
    if (typeof req.body.canBeDownloaded !== 'boolean') {
      errors.push({
        field: 'canBeDownloaded',
        message: 'Incorrect canBeDownloaded'
      })
    }
  }

  if (req.body.minAgeRestriction !== undefined) {
    if (req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1) {
      errors.push({
        field: 'minAgeRestriction',
        message: 'min age 1, max age 18'
      })
    }
  }

  if (req.body.availableResolutions !== undefined) {
    if (req.body.availableResolutions?.length) {
      const allowedValues = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
      const isValid = req.body.availableResolutions.every(item => allowedValues.includes(item));


      if (!isValid) {
        errors.push({
          field: 'availableResolutions',
          message: 'At least one resolution should be added'
        })
      }
    } else {
      errors.push({
        field: 'availableResolutions',
        message: 'At least one resolution should be added'
      })
    }
  }

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
  res.sendStatus(HttpStatus.NoContent);

  res.status(HttpStatus.NoContent).send('video by id')
});

homeTask01Router.delete('/testing/all-data', (req, res) => {
  res.status(HttpStatus.NoContent).send([]);
});
