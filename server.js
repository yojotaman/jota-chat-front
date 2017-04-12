var express = require('express');
var multer=require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
        cb(null, Date.now()+'.'+ext(file.originalname));
    }
})

var upload = multer({storage: storage}).single('picture');
var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res){
	// res.send('Hola mundo');
	res.render('index', {title: 'Portal SF'});
})

app.get('/signup', function (req, res){
	// res.send('Hola mundo');
	res.render('index', {title: 'Portal SF - Signup'});
})

app.get('/signin', function (req, res){
	// res.send('Hola mundo');
	res.render('index', {title: 'Portal SF - Signin'});
})

// configuracion del middleware

app.get('/api/pictures', function(req, res, next){
	var pictures = [
        {
            user: {
                username: 'mariac',
                avatar: 'http://www.stockvault.net/data/2014/06/19/158950/preview16.jpg'
            },
            url:'chaqueta.jpg',
            likes: 0,
            liked:false,
            createdAt: new Date().getTime()
        },
        {
            user: {
                username: 'mariac',
                avatar: 'http://www.stockvault.net/data/2014/06/19/158950/preview16.jpg'
            },
            url:'chaqueta.jpg',
            likes: 1,
            liked:true,
            createdAt: new Date().setDate(new Date().getDate()-10)
        },

        ];

        setTimeout(() => res.send(pictures), 2000)
    
});

app.post('/api/pictures', function(req, res){
    upload(req, res, function(err){
        if(err){
            return res.send(500, "Error uploading file");
            //return res.status(500).send("Error uploading file");
        }
        res.send('File uploaded');
    })
})

app.get('/api/user/:username', function(req, res){
    const user = {
        username: 'mariac',
        avatar:'https://instagram.feoh4-2.fna.fbcdn.net/t51.2885-19/11378750_421977541340156_1551321256_a.jpg',
        pictures: [
            {
                id: 1,
                src: 'https://scontent.feoh4-2.fna.fbcdn.net/v/t1.0-9/17883661_10155197032454921_3802157434978675206_n.jpg?oh=902a4b257fdca2a89f581647349af354&oe=595666F1',
                likes: 3
            },
            {
                id: 2,
                src: 'https://scontent.feoh4-2.fna.fbcdn.net/v/t1.0-9/17883933_10155195762674921_4452506709376640208_n.png?oh=0515d26e8ace466457f69dd7f00d518f&oe=5998D965',
                likes: 10
            },
            {
                id: 3,
                src: 'https://scontent.feoh4-2.fna.fbcdn.net/v/t1.0-9/17800104_10155195591114921_3517971978336439330_n.png?oh=91aea9fce554881ecb3d37c994e8d351&oe=59951C32',
                likes: 23
            },
            {
                id: 4,
                src: 'https://scontent.feoh4-2.fna.fbcdn.net/v/t1.0-9/17634750_10155195588274921_3724729567035015893_n.jpg?oh=3c970377b97f31055b545c869631f1e3&oe=594F6BF6',
                likes: 0
            },
            {
                id: 5,
                src: 'https://scontent.feoh4-2.fna.fbcdn.net/v/t1.0-9/17798941_10155188996014921_7718295777851971566_n.png?oh=3231dabb3dd181b56b52d7820420e1d9&oe=595A3A71',
                likes: 1
            },
            {
                id: 6,
                src: 'https://scontent.feoh4-2.fna.fbcdn.net/v/t1.0-9/17796425_10155186722524921_5088720709101118528_n.png?oh=cd133a075b6b507a09f718686e3279ec&oe=599AB1E7',
                likes: 99
            }
        ]
    }

    res.send(user);
})

app.get('/:username', function(req, res){
    res.render('index', { title: `StudioF - ${req.params.username}`})
})

app.listen (3000, function (err){
	if (err) return console.log('Hubo un error'), process.exit(1);
	console.log ('Portal_StudioF escuchando en el puerto 3000');
})
