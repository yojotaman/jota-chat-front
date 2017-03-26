var page = require('page');
var empty = require('empty-element');
var template = require('./template')
var title = require('title');

page('/', function(ctx, next){
    title('Portal SF')
    var main = document.getElementById('main-container');

    var pictures = [ 
        {
            user: {
                username: 'mariac',
                avatar: 'http://www.stockvault.net/data/2014/06/19/158950/preview16.jpg'
            },
            url:'chaqueta.jpg',
            likes: 0,
            liked:false,
            createdAt: new Date()
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

	empty(main).appendChild(template(pictures));
})