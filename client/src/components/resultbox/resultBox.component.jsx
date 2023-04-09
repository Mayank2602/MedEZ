import React from 'react'
import ResultCard from './resultCard.component';
// import Item from '../../../../server/models/item';

const ResultBox = ({result}) => {
  
  return (
    result &&<>
    <div style={{margin:'1.5rem 0'}}>
        <div style={{fontFamily:'consolas', fontSize:'25px'}}>Accuracy:{result.accuracy}%</div>
       {result.accuracy < 35 && <div>The item may not be a potential medicine.</div>} 
    <div>{result.desc.substr(0,Math.min(300,result.desc.length))}...</div>
    {result.sources.map((item)=> <ResultCard {...item} key={item.url} />)}
    </div>
   
    </>
    
  )
}

export default ResultBox





