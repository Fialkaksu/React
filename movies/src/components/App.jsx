// JSX - шаблонизатор, синтаксический сахар для react компонентов
import React from 'react';
// под капотом работает babel, транспилит новые фичи(к примеру ES6) в понятный браузеру js код(ES5)
// Без babeljs писали бы еще на ES5

// ES5:
// function App() {
//   return React.createElement('div', null, 'Hello ReactWarriors');
//  // or
//   return React.createElement('div', {className: 'title'}, 'Hello ReactWarriors');
// }
// JSX(ES6):
// function App() {
//   return <div>Hello ReactWarriors</div>
// }

// усли нет export default, то след запись:
import { moviesData } from '../moviesData';

import MovieItem from './MovieItem';
// console.log(moviesData);

// UI=function(state, props)

// функциональный компонент или state-less
// глупый компонент
// function App() {
//   return <div>{moviesData[0].title}</div>
// }
// умный компонент
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    }

    // this.removeMovie=this.removeMovie.bind(this);
  }

  // removeMovie(movie) {
  removeMovie = movie => {
    // сначала меняем виртуальный дом,
    // в updateMovies остаются все movies, кроме удаляемого
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    })
    // console.log(movie.id);
    // console.log(updateMovies);
    // this.state.movies=updateMovies;
    // после обновления виртуального дома обновляем состояние
    this.setState({
      movies: updateMovies
    })
  }

  addMovieToWillWatch = movie => {
    // console.log(movie);
    // this.state.moviesWillWatch.push(movie);
    // const updateMoviesWillWatch= [...this.state.moviesWillWatch];
    // updateMoviesWillWatch.push(movie);
    const updateMoviesWillWatch= [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id;
    })
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }

  // добавляет элементы в DOM
  // render() превращает виртуальный DOM в DOM
  render() {
    // console.log(this);
    console.log('render', this.state);
    // можно рендерить массивы:
    // return <div>{[1,2,3,4,5]}</div>
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              {this.state.movies.map(movie => {
                // добавляем key, чтобы не просто перезатирать текста при ререндере, 
                // а производить смещение(удаление) нужного компонента с фильмом
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;