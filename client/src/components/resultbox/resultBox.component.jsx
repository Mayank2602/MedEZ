import React from 'react'
import ResultCard from './resultCard.component';
import { useSelector } from 'react-redux';
import Loader from '../loader/loader.component';
// import Item from '../../../../server/models/item';

const ResultBox = ({result}) => {
  const alternatives = useSelector((store) => store.result.alternatives);
  const isAltLoading = useSelector((store) => store.result.isAltLoading);
  return (
    result &&<>
    <div style={{margin:'1.5rem 0'}}>
        <div style={{fontFamily:'consolas', fontSize:'25px'}}>Accuracy:{result.accuracy}%</div>
       {result.accuracy < 35 && <div>The item may not be a potential medicine.</div>} 
      
    <div>{result.desc.substr(0,Math.min(300,result.desc.length))}...</div>
    <h2 style={{fontFamily:'consolas'}}>Results</h2>
    {result.sources.map((item)=> <ResultCard {...item} key={item.url} />)}
    <div>
    <h2 style={{fontFamily:'consolas',marginTop:'1rem'}}>Alternatives</h2>
    {isAltLoading || !alternatives ? <Loader/>:<>
       {alternatives.map((alt,index) => <ResultCard {...alt} key={index} />)}
    </>}
    </div>
    </div>
   
    </>
    
  )
}

export default ResultBox





