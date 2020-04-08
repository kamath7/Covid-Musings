const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const articleRouter = require('./routes/articles');
const Article = require('./models/article');
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// const connection = mongoose.connection;
// connection.once('open',()=>{
//     console.log(`Connected!`);
// });
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
   const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', { articles });
});
app.use('/articles',articleRouter);
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
