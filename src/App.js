import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieinfoComponent from "./components/Movieinfocomponent";

export const API_KEY = "358be9d3";

const Container = styled.div`
   display: flex;
   flex-direction: column;
`;
const Header= styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   background-color: black;
   color: white;
   align-items: center;
   padding: 10px;
   font-size: 25px;
   font-weight: bold;
   box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
`;
const MovieImage = styled.img`
   width: 48px;
   height: 48px;
   margin: 15px;
`;
const SearchBox = styled.div`
   display: flex;
   flex-direction: row;
   padding: 10px 10px;
   background-color: white;
   border-radius: 6px;
   margin-left: 20px;
   width: 50%;
   background-color: white;
   align-items: center;
`;
const SearchIcon = styled.img`
   width: 32px;
   height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movielist, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchdata =async(searchString)=>{
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
      
      updateMovieList(response.data.Search)
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchdata(event.target.value), 500);
    updateTimeoutId(timeout)
  };
  return (
    <Container>
      <Header><AppName>
        <MovieImage src="/movieicon.png" />
        MovieQuest
        </AppName>
        <SearchBox>
        <SearchIcon src= "/searchicon.png" />
        <SearchInput placeholder="Search Movie" 
        value = {searchQuery} 
        onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieinfoComponent 
      selectedMovie = {selectedMovie}
      onMovieSelect = {onMovieSelect}
      />
      }
      <MovieListContainer>
        {
          movielist?.length
          ?movielist.map((movie, index)=>(
          <MovieComponent key={index} 
          movie = {movie} 
          onMovieSelect= {onMovieSelect} 
          />
        ))
          : (<Placeholder src = "/movieicon.png" />
          )}
      </MovieListContainer>
      </Container>
  );
}

export default App;
