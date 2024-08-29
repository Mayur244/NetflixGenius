import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gpt",
    initialState : {
        showGptSearch : false,
        movieNames : null,
        movieResults : null
    },
    reducers : {
        toggleGptSearch : (state) => {
            state.showGptSearch = !state.showGptSearch;
        }, 
        addGptMoviesResults : (state, action) => {
            state.movieNames = action.payload.movieNames;
            state.movieResults = action.payload.movieResults;
        }
    }
})

export const {toggleGptSearch, addGptMoviesResults} = gptSlice.actions;
export default gptSlice.reducer;