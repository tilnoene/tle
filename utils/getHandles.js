require('dotenv').config();

// retorna um objeto com as handles do usuário de acordo com o nome no servidor do discord
module.exports = ( username ) => {
  let handles = {
    codeforces: '',
    atcoder: '',
  }

  username = username.split(process.env.HANDLE_SPLIT); // separador de handles no formato "codeforces/atcoder"

  if (username.length === 1) {
    handles.codeforces = username[0];
    handles.atcoder = username[0];
  } else {
    handles.codeforces = username[0];
    handles.atcoder = username[1];
  }

  return handles;
}