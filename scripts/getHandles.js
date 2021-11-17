// retorna um objeto com as handles do usuário de acordo com o nome do discord
module.exports = ( username ) => {
  let handles = {
    codeforces: '',
    atcoder: '',
  }

  username = username.split(process.env.HANDLE_SPLIT);

  if (username.length === 1) {
    handles.codeforces = username[0];
    handles.atcoder = username[0];
  } else {
    handles.codeforces = username[0];
    handles.atcoder = username[1];
  }

  return handles;
}