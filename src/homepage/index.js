var page = require('page');
var empty = require('empty-element');
var template = require('./template')
var title = require('title');
var request = require('superagent');
var header = require('../header'); // middelware
var axios = require('axios');
var Webcam = require('webcamjs');
var picture = require('../picture-card')

page('/', header, loading, asyncLoad, function(ctx, next){
    title('Portal SF')
    var main = document.getElementById('main-container');   

	empty(main).appendChild(template(ctx.pictures));

      const picturePreview = $('#picture-preview');
      const camaraInput = $('#camara-input');
      const cancelPicture = $('#cancelPicture');
      const shootButton = $('#shoot');
      const uploadButton = $('#uploadButton');

      function reset()
      {
        picturePreview.addClass('hide');
        cancelPicture.addClass('hide');
        uploadButton.addClass('hide');
        shootButton.removeClass('hide');
        camaraInput.removeClass('hide');
      }

      cancelPicture.click(reset)

    $( document ).ready(function() 
  {
      $('.modal').modal({ // inicializa todos los modales
        ready: function()
        {
          Webcam.attach('#camara-input');
          shootButton.click((ev) => {
            Webcam.snap((data_uri) => {
              picturePreview.html (`<img src="${data_uri}"/>`);
              picturePreview.removeClass('hide');
              cancelPicture.removeClass('hide');
              uploadButton.removeClass('hide');
              shootButton.addClass('hide');
              camaraInput.addClass('hide');
              uploadButton.off('click');
              uploadButton.click(() => {
                const pic = {
                  url: data_uri,
                  likes: 0,
                  liked: false,
                  createAt: +new Date(),
                  user: {
                    username: 'mariac',
                    avatar: 'http://www.stockvault.net/data/2014/06/19/158950/preview16.jpg'
                    }
                }
                $('#picture-cards').prepend(picture(pic));
                reset();
                $('#modalCamara').modal('close');
              })
            });
          })
        },
        complete: function(){
          Webcam.reset();
          reset();
        }
      }); 
      
      $('#modal-trigger').on('click', function() // abrir el modal click
      {  
        $('#modalCamara').modal('open'); // el #href debe ser el mismo id del modal. 
      });
      
    });

})

function loading (ctx, next) {
    var el = document.createElement('div');
    el.classList.add('loader');
    document.getElementById('main-container').appendChild(el);
    next();
}

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