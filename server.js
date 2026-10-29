const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  if (req.url === "/" || req.url === "/index.html") {
    const file = path.join(publicDir, "index.html");

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Please add public/index.html");
      }

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
