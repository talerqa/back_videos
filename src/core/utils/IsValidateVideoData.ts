import {Video} from "../../hometask_01/types/video";

type ValidationMode = "POST" | "PUT";

export const validateVideoData = (body: Partial<Video>, mode: ValidationMode) => {
  const errors = [];
  const allowedResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

  const isRequired = (field: any) => mode === "POST" || field !== undefined;

  if (isRequired(body.title)) {
    if (
      body.title === null ||
      typeof body.title !== "string" ||
      body.title.trim().length === 0 ||
      body.title.trim().length > 40
    ) {
      errors.push({
        field: "title",
        message: "Incorrect title",
      });
    }
  }

  if (isRequired(body.author)) {
    if (
      body.author === null ||
      typeof body.author !== "string" ||
      body.author.trim().length === 0 ||
      body.author.trim().length > 20
    ) {
      errors.push({
        field: "author",
        message: "Incorrect author",
      });
    }
  }

  if (isRequired(body.canBeDownloaded)) {
    if (typeof body.canBeDownloaded !== "boolean") {
      errors.push({
        field: "canBeDownloaded",
        message: "Incorrect canBeDownloaded",
      });
    }
  }

  if (isRequired(body.minAgeRestriction)) {
    if (
      typeof body.minAgeRestriction !== "number" ||
      body.minAgeRestriction < 1 ||
      body.minAgeRestriction > 18
    ) {
      errors.push({
        field: "minAgeRestriction",
        message: "min age 1, max age 18",
      });
    }
  }

  if (isRequired(body.publicationDate)) {
    if (typeof body.publicationDate !== "string") {
      errors.push({
        field: "publicationDate",
        message: "Incorrect publicationDate",
      });
    }
  }

  if (isRequired(body.availableResolutions)) {
    if (!Array.isArray(body.availableResolutions) || body.availableResolutions.length === 0) {
      errors.push({
        field: "availableResolutions",
        message: "At least one resolution should be added",
      });
    } else {
      const isValid = body.availableResolutions.every((item) => allowedResolutions.includes(item));
      if (!isValid) {
        errors.push({
          field: "availableResolutions",
          message: "At least one resolution should be added",
        });
      }
    }
  }

  return errors;
};
