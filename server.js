// const express = require('express');
// const path = require('path');
// const app = express();

// // Set up Handlebars
// const exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts') }));
// app.set('view engine', 'handlebars');

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'assets')));

// // Body parser middleware
// app.use(express.urlencoded({ extended: true }));

// // Routes
const newPetRoutes = require('./routes/newPet');
const adoptionRoutes = require('./routes/adoption');
// app.use('/', newPetRoutes);
// app.use('/', adoptionRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { APP_HOST, PORT } = require('./utils/constants');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use('/', newPetRoutes);
app.use('/', adoptionRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running on http://${APP_HOST}:${PORT}`)
  );
});
