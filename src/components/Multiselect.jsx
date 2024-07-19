import React from "react";
import axios from "axios";
import { FormControl, TextField, Autocomplete } from "@mui/material";

export default class Multiselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: (this.props.options || []),
      value: (this.props.value || '')
    };
  }

  componentDidMount() {
    if (this.props.ajax !== undefined) {
      this.fetchAjax("");
    }
  }

  fetchAjax(query) {
    axios.get(this.props.ajax, {
      params: {
        limit: 100,
        q: query
      }
    }).then(response => {
      let options = response.data.map(record => {
        return {
          label: record.name,
          id: record.id
        };
      });
      options.push({label: '', id: ''});
      this.setState({options: options});
    }).catch(err => {
      console.log(err);
    });
  }
  
  render() {
    return (
      <FormControl
        sx={{textAlign:"center"}} fullwidth>
        <Autocomplete
          value={this.state.value}
          onChange={(event, value) => {
            if (value == null) {
              value = {label: '', id: ''};
            }
            this.setState({value: value});
            this.props.onChange(value.id);
          }}
          renderInput={(params) => <TextField {...params} label={this.props.label}/>}
          options={this.state.options}
          onInputChange={(event) => {
            if (event !== null && event.target.value !== undefined) {
              if (event.target.value.length >= 3)
                this.fetchAjax(event.target.value);
            }
          }}
        />
      </FormControl>
    );
  }
}
