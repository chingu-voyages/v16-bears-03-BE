const app = require("./app");
const mongoose = require("mongoose");

const { PORT, DATABASE_URL } = require("./config");

mongoose.Promise = global.Promise;

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    // mongoose.set('debug', true);
    mongoose.set("useCreateIndex", true);
    
    mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true  }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your server is listening at http://localhost:${PORT}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, closeServer };
