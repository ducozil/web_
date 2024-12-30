const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const app = express();
const port = 3001;

// Http logger
app.use(morgan('combined'));

// Template engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Đường dẫn đến thư mục chứa các tệp template
app.get('/', (req, res) => {
  res.render("home")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});