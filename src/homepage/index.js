var page = require('page');
var empty = require('empty-element');
var template = require('./template')
var title = require('title');
var request = require('superagent');
var header = require('../header'); // middelware
var axios = require('axios');


page('/', header, asyncLoad, function(ctx, next){
    title('Portal SF')
    var main = document.getElementById('main-container');   

	empty(main).appendChild(template(ctx.pictures));
})

function loadPictures(ctx, next){
    request
        .get('/api/pictures')
        .end(function (err, res){
            if(err) return console.log(err);
            
            ctx.pictures = res.body;
            next();
        })
};

//obteniendo respuesta del servidor con axios - ejemplo (otra posibilidad)
function loadPicturesAxios(ctx, next){
    axios
        .get('/api/pictures')
        .then(function (res){               
            ctx.pictures = res.data;
            var pic = ctx.pictures;
            next();
        })
        .catch(function(err){
            console.log(err);
        })
};

// usando una funcionalidad de los navegadores que se llama fetch
function loadPicturesFetch(ctx, next){
    fetch('/api/pictures')
        .then(function(res){
            return res.json();
        })
        .then(function(pictures){
            ctx.pictures = pictures;
            next();
        })
        .catch(function(err){
            console.log(err);
        })
};

//obteniendo respuesta del servidor usando async/await
async function asyncLoad(ctx, next){
   try{
       ctx.pictures = await fetch('/api/pictures').then(res => res.json())
       //ctx.pictures = pictures;
       next();
   } catch(err){
       return console.log(err);
   }
};