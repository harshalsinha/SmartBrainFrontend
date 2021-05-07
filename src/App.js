import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js'; 

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  signedIn: false,
  name: '',
  entries: 0,
  user: {
    id: '',
    user: '',
    email: '',
    entries: 0,
    joined: ''
  },
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      user: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
    this.setState({entries: data.entries})
    this.setState({name: data.name})
  }

  calculateFaceLocation = (response) => {
    const boxCoordinates = response.outputs[0].data.regions[0].region_info.bounding_box;
    const faceImage = document.getElementById('faceImage');
    const width = Number(faceImage.width);
    const height = Number(faceImage.height);
    
    return {
      left_col : boxCoordinates.left_col * width,
      right_col : width - (boxCoordinates.right_col * width),
      top_row : boxCoordinates.top_row * height,
      bottom_row : height - (boxCoordinates.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({
      input : event.target.value
    });
  }

  onSubmit = () => {
    this.setState({
      imageUrl : this.state.input
    });
    
    fetch('https://pacific-refuge-07866.herokuapp.com/imageUrl', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
    .then(response => {
      if(response)
      {
        this.setState({entries: parseInt(this.state.entries) + 1})
        fetch('https://pacific-refuge-07866.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        }).then(response)
        .catch(err => console.log(err))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    this.setState({
      route : route
    });
    if(route === 'Home')
    {
      this.setState({
        signedIn : true
      })
    }
    else if(route === 'Register')
    {
      this.setState(initialState);
      this.setState({route: 'Register'})
    }
    else
    {
      this.setState(initialState)
    }
  }


  render(){
    const { signedIn, route, box, imageUrl, name, entries }  = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} signedIn={signedIn}/>
        {
          this.state.route === 'Home' ? 
          <div>
            <Particles className="particles" params={particleOptions}/>
            <Logo/>
            <Rank name={name} entries={entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition imageUrl={imageUrl} box={box}/> 
          </div> :
          (route === 'SignIn' ? 
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> : 
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>) 
        }
      </div>
    );
  }
}

export default App;
