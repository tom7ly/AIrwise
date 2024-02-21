import express from 'express';
import router from './routes'
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/', router);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});