import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const [errMessage, setErrMessage] = useState(null);
  const [showErrMessage, setShowErrMessage] = useState(false);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearchText = async () => {
    try {
      const gptQuery =
        "Act as a movie recommendation system and suggest some movies for the query " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: movie-1, movie-2, movie-3, movie-4, movie-5.";

      const gptResult = await client.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (
        !gptResult ||
        !gptResult.choices ||
        !gptResult.choices[0]?.message?.content
      ) {
        throw new Error("Unexpected GPT response format");
      }

      const gptMovies = gptResult.choices[0].message.content.split(",");

      if (!gptMovies || gptMovies.length === 0) {
        throw new Error("No movies found in GPT response");
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMoviesResults({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error during search:", error.message);
      setShowErrMessage(true);
      setErrMessage("You exceeded your current quota, please check your plan and billing details.");
    }
  };

  return (
    <>
      {" "}
      <div className="pt-[55%] md:pt-[10%] flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-11/12 md:w-1/2 bg-black grid grid-cols-12"
        >
          <input
            ref={searchText}
            type="text"
            className="text-sm md:text-xl p-3 md:p-4 m-3 md:m-4 col-span-9 rounded-lg"
            placeholder={lang[langKey].placeholder}
          />
          <button
            onClick={handleSearchText}
            className="col-span-3 m-2 md:m-4 px-1 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm md:text-xl"
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
      {showErrMessage && <div className="flex w-11/12 md:w-1/2 bg-black grid-cols-12 h-12 md:h-8 text-3xl text-red-500 mx-auto">
          <p className="text-sm ml-4">{errMessage}</p>
      </div>}
    </>
  );
};

export default GptSearchBar;
