import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const imageURL = {
   Apollo : './images/Apollo.jpg',
   MediBuddy: '/images/MediBuddy.png',
   PharmEasy: '/images/PharmEasy.jpg',
   onemg: '/images/onemg.png',
   flipkart: '/images/flipkart.jpg'
}
export default function ResultCard({name,price,source,url}) {
 
  
  return (
    <Card sx={{ display: 'flex' ,justifyContent:'space-between',marginTop:"1.5rem",padding:"10px"}}>
        <div style={{display:'flex', justifyContent:'flex-start'}}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={imageURL[source]}
        alt={source}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body1">
            {name}
          </Typography>
          <Typography variant="h6" component="div">
            Rs. {price}
          </Typography>
        </CardContent>
      </Box>
      </div>
      <a href={url} target="__blank" style={{textDecoration:"none"}}> <Button variant="contained" sx={{ backgroundColor: "teal", padding: "0.5rem" }}>Visit
      <ArrowOutwardIcon sx = {{marginLeft: "0.4rem"}}/></Button></a>
    </Card>
  );
}