const config = require('../config.json');

module.exports = ( rating ) => {
  const ranks = config.atcoder_ranks;
  
  if (rating === 0) return ranks[0];
  else if (rating <= 399) return ranks[1];
  else if (rating <= 799) return ranks[2];
  else if (rating <= 1199) return ranks[3];
  else if (rating <= 1599) return ranks[4];
  else if (rating <= 1999) return ranks[5];
  else if (rating <= 2399) return ranks[6];
  else if (rating <= 2799) return ranks[7];
  else return ranks[8];
}