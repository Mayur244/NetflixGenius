import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-10">
      <h1 className="text-lg md:text-4xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex">
          {movies &&
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
