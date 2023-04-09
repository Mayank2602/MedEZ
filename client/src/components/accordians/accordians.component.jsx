import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Accordians({list}) {
  const [expanded, setExpanded] = React.useState('1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
       {list && list.map((item,index) => <Accordion key={item._id} expanded={expanded == `${index+1}`} onChange={handleChange(`${index+1}`)}>
        <AccordionSummary aria-controls={`panel${index+1}d-content`} id={`panel${index+1}d-header`}>
        <div>{item.filename}</div><div>
         <Button variant="outlined">Compare</Button> </div>
        </AccordionSummary>
        <AccordionDetails>
         
            <b>Medicines Detected</b>
            { item.drugs.map((drug,j) => <li key={j}>{drug}</li>)}
           {item.type == "scan" &&<> <b>NOTE: </b> Medicines Detected above may have low accuracy cause of scan. 
           Users must crosscheck their symptoms with the medicine description.
           </>}
          
        </AccordionDetails>
      </Accordion>)}
    </div>
  );
}
