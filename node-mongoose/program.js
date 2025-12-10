// program.js
const connect = require("./db");
const { ObjectId } = require("mongodb"); // needed for delete by specific comment _id

const runDatabaseQueries = async () => {
  const db = await connect();
  if (!db) {
    console.error("Failed to get DB instance");
    process.exit(1);
  }

  const movies = db.collection("movies");
  const users = db.collection("users");
  const comments = db.collection("comments");

  try {
//CREATE
    console.log("\n=== CREATE ===");

    // 1. Insert a New Document into the Users Collection
    const newUser = {
      name: "Test User",
      email: "test.user@example.com",
    };

    try {
      const insertUserResult = await users.insertOne(newUser);
      console.log("Inserted user with _id:", insertUserResult.insertedId);
    } catch (err) {
      if (err.code === 11000) {
        console.log(
          'User with email "test.user@example.com" already exists. Skipping insert.'
        );
      } else {
        throw err;
      }
    }

    // STEP 2: READ documents from movies collection
    console.log("\n=== READ ===");

    // 1. Find all movies directed by Christopher Nolan.
    const nolanMovies = await movies
      .find({ directors: "Christopher Nolan" })
      .project({ title: 1, year: 1, directors: 1, _id: 0 })
      .toArray();
    console.log("\n1) Movies directed by Christopher Nolan:");
    console.log(nolanMovies);

    // 2. Find movies that include the genre "Action" and sort (descending) by year.
    const actionMovies = await movies
      .find({ genres: "Action" })
      .project({ title: 1, year: 1, genres: 1, _id: 0 })
      .sort({ year: -1 })
      .limit(10)
      .toArray();
    console.log("\n2) Action movies sorted by year (desc, showing first 10):");
    console.log(actionMovies);

    // 3. Find movies with an IMDb rating greater than 8 and return only the title and IMDB information.
    const highlyRated = await movies
      .find({ "imdb.rating": { $gt: 8 } })
      .project({ title: 1, imdb: 1, _id: 0 })
      .limit(10)
      .toArray();

    console.log("\n3) Movies with IMDb rating > 8 (first 10):");
    console.log(highlyRated);

    // 4. Find movies that starred both "Tom Hanks" and "Tim Allen".
    const hanksAndAllen = await movies
      .find({ cast: { $all: ["Tom Hanks", "Tim Allen"] } })
      .project({ title: 1, year: 1, cast: 1, _id: 0 })
      .toArray();
    console.log('\n4) Movies starring both "Tom Hanks" and "Tim Allen":');
    console.log(hanksAndAllen);

    // 5. Find movies that starred both and only "Tom Hanks" and "Tim Allen".
    const onlyHanksAndAllen = await movies
      .find({
        cast: {
          $all: ["Tom Hanks", "Tim Allen"],
          $size: 2,
        },
      })
      .project({ title: 1, year: 1, cast: 1, _id: 0 })
      .toArray();
    console.log('\n5) Movies starring ONLY "Tom Hanks" and "Tim Allen":');
    console.log(onlyHanksAndAllen);

    // 6. Find comedy movies that are directed by Steven Spielberg.
    const spielbergComedies = await movies
      .find({
        genres: "Comedy",
        directors: "Steven Spielberg",
      })
      .project({ title: 1, year: 1, directors: 1, genres: 1, _id: 0 })
      .toArray();
    console.log('\n6) Comedy movies directed by Steven Spielberg:');
    console.log(spielbergComedies);
//Update
    console.log("\n=== UPDATE ===");

    // 1. Add a new field "available_on" with the value "Sflix" to "The Matrix".
    const addAvailableOnResult = await movies.updateOne(
      { title: "The Matrix" },
      { $set: { available_on: "Sflix" } }
    );
    console.log(
      '\n1) Added "available_on: Sflix" to The Matrix:',
      addAvailableOnResult.modifiedCount,
      "document(s) modified"
    );

    // 2. Increment the metacritic of "The Matrix" by 1.
    const incMetacriticResult = await movies.updateOne(
      { title: "The Matrix" },
      { $inc: { metacritic: 1 } }
    );
    console.log(
      '\n2) Incremented "metacritic" for The Matrix:',
      incMetacriticResult.modifiedCount,
      "document(s) modified"
    );

    // 3. Add a new genre "Gen Z" to all movies released in the year 1997.
    const addGenZResult = await movies.updateMany(
      { year: 1997 },
      { $addToSet: { genres: "Gen Z" } }
    );
    console.log(
      '\n3) Added "Gen Z" genre to movies from 1997:',
      addGenZResult.modifiedCount,
      "document(s) modified"
    );

    // 4. Increase IMDb rating by 1 for all movies with a rating less than 5.
    const bumpLowRatingsResult = await movies.updateMany(
      { "imdb.rating": { $lt: 5 } },
      { $inc: { "imdb.rating": 1 } }
    );
    console.log(
      "\n4) Increased IMDb rating by 1 for movies with rating < 5:",
      bumpLowRatingsResult.modifiedCount,
      "document(s) modified"
    );

 //DELTE
    console.log("\n=== DELETE ===");

    // 1. Delete a comment with a specific ID.
    const someCommentId = "66f000000000000000000000"; // TODO: change this to a real ObjectId
    try {
      const deleteSpecificCommentResult = await comments.deleteOne({
        _id: new ObjectId(someCommentId),
      });
      console.log(
        "\n1) Delete comment with specific _id:",
        deleteSpecificCommentResult.deletedCount,
        "document(s) deleted"
      );
    } catch (err) {
      console.log(
        "\n1) Skipped delete-one-by-id (check your ObjectId string):",
        err.message
      );
    }

    // 2. Delete all comments made for "The Matrix".
    const matrixDoc = await movies.findOne({ title: "The Matrix" });
    if (matrixDoc) {
      const deleteMatrixCommentsResult = await comments.deleteMany({
        movie_id: matrixDoc._id,
      });
      console.log(
        '\n2) Deleted comments for "The Matrix":',
        deleteMatrixCommentsResult.deletedCount,
        "document(s) deleted"
      );
    } else {
      console.log('\n2) Could not find "The Matrix" movie document.');
    }

    // 3. Delete all movies that do not have any genres.
    const deleteNoGenreMoviesResult = await movies.deleteMany({
      $or: [{ genres: { $exists: false } }, { genres: { $size: 0 } }],
    });
    console.log(
      "\n3) Deleted movies with no genres:",
      deleteNoGenreMoviesResult.deletedCount,
      "document(s) deleted"
    );

//Also Aggregation 
    console.log("\n=== AGGREGATE ===");

    // 1. Aggregate movies to count how many were released each year
    const moviesPerYear = await movies
      .aggregate([
        {
          $group: {
            _id: "$year",
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } }, // earliest year to latest
      ])
      .toArray();
    console.log("\n1) Number of movies released per year (sorted by year):");
    console.log(moviesPerYear);

    // 2. Average IMDb rating for movies grouped by director
    const avgRatingByDirector = await movies
      .aggregate([
        {
          $match: {
            "imdb.rating": { $type: "number" },
            directors: { $exists: true, $ne: [] },
          },
        },
        { $unwind: "$directors" },
        {
          $group: {
            _id: "$directors",
            avgRating: { $avg: "$imdb.rating" },
            movieCount: { $sum: 1 },
          },
        },
        { $sort: { avgRating: -1 } },
        { $limit: 20 },
      ])
      .toArray();
    console.log(
      "\n2) Average IMDb rating by director (top 20, highest to lowest):"
    );
    console.log(avgRatingByDirector);

    console.log("\nAll tasks completed.");
  } catch (err) {
    console.error("Error while running queries:", err);
  } finally {
    process.exit(0);
  }
};

runDatabaseQueries();
