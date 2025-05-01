require("dotenv").config({ path: `${process.cwd()}/.env` });
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () =>
  console.log(`Death Plan app listening on port ${port}!`)
);
