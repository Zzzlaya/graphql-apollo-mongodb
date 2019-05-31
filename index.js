const app = require('./server/server');
const appPort = 4000;

app.listen(appPort, () => {
  console.log(`Listening on port ${appPort}`);
});
