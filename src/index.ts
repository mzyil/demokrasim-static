import express, { Request, Response } from "express";
import path from "path";

const app = express();

app.use("/static",
  express.static(path.resolve(__dirname, "public"), {
    setHeaders: (res, _path) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  })
);

const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  // return 410 with server side rendering from index.html
  return res.status(410).sendFile("public/index.html", { root: __dirname });
});

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
