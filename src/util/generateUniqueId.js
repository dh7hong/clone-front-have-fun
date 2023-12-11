export const generateUniqueId = () => {
  let date = new Date();
  let milliseconds = date.getFullYear() * 365 * 30 * 24 * 60 * 60 * 1000 +
  date.getMonth() * 30 * 24 * 60 * 60 * 1000 +
  date.getDate() * 24 * 60 * 60 * 1000 +
  date.getHours() * 60 * 60 * 1000 +
  date.getMinutes() * 60 * 1000 +
  date.getSeconds() * 1000 +
  date.getMilliseconds()
  console.log(milliseconds);
  return (
    milliseconds
  );
};
