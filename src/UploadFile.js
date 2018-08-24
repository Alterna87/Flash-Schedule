import React, { Component } from 'react';


class UploadFile extends Component {
  constructor() {
    super();
    this.state = {
      uploadValue: 0,
      picture: null
    };

  }


  render() {
    return (
<div>

  <div className="input-group mb-3">
  <div className="input-group-prepend">

  </div>
  <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-sm" placeholder= 'Titulo'/>
  </div><br/>
  <div className="custom-file">
  <input type="file" className="custom-file-input"/>
  <label className="custom-file-label" ><i className="fas fa-camera"></i> Elige Foto </label><br/>
  <progress className= 'progress-bar bg-info' value= { this.props.uploadValue } max= '100'>{ this.props.uploadValue } %</progress>
</div>
</div>
    );
  }
}

export default UploadFile;
