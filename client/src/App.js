import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
import AddMovie from "./Movies/AddMovie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [update, setUpdate] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <div className="nav-bar">
        <div className="home-btn">
          <NavLink to="/">Home</NavLink>
        </div>
        <NavLink to={'/add-movie'}>Add Movie</NavLink>
      </div>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} update={update} setUpdate={setUpdate} />
      </Route>

      <Route path='/update-movie/:id'>
        <MovieForm setMovieList={setMovieList} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie setMovieList={setMovieList} />
      </Route>

      <Route path="/soved-movies">
        <SavedList list={savedList} />
      </Route>
    </>
  );
};

export default App;
