import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS, TOP_RATED_MOVIES_API } from "../utils/constants";


const useTopRatedMovies = () => {
  const topRatedMovies = useSelector(
    (store) => store.movies.topRatedMovies
  );
    const dispatch = useDispatch();
 
  const getTopRatedMovies = async () => {
      const data = await fetch(TOP_RATED_MOVIES_API, API_OPTIONS);
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
  }

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
}

export default useTopRatedMovies;