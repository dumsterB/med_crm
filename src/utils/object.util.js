export function deleteEmptyValueKeys(object) {
  const returnedObject = {};

  Object.keys(object).forEach((key) => {
    let isEmptyValue = false;

    if (object[key] === undefined || object[key] === null) isEmptyValue = true;
    if (typeof object[key] === 'string' && object[key].length === 0) isEmptyValue = true;
    if (object[key] instanceof Array && object[key].length === 0) isEmptyValue = true;

    return !isEmptyValue ? (returnedObject[key] = object[key]) : false;
  });

  return returnedObject;
}
