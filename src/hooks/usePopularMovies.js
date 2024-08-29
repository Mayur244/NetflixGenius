import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS, POPULAR_MOVIES_API } from "../utils/constants";


const usePopularMovies = () => {
  const popularMovies = useSelector(
    (store) => store.movies.popularMovies
  );
    const dispatch = useDispatch();
 
  const getPopularMovies = async () => {
      const data = await fetch(POPULAR_MOVIES_API, API_OPTIONS);
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
  }

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
}

export default usePopularMovies;