import StationFinder from './components/StationFinder';

const App = () => {
  return (
    <div className="App">
      <StationFinder
        label="city"
        ajax_item_list="http://localhost:8080/api/cities"
        ajax_item_find="http://localhost:8080/api/stations/find"
      />
    </div>
  );
};

export default App;
