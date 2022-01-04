import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';


class MainView extends React.Component {

  constructor() { //The method that React uses to actually create the component
    super(); // This will call the parent React.Component’s constructor, which will give your class the actual React component’s features. Also, it will initialize the component’s this variable
    this.state = {
        movies: [],
        selectedMovie: null
    } 
}

  componentDidMount(){
    axios.get('https://my-flixdbapp.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }
  
  //When a new user is registered  
  SonRegistration(register) {
    this.setState({
      register
    });
  }

render() {
    const { movies, selectedMovie, register, user} = this.state;
     // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView

    if (!register) return <RegistrationView SignIn={register => 
      this.SignIn(register)} />; 

  // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
  if (!user) return <LoginView onLoggedIn={user => 
    this.onLoggedIn(user)} />;  

  // Before the movies have been loaded
  if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    );
  }
}


export default MainView;

  