const express = require('express');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');

// handle both export styles of express-graphql, depending on version
const graphqlHTTP =
  require('express-graphql').graphqlHTTP || require('express-graphql');

const app = express();

// in-memory store
let events = [];

// middleware to parse JSON bodies
app.use(bodyParser.json());

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type Query {
        events: [Event!]!
      }

      type Mutation {
        createEvent(eventInput: EventInput): Event!
      }
    `),

    rootValue: {
      // GET all events
      events: () => {
        return events;
      },

      // CREATE a new event
      createEvent: ({ eventInput }) => {
        const event = {
          _id: Math.random().toString(),
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date(eventInput.date).toISOString()
        };

        events.push(event);
        return event;
      }
    },

    graphiql: true
  })
);

// basic test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
