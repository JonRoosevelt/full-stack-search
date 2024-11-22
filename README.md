# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
cd packages/api
```

And run the `api` server with

```
npm run dev
```

The API should start at <http://localhost:3001>

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
cd ./packages/client
```

And run the `client` with

```
npm run start
```

The UI should start at <http://localhost:3000>

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution.
Feel free to modify the current codebase as needed, including adding or removing dependencies.
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

## api

- Performance
  I was considering using an aggregation for the Accommodation call to mongo, so I could do a all-at-once kind of call to database. The problem is that aggregations add some overhead, requires field lookups to make "joins" between different collections, and should only be used for very complex queries. It also adds some complexity for the maintenance of the code.

I decided to only the combination of find with "$or", which can help us make less calls to the database.

- organization
  I've decided to use a simple architecture based on folders, for each domain, and sub-categorise them between "routers", "controllers", and "services".
  - routers
    - A router here, is basically a definition of the uri and possible parameters for the specific endpoints of the domain.
    - It calls the controller, and it's called by the app.ts which is where we use all the domain's routers
  - controllers
    - The controller is responsible for orchestrating any calls to service or possible validations and returning the possible responses for that endpoint.
  - services
    - Is where logic will be likely be placed at. In this case we mainly used it to call mongoDb.

I've also decided to put anything related to the db in the db folder, including the mongoDb client we are using in each controller

- Improvements:
  - Would write unit tests for each router, controller and service
  - Put some validations in the endpoints
  - possibly add a distributed cache mechanism, since some data don't change the often
  - add more logs

## client

- Performance
  To increase the performance of the frontend, I created a custom hook called `useAccommodations`, for the search.
  Inside of it I used a combination of:
  - react-query (tanstack-query), so it can add some caching to calls that are made more then once
  - A debounce mechanism that relies on the typing of the user, which waits one second after the user has typed to do the call to the backend.
  - A clear timeout so any calls to the backend are cancelled if the user clears the input or types more, before the 1 second finishes.
  - A clear timeout if the user refreshes the page so we cancel any pending calls to the api.

All the other queries to the backend were also done using tanstack so we can save calls with its caching mechanism and reduce unwanted useEffects.

Another important thing added, was the possibility of passing the state from search page to the other pages, so you don't need to do a second call to the backend, if you're coming from the search page.

So, either you use the already fetched data from search page to render the details page, or, if you come directly to the link, without passing through the search page, it looks at the id and then calls the backend for the specific data.

- Improvements
  - add tests
  - improve ui
  - add Error, NotFound pages

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
