import React, {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { setOption } from "../../features/navitem/navitemSlice";
import { Button } from '@mui/material';
const Upload = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setOption("Upload"));
      //eslint-disable-next-line
    }, []);
  return (
    <>
     <div>Upload</div>
     <form action="/api/search/multiple" method="POST" enctype="multipart/form-data"> 
        <Button variant="contained" component="label">
           Choose File
          <input name="image" hidden type="file" />
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </>
   
  )
}

export default Upload