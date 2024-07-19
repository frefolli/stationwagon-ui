import './App.css';
import React from "react";
import Finder from './components/Finder';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Finder
          label="city"
          ajax_item_list="http://localhost:8080/api/cities"
          ajax_item_find="http://localhost:8080/api/stations/find"
          ajax_item_query={(data) => {
            return {
              latitude: data.latitude,
              longitude: data.longitude,
            };
          }}
        />
      </div>
    );
  }
}
