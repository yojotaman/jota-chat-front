var express = require('express');
var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

//acceso a cada una de las vistas de la aplicación
/*
function restrict (req, res, next){
	if(req.user) return next();
	res.redirect('/signup');
}
esta funcion deberá incluirse en el llamado de la home
*/

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
		setTimeout(function(){
			res.send(pictures);
		}, 2000);
		
});

app.listen (3000, function (err){
	if (err) return console.log('Hubo un error'), process.exit(1);
	console.log ('Portal_StudioF escuchando en el puerto 3000');
})