/** Common config for bookstore. */


// let DB_URI = `postgresql://`;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = `${DB_URI}/books-test`;
// } else {
//   DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
// }


// module.exports = { DB_URI };

/** Common config for bookstore. */

const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///books-test"   // local socket to DB named books-test
    : process.env.DATABASE_URL || "postgresql:///books"; // local socket to DB named books

module.exports = { DB_URI };
