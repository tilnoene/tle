module.exports = () => {
  now = new Date();

  day = now.getDay();
  month = now.getMonth();

  hours = now.getHours();
  minutes = now.getMinutes();
  seconds = now.getSeconds();

  return `[${day}/${month} - ${hours}:${minutes}:${seconds}]`;
}