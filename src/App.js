

import React, { Component } from 'react';
import axios from 'axios';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import FaceRec from './components/FaceRec/FaceRec';
import Navigation from './components/Navigation/Navigation';

import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';


import './App.css';
 
const app = new Clarifai.App({
  apiKey: '0950cf0652e94f6cb518c4fe548b70a9'
 });



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
     
    }
  }
  
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
   
    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. 

    // Old Way:
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

    // New Way:
    app.models
    .predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
      }, this.state.input)
    .then(response => {
      console.log('hi', response)
      if (response) {
        axios.post('http://localhost:3000/image', {
          
          headers: {'Content-Type': 'application/json'},
         
        })
          .then(response => response.json())
          

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}

  render() {
        
    const {  imageUrl, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg num={200} type="tadpole" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRec box={box} imageUrl={imageUrl} />
      </div>
    );
  }
}

export default App;
