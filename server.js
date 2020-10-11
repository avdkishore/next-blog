const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.APP_ENV === 'local';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // new article page
  server.get('/articles/new', (req, res) => {
    const actualPage = '/articles/edit';
    app.render(req, res, actualPage);
  });

  // edit article page
  server.get('/articles/edit/:id', (req, res) => {
    console.log('req.params', req.params);
    const actualPage = '/articles/edit';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  // article preview page
  server.get('/articles/preview/:id', (req, res) => {
    console.log('req.params', req.params);
    const actualPage = '/articles/preview';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  // article by id page
  server.get('/articles/:id', (req, res) => {
    const actualPage = '/articles';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  // default home page
  server.get('/', (req, res) => {
    const actualPage = '/articles';
    app.render(req, res, actualPage);
  });

  // any other unhandled route. SHould be 404 page
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;

    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
