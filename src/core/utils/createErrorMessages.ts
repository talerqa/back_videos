export const createErrorMessages = (
  errors: { field: string, message: string }[],
): { errorsMessages: { field: string, message: string }[] } => {
  return {errorsMessages: errors};
};