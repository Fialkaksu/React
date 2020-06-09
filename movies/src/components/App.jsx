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
console.log(moviesData);

// UI=function(state)
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
      movies: moviesData
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
    console.log(updateMovies);
    // this.state.movies=updateMovies;
    // после обновления виртуального дома обновляем состояние
    this.setState({
      movies: updateMovies
    })
  }

  // добавляет элементы в DOM
  render() {
    console.log(this);
    console.log('render', this.state);
    // можно рендерить массивы:
    // return <div>{[1,2,3,4,5]}</div>
    return (
      <div>
        {this.state.movies.map(movie => {
          // добавляем key, чтобы не просто перезатирать текста при ререндере, 
          // а производить смещение(удаление) нужного компонента с фильмом
          return (
            <MovieItem
              key={movie.id}
              movie={movie}
              removeMovie={this.removeMovie}
            />
          );
        })}
      </div>
    );
  }
}

export default App;