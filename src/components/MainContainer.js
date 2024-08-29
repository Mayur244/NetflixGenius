import React from 'react'
import BackgroundVideo from './BackgroundVideo';
import BackgroundVideoTitle from './BackgroundVideoTitle';
import { useSelector } from 'react-redux';

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if (!movies) return;
  
    const mainMovie = movies[1];

    const {original_title, overview, id} = mainMovie;
  
  return (
    <div className='relative overflow-x-hidden pt-[30%] bg-black md:pt-0'>
        <BackgroundVideoTitle title={original_title} overview={overview} />
        <BackgroundVideo movieId={id}/>
    </div>
  )
}

export default MainContainer;