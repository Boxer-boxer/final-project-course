import React from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

/*import Clarifai from 'clarifai';*/

import './App.css';


/*const app = new Clarifai.App({
 apiKey: '2a6e40a057e04d1aa7e0470470c7fb07'
});*/


const particlesOptions = {
  "particles": {
          "number": {
              "value": 50
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }}




const initialState = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user : {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user : {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


  calculateFaceLocation = (data) => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box 
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol: clarifyFace.left_col * width,
      rightcol:width - (clarifyFace.right_col * width),
      topRow: clarifyFace.top_row * height,
      bottomRow: height - (clarifyFace.bottom_row * height),
    }
  }

  loadUser = (data) => {
    this.setState( {user : { 
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})

  }

  onSubmit = () => {
    const { id } = this.state.user
    this.setState({imageUrl: this.state.input})
   
    fetch('https://guarded-brushlands-54149.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => { console.log(response)
        if (response) {
          fetch('https://guarded-brushlands-54149.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json',
                      'Accept': "application/json" },
            body: JSON.stringify({
              id: id
              })
          })
          .then(response => console.log(response.json()))
          .then(count=> {
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
            } else {
              console.log("no response registered")
            }
            this.displayFaceBox(this.calculateFaceLocation(response))   
      })
          .catch(err => console.log(err))
    }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({
        initialState
      })
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
                    params={particlesOptions} 
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'   
          ? <div>
            <Logo />
            <Rank 
              entries={this.state.user.entries}
              name={this.state.user.name}
              />
            <ImageLinkForm onInputChange={this.onInputChange}
                      onSubmit={this.onSubmit}/>
            <FaceRecognition box={this.state.box} 
                      imageUrl={this.state.imageUrl}/>
            </div>
          
            :( this.state.route ==='signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
      )
  }

}

export default App;  