import React, { Component } from 'react';
import firebase from 'firebase';

class Navigation extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }
    handleLogout() {
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  render() {
    return(
      <section>
      <nav className= 'navbar navbar-dark bg-nav'>
      <p className='text-white logo'>Flash Schedule</p>
      <a href='' className ='d-none d-lg-block text-white'>
      <i className="fas fa-pencil-alt"></i>
      </a>
      <a href='' className ='d-none d-lg-block text-white'>
      <i className="fas fa-camera"></i>
      </a>
      <a href='' className ='d-none d-lg-block text-white'>
      <i className=" fas fa-video"></i>
      </a>
      <a href='' className ='d-none d-lg-block text-white'>
      <i className="fas fa-map-marker-alt"></i>
      </a>
      <section className='form-inline my-2 my-lg-0'>
      <img className = 'd-none d-lg-block rounded-circle margin-s' width='50' src = { this.props.onPicture } alt = { this.props.onUser.onPicture } />
      <p className='d-none d-lg-block text-white margin-s'>Bienvenid@ { this.props.onUser }</p>
      <button className='d-none d-lg-block btn btn-success margin-s' onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i> Salir</button>
      </section>
      </nav>
  <div className="bg-nav d-lg-none pos-f-t ">
  <div className="collapse" id="navbarToggleExternalContent">
    <div className="p-4">
    <p className="text-white margin-s">Bienvenid@ { this.props.onUser }</p><button className='btn btn-success margin-s' onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i> Salir</button>
    <h4 className="text-white margin-s"><i className="fas fa-pencil-alt"></i> Notas</h4>
    <h4 className="text-white margin-s"><i className="fas fa-camera"></i> Fotos</h4>
    <h4 className="text-white margin-s"><i className="fas fa-video"></i> Videos</h4>
    <h4 className="text-white margin-s"><i className="fas fa-map-marker-alt"></i> Reuniones</h4>


    </div>
  </div>
  <nav className="navbar navbar-dark bg-nav  col-sm-2">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
  </nav>
</div>
</section>


    );
  }
}
// <div className="d-lg-none">Celular</div>
// <div className="d-none d-lg-block">Escritorio</div>
export default Navigation;
