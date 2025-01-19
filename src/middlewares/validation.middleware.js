export function validateBody(schema){
  return validate(schema, 'body');
}

export function validateParams(schema){
  return validate(schema, 'params')
}

function validate(schema, type) {
  return (req, res, next) => {
    const {error} = schema.validate(
      req[type], { abortEarly: false })

    if (error) {
      const errors = error.details.map(
        (detail) => detail.message
      );
      console.log(errors);
      return res.status(422).send(errors);
    }

    next();
  }
}