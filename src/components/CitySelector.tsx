import { FormControl, TextField, Autocomplete } from "@mui/material";
import { useState } from "react";
import CITIES from "../data/cities.json";
import { City } from "../types";

interface Props {
  label: string,
  value: City|undefined,
  onChange: (city: City|undefined) => void,
};

const CitySelector = (props: Props) => {
  const [options, setOptions] = useState([] as City[]);
  const [value, _] = useState(props.value);

  const filterOptionsByQuery = (query: string) => {
    let lowercase_query = query.toLowerCase();
    const new_options = CITIES.filter((city : City) => {
      return city.label.toLowerCase().startsWith(lowercase_query);
    });
    setOptions(new_options);
  }

  const filterOptionsByLength = () => {
    const new_options = CITIES.filter((city : City) => {
      return city.label.length <= 3;
    });
    setOptions(new_options);
  }
  
  return (
    <FormControl
      sx={{textAlign:"center"}} fullWidth>
      <Autocomplete
        value={value}
        onChange={(_, value) => {
          if (value == null) {
            props.onChange(undefined);
          } else {
            const the_value = value as City;
            props.onChange(the_value);
          }
        }}
        renderInput={(params) => <TextField {...params} label={props.label}/>}
        options={options}
        onInputChange={(_, value) => {
          if (value.length >= 3) {
            filterOptionsByQuery(value);
          } else {
            filterOptionsByLength();
          }
        }}
      />
    </FormControl>
  );
}

export default CitySelector;
