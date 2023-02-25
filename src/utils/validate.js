export const validateEstimatedTime = (str) => {
  return str.match(
    /^([0-9]+([.][0-9]+)?[wdhm])([ ][0-9]+([.][0-9]+)?[wdhm])*$/gi
  );
};
