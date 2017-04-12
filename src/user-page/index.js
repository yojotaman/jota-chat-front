import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import template from './template'


page('/:username', header, loadUser, function (ctx, next) {
  var main = document.getElementById('main-container')
  title(`StudioF - ${ctx.user.username}`)
  empty(main).appendChild(template(ctx.user))
})

page('/:username/:id', header, loadUser, function (ctx, next) {
  var main = document.getElementById('main-container')
  title(`StudioF - ${ctx.user.username}`)
  empty(main).appendChild(template(ctx.user))
  	$('.modal').modal();
	$('.modal').modal({
    complete: function() {
      page(`/${ctx.params.username}`)
    }
  });
	$(`#modal${ctx.params.id}`).modal('open');
})


async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
    next()
  } catch (err) {
    	console.log(err)
  }
}
