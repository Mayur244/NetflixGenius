import React from 'react'
import { POSTER_CDN_URL } from '../utils/constants';

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-36 md:w-48 pr-4 cursor-pointer'>
        <img alt='MoviePoster' src={POSTER_CDN_URL + posterPath}/>
    </div>
  )
}

export default MovieCard;