export const NETFLIX_LOGO = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_PROFILE = "https://avatars.githubusercontent.com/u/97151293?v=4";

export const NETFLIX_BACKGROUND_IMG = "https://assets.nflxext.com/ffe/siteui/vlv3/031c42b9-0c81-4db5-b980-0160765188e9/27f1b15d-79ed-43ca-8982-7faa9e4aa388/IN-en-20240819-TRIFECTA-perspective_WEB_3c576fa6-cd23-46b6-ac3f-1ad2bb0f66fb_small.jpg"; 

export const NOW_PLAYING_MOVIES_API = "https://api.themoviedb.org/3/movie/now_playing";
export const POPULAR_MOVIES_API = "https://api.themoviedb.org/3/movie/popular";
export const TOP_RATED_MOVIES_API = "https://api.themoviedb.org/3/movie/top_rated";
export const UPCOMING_MOVIES_API = "https://api.themoviedb.org/3/movie/upcoming";

const API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_TOKEN,
    }
  };

  export const POSTER_CDN_URL = "https://image.tmdb.org/t/p/w500";

  export const languageConstants = [
    {
      identifier : "en",
      name : "English"
    },
    {
      identifier : "hindi",
      name : "Hindi"
    },
    {
      identifier : "spanish",
      name : "Spanish"
    }
  ]

  export const OPENAI_KEY = process.env.REACT_APP_OPENAI_API_KEY;