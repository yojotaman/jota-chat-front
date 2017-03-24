var yo = require('yo-yo');
var landing = require('../landing')

var signupForm = yo`<div class="col s12 m7 ">						
							<div class="row">
								<div class="signup-box">
									<h1 class="kinetigram">Portal Studio F</h1>
									<form class="signup-form">
										<h2> Regístrate y entérate de las ultimas novedades de nuestra marca y comparte con nosotros la experiencia SF</h2>
										<div class="section">
											<a href="" class="btn btn-fb hide-on-small-only">Iniciar sesión con Facebook</a>
											<a href="" class="btn btn-fb hide-on-med-and-up"><i class="fa fa-facebook-official" aria-hidden="true"></i>Iniciar sesión</a>
										</div>
										<div class="divider"></div>
										<div class="section">
											<input type="email" name="email" placeholder="Correo electrónico"/>
											<input type="text" name="name" placeholder="Nombre completo"/>
											<input type="text" name="username" placeholder="Nombre de usuario"/>
											<input type="password" name="password" placeholder="contraseña"/>
											<button class="btn waves-effect waves-light btn-signup" type="submit">Regístrate</button>
										</div>
									</form>
								</div>								
							</div>
							<div class="row">
								<div class="login-box">
									¿Tienes una cuenta? <a href="signin">Entrar</a>
								</div>
							</div>					
						</div>`;
module.exports = landing(signupForm);