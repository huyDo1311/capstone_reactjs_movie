import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  moviesSub: [],
  dataSearch: null,
};

const removeVietnameseTones = (str) =>
  str
    .normalize("NFD") // Decompose characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d") // Handle special 'đ'
    .replace(/Đ/g, "D");

const listMovieSlice = createSlice({
  name: "listMovieSlice",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      state.moviesSub = action.payload;
      console.log("Movies set:", state.movies);
    },
    onChangeToSearch: (state, action) => {
      state.dataSearch = action.payload;

      if (state.dataSearch) {
        let newDataSearch = removeVietnameseTones(
          state.dataSearch.toLowerCase()
        );

        let itemSearch = state.movies.filter((item) =>
          removeVietnameseTones(item.tenPhim.toLowerCase()).includes(
            newDataSearch
          )
        );

        state.movies = itemSearch;
      } else {
        console.log("cc");
        state.movies = state.moviesSub;
      }
    },
  },
});

export const { setMovies, onChangeToSearch } = listMovieSlice.actions;

export default listMovieSlice.reducer;
