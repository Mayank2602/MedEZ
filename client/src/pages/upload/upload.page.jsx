import React, {useEffect, useState} from 'react'
import { useDispatch } from "react-redux";
import { setOption } from "../../features/navitem/navitemSlice";
import { Button } from '@mui/material';
import { uploadFile } from '../../features/result/resultSlice';
const Upload = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setOption("Upload"));
      //eslint-disable-next-line
    }, []);
    const [selectedFile, setSelectedFile] = useState();

    const handleSelectedFile = (e) => {
          setSelectedFile(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        const data = new FormData()
        //console.log(selectedFile.name)
        data.append('file', selectedFile, selectedFile.name)
        dispatch(uploadFile(data))
    }

  return (
    <>
     <div>Upload</div>
         

        <Button variant="contained" component="label">
           Choose File
          <input name="image" hidden type="file" onChange={handleSelectedFile} />
        </Button>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </>
   
  )
}

export default Upload