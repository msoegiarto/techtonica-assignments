const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const PORT = 3001 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.get('*', (req, res) => {
  res.json({ msg: 'Welcome' })
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));