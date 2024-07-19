import React from "react";
import axios from "axios";
import ToolboxTable from "./ToolboxTable";
import Multiselect from "./Multiselect";

const COLUMNS = [
  {title: "Name", key: "name"},
  {title: "Latitude", key: "latitude"},
  {title: "Longitude", key: "longitude"},
  {title: "Options", key: "toolbox", sortable: false}
]

export default class Finder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  fetchSelected = (ID) => {
    if (ID !== undefined && ID !== "") {
      axios.get(`${this.props.ajax_item_list}/${ID}`)
      .then(response => {
        this.setState({item: response.data});
        this.fetchItems(response.data);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  fetchItems = (data) => {
    let queryObject = this.props.ajax_item_query(data);
    axios.post(this.props.ajax_item_find, queryObject)
    .then(response => {
      this.setState({items: response.data});
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const rows = this.state.items.map((item) => {
      return {
        key: item.id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        toolbox: (<div></div>)
      }
    })
    return <div>
      <Multiselect
        label={this.props.label}
        value={this.state.itemID}
        onChange={this.fetchSelected}
        ajax={this.props.ajax_item_list}/>
      <ToolboxTable rows={rows} columns={COLUMNS}/>
    </div>
  }
}
