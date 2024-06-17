const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');

// Set up Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Routes
const newPetRoutes = require('./routes/newPet');
const adoptionRoutes = require('./routes/adoption');
app.use('/', newPetRoutes);
app.use('/', adoptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
