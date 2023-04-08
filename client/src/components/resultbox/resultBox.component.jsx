import React from 'react'
import { useSelector } from 'react-redux'
import ResultCard from './resultCard.component';
// import Item from '../../../../server/models/item';

const ResultBox = () => {
  const result = useSelector((store) => store.result.result);
  return (
    result &&<>
    <div style={{margin:'1.5rem 0'}}>
    <div>{result.desc}</div>
    {result.sources.map((item)=> <ResultCard {...item} key={item.url} />)}
    </div>
   
    </>
    
  )
}

export default ResultBox





