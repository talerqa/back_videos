export const isValidationPostData = (body: any) => {
  const errors = []


  if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0 || body.title.trim().length > 40) {
    errors.push({
      field: 'title',
      message: 'Incorrect title'
    })
  }

  if (!body.author || typeof body.author !== 'string' || body.author.trim().length === 0 || body.author.trim().length > 20) {
    errors.push({
      field: 'author',
      message: 'Incorrect author'
    })
  }

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

  return errors
}