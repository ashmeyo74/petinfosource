const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifEquals: (arg1, arg2, options) => {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
const indexRoute = require('./routes/index');
const formRoute = require('./routes/forms');
app.use('/', indexRoute);
app.use('/forms', formRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
