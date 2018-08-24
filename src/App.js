import React, { Component } from 'react';
import firebase from 'firebase';
import UploadFile from './UploadFile';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      uploadValue: 0,
      pictures : []
    };
    // Instansear Objetos
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
  handleLogout() {
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido`))
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
        <img width='100' src = {this.state.user.photoURL } alt = {this.state.displayName} />
        <p>Hola {this.state.user.displayName } </p>
        <button className='btn btn-primary' onClick={this.handleLogout}>Log Out</button>
        <UploadFile onUpload = { this.handleUpload } uploadValue={this.state.uploadValue}/>
        {
          this.state.pictures.map(picture => (
            <div>
            <img src = {picture.image}/>
            <br/>
            <img  width='100' src= {picture.photoURL} alt ={picture.displayName} />
            <br/>
            <span>{picture.displayName}</span>
            </div>
          )).reverse()
        }
        </div>
      );
      // si no está logueado
    } else {
      return(
      <button className='btn btn-outline-danger col-sm-12 col-lg-6 offset-lg-3 btn-google' onClick={this.handleAuth}>Login con Google</button>
    );
  };
  }
  render() {
    return (
      <div className="App container-fluid">
        <header className="row App-header">
        <h1 className="col-sm-12 col-lg-6 col-xl-6 offset-xl-5 App-title">Flash Schedule</h1>
        <h5 className="col-sm-12 col-lg-12 col-xl-12 text-center">"Un lugar donde te organizamos tu día"</h5>
        </header>
        <p className="App-intro">
          { this.loginButton() }
        </p>
      </div>
    );
  }
}

export default App;
