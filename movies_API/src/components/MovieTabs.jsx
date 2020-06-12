import React from "react";

class MovieTabs extends React.Component {
  // можем поймать сразу после setState до рендера
  // уже не используется
  componentWillReceiveProps(nextProps, nextState) {
    console.log('MovieTabs WillReceiveProps');
    console.log('nextProps sort_by', nextProps.sort_by);
    console.log('currentProps sort_by', this.props.sort_by);
  }


  shouldComponentUpdate(nextProps, nextState) {
    // по-умолчанию выводит true
    // когда в пропсы и состояние что-то пришло, что-то новое, 
    // происходит сверка старого и нового DOM, reconsulation
    // return true;
    // если сейчас поменяем на false, кликнем по другому фильтру,
    // DOM перерендерится, но кнопка данного фильтра активной не станет
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    } else {
      return false;
    }
    // данным кодом оптимизировали, не будет двойного рендера при загрузке
    // не увидим 'MovieTabs render' при первой загрузке
  }

  render() {
    const { sort_by, updateSortBy } = this.props;
    const handleClick = value => () => {
      updateSortBy(value);
    };

    const getClassLink = value => {
      return `nav-link ${sort_by === value ? "active" : ""}`
    };

    console.log('MovieTabs render');

    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            className={getClassLink('popularity.desc')}
            onClick={handleClick('popularity.desc')}
          >
            Popularity desc
        </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink('revenue.desc')}
            onClick={handleClick('revenue.desc')}
          >
            Revenue desc
        </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink('vote_average.desc')}
            onClick={handleClick('vote_average.desc')}
          >
            Vote average desc
        </div>
        </li>
      </ul>
    );
  }
}

// const MovieTabs = (props) => {
//   const { sort_by, updateSortBy } = props;
//   // const handleClick = value => {
//   //   return () => {
//   //     updateSortBy(value);
//   //   }
//   // };
//   const handleClick = value => () => {
//     updateSortBy(value);
//   };

//   const getClassLink = value => {
//     return `nav-link ${sort_by === value ? "active" : ""}`
//   };

//   return (
//     <ul className="tabs nav nav-pills">
//       <li className="nav-item">
//         <div
//           // className={`nav-link ${
//           //   sort_by === 'popularity.desc' ? 'active' : ''
//           // }`}
//           className={getClassLink('popularity.desc')}
//           // onClick={event => {
//           //   updateSortBy('popularity.desc');
//           // }}
//           onClick={handleClick('popularity.desc')}
//         >
//           Popularity desc
//         </div>
//       </li>
//       <li className="nav-item">
//         <div
//           className={getClassLink('revenue.desc')}
//           onClick={handleClick('revenue.desc')}
//         >
//           Revenue desc
//         </div>
//       </li>
//       <li className="nav-item">
//         <div
//           className={getClassLink('vote_average.desc')}
//           onClick={handleClick('vote_average.desc')}
//         >
//           Vote average desc
//         </div>
//       </li>
//     </ul>
//   );
// };

export default MovieTabs;
