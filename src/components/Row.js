import React, { useState, useEffect } from "react";
import axios from "./../axios";
import "./../Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // snippet of code which runs based on a specific condition/variable
  // when row loads, make a GET request to TMDB
  useEffect(() => {
    // run once when the row loads
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // attempt to get the year the movie was released, so we can
  // pass it in as an arg into movieTrailer() in order to get
  // better trailer matching validity.
  const movieYear = (movie) => {
    let movieYear = "";
    if (movie.first_air_date || movie.release_date) {
      movieYear = parseInt(
        (movie?.first_air_date || movie?.release_date).split("-")[0],
        10
      );
    }
    //console.log("movieYear(movie) = ", movieYear);
    console.log("movie", movie);
    return movieYear;
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // naming is not the same in all genre, so check for name, title, or original title
      // use the first_air_date as a param and get the year string from it
      movieTrailer(
        movie?.name || movie?.title || movie?.original_title || "",
        movieYear(movie)
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__poster_lg"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
