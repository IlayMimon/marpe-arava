const httpRequest = async (path: string) => {
  if (path.toLowerCase().startsWith('/_api/web')) {
    path = '/sites/MarpeArava/' + path;
  } else {
    path = `/sites/MarpeArava/_api/web/${path.startsWith('/') ? path.slice(1) : path}`;
  }
  // temporary implementation. will be Axios later
  return await fetch(path);
};

export default httpRequest;
