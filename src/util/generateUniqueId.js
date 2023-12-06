export const generateUniqueId = () => {
  let now = new Date();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let milliseconds = now.getMilliseconds();
  return minutes * 60000 + seconds * 1000 + milliseconds;
};
