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
      <progress value= { this.props.uploadValue } max= '100'>{ this.props.uploadValue } %</progress>
    <br/>
    <input type= 'file' onChange = { this.props.onUpload }/>
    </div>
    );
  }
}

export default UploadFile;
