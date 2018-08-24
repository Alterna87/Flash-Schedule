import React, { Component } from 'react';
import firebase from 'firebase';
import UploadFile from './UploadFile';
import './App.css';
import Navigation from './components/Navigation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      uploadValue: 0,
      pictures : []
    }
    // Instansear Objetos

    this.handleAuth = this.handleAuth.bind(this);

    this.handleUpload = this.handleUpload.bind(this);

  }

componentWillMount() {
  firebase.auth().onAuthStateChanged(user => {
    this.setState({ user });
  });
  firebase.database().ref('pictures').on('child_added', snapshot => {
    this.setState ({
      pictures: this.state.pictures.concat(snapshot.val())
    });
  })
}

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesion`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }


  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      });

    }, error => { console.log(error.message)

    }, () => storageRef.getDownloadURL().then(url =>  {
        const record = {
          photoURL: this.state.user.photoURL,
          displayName: this.state.user.displayName,
          image: url
        };
        const dbRef = firebase.database().ref('pictures');
        const newPicture = dbRef.push();
        newPicture.set(record);
    }));

  }

 // render login
  loginButton () {
    // Si está logueado
    if (this.state.user) {
      return (
        <div>
        <Navigation onUser = { this.state.user.displayName } onPicture = { this.state.user.photoURL } />


        <div className= 'row'>
        <UploadFile onUpload = { this.handleUpload } uploadValue = { this.state.uploadValue } />
          {
          this.state.pictures.map(picture => (
            <div className = 'card col-md-2 margin-s'>
            <img className= 'card-img-top' src = { picture.image } alt="Card image cap"/>
            <div className ="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
          )).reverse()
        }
        </div>

        </div>
      );

      // si no está logueado
    } else {
      return(
        <section>
        <section className="row App-header">
        <h1 className="col-sm-12 col-lg-12 col-xl-12 text-center App-title ">Flash Schedule</h1>
        <h5 className="col-sm-12 col-lg-12 col-xl-12 text-center text-type">"Un lugar donde organizar tu día"</h5>
        </section>
      <button className='btn btn-outline-danger col-sm-12 col-lg-6 offset-lg-3 btn-google' onClick={this.handleAuth}>Login con Google</button>
      </section>
    );
  };
  }
  render() {
    return (
      <div className="App container-fluid">

          { this.loginButton() }

      </div>
    );
  }
}

export default App;
