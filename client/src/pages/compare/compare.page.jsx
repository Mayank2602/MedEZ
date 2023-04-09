import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, ResultBox } from '../../components';
import { setOption } from '../../features/navitem/navitemSlice';
import { altResult } from '../../features/result/resultSlice';

const Compare = () => {
    const [id, setId] = React.useState(0);
    const multiresult = useSelector((store) => store.result.multiResult);
    const isMultiLoading = useSelector((store) => store.result.isMultiLoading);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setId(event.target.value);
        dispatch(altResult({name: multiresult[event.target.value].name}))
    };

    React.useEffect(() => {
       
    
        dispatch(setOption("none"));
        // eslint-disable-next-line
      },[]);
      
    return (isMultiLoading || !multiresult?<Loader/> : <>
    
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
        
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={id}
            
              onChange={handleChange}
            >
                {multiresult.map((item,index) => <MenuItem key={index} value={index}>{item.name}</MenuItem>)}
             
            </Select>
          </FormControl>
        </Box>
        <ResultBox result = {multiresult.filter((item,index) => index === id)[0]}/>
        </>
      );
}

export default Compare