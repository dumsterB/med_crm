export function deleteUndefinedOrNullValueKeys(object) {
  const returnedObject = {};

  Object.keys(object).forEach(key => {
    return object[key] !== undefined && object[key] !== null
      ? (returnedObject[key] = object[key])
      : false;
  });

  return returnedObject;
}
