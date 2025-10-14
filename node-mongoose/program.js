const connect = require("./db");


const runDatabaseQueries = async () => {
  
  const db = await connect();
  const movies = db.collection('movies');


  // Run this query, should get top 5 best rated movies on IMDB
  // const topMovies = await movies.find({ "imdb.rating": { $gt: 8.0 } })
  //   .project({ title: 1, year: 1, "imdb.rating": 1 })
  //   .sort({ "imdb.rating": -1 })
  //   .limit(5)
  //   .toArray();

  // console.log('Top Rated Movies:', topMovies);


  // //insert queries here to test them
  //  const lucasMovies = await movies.find({ "directors": "George Lucas" }).toArray();
  //  console.log("George Lucas movies", lucasMovies);

// ### Read

// 1. Find all movies directed by Christopher Nolan.
// // Nolan movies: show title, year, IMDb rating; newest first
// const nolanMovies = await movies
//   .find({ directors: "Christopher Nolan" })
//   .project({ _id: 0, title: 1, year: 1, "imdb.rating": 1 })
//   .sort({ year: -1 })
//   .toArray();

// console.log(`Christopher Nolan movies (${nolanMovies.length}):`, nolanMovies);

// 2. Find movies that include the genre "Action" and sort (descending) them by year.

// const actionMovies = await movies
//   .find({ genres: "Action" })
//   .project({ _id: 0, title: 1, year: 1 })
//   .sort({ year: -1 })
//   .toArray();

// console.log(`Action movies (${actionMovies.length}):`, actionMovies);
// //

  // // 3. Find movies with an IMDb rating greater than 8 and return only the title and IMDB information.
  // const highRatedMovies = await movies
  //   .find({ "imdb.rating": { $gt: 8 } })
  //   .project({ _id: 0, title: 1, imdb: 1 })
  //   .toArray();

  // console.log(`Movies with IMDb rating > 8 (${highRatedMovies.length}):`, highRatedMovies);
  
// 4. Find movies that starred both "Tom Hanks" and "Tim Allen"
// const hanksAllenMovies = await movies
// Find({ cast: { $all: ["Tom Hanks", "Tim Allen"] } })
// .project({ _id: 0, title: 1, cast: 1 })
// .toArray();

// console.log(`Movies starring both Tom Hanks and Tim Allen (${hanksAllenMovies.length}):`, hanksAllenMovies);


  process.exit(0);
};


runDatabaseQueries();