import {Video} from "../../hometask_01/types/video";

export const isValidationPutData = (body: Video) => {
  const errors = []

  if (body.title !== undefined) {
    if (body.title === null ||
      typeof body.title !== 'string' ||
      body.title.trim().length === 0 ||
      body.title.trim().length > 40) {
      errors.push({
        field: 'title',
        message: 'Incorrect title'
      })
    }
  }

  if (body.author !== undefined) {
    if (
      body.author === null ||
      typeof body.author !== 'string' ||
      body.author.trim().length === 0 ||
      body.author.trim().length > 20
    ) {
      errors.push({
        field: 'author',
        message: 'Incorrect author',
      });
    }
  }

  if (body.canBeDownloaded !== undefined) {
    if (typeof body.canBeDownloaded !== 'boolean') {
      errors.push({
        field: 'canBeDownloaded',
        message: 'Incorrect canBeDownloaded'
      })
    }
  }

  if (body.minAgeRestriction !== undefined) {
    if (body.minAgeRestriction > 18 || body.minAgeRestriction < 1) {
      errors.push({
        field: 'minAgeRestriction',
        message: 'min age 1, max age 18'
      })
    }
  }

  if (body.publicationDate !== undefined) {
    if (typeof body.publicationDate !== 'string') {
      errors.push({
        field: 'publicationDate',
        message: 'error'
      })
    }
  }

  if (body.availableResolutions !== undefined) {
    if (body.availableResolutions?.length) {
      const allowedValues = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
      const isValid = body.availableResolutions.every(item => allowedValues.includes(item));


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

  return errors
}