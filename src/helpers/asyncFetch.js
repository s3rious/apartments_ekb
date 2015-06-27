import request from 'then-jsonp';

export default function (url) {
  console.info(`Fetching new data from ${url}...`);

  return new Promise((resolve, reject) => {
    request('GET', url)
    .then(function (data) {
      if (data.error) {
        console.error(`... fetching from ${url} failed!`, data.error);
        reject(data.error);
      }
      else {
        console.log(`... data from ${url} fetched!`, data);
        resolve(data.response);
      }
    });
  });
}
