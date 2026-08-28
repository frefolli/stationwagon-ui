import axios from "axios";
import { FormControl, TextField, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

interface MultiselectProps {
  label: string,
  value: string,
  onChange: (ID: string|undefined) => void,
  ajax: string
};

const Multiselect = (props: MultiselectProps) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({label: '', id: ''});

  useEffect(() => {
    if (props.ajax !== undefined) {
      fetchAjax("");
    }
  }, []);

  const fetchAjax = (query: Object) => {
    axios.get(props.ajax, {
      params: {
        limit: 100,
        q: query
      }
    }).then(response => {
      let new_options = response.data.map((record: {name: string, id: string}) => {
        return {
          label: record.name,
          id: record.id
        };
      });
      new_options.push({label: '', id: ''});
      setOptions(new_options);
    }).catch(err => {
      console.log(err);
    });
  }
  
  return (
    <FormControl
      sx={{textAlign:"center"}} fullWidth>
      <Autocomplete
        value={value}
        onChange={(_, value) => {
          if (value == null) {
            value = {label: '', id: ''};
          }
          const the_value = value as {label: string, id: string};
          setValue(the_value);
          props.onChange(the_value.id);
        }}
        renderInput={(params) => <TextField {...params} label={props.label}/>}
        options={options}
        onInputChange={(_, value) => {
          if (value.length >= 3)
            fetchAjax(value);
        }}
      />
    </FormControl>
  );
}

export default Multiselect;
