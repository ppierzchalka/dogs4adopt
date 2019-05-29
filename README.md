## Intro

This NodeJS app scrapes data from animal shelters in Poland and serves this data as API. The goal is to provide as much information as possible to people who wants to adopt a dog.

## Installation & Running

- Clone this repo
- provide link to your mongodb database in `db/mongoose.js`
- uncomment proper command in app.js to scrape data to your database (please run this one time and then comment out again)
- Run with `npm run start` command
- visit `localhost:3000` to see the app use paths below to read data from DB

## API

This app has api feature, api routes are listed below:

- `/api/all` gets all dogs from database, returns array of dogs if no parameters were provided, optional parameters:
  - limit - to limit how many dogs display per page,
  - page - to display page by given number,
  - example: `/api/all?limit=5&page=15`
- `/api/shelterNames` - displays list of objects with shelters data, each object includes:
  - `location` - string with full name of certain sheter,
  - `dataLocation` - string which can be used to find dogs from certain shelter in path below 
- `/api/shelter/[dataLocation]` gets dogs from certain shelter, get dataLocation values from previous path, optional parameters:
  - limit - to limit how many dogs display per page,
  - page - to display page by given number,
  - example: `/api/shelter/lodz?limit=5&page=15`
- `/api/id/[id]` returns certain dog searched by it's `id`
- `/api/name/[name]` searches dogs by `name`, or part of it, returns array of dogs if no parameters were provided, optional parameters:
  - limit - to limit how many dogs display per page,
  - page - to display page by given number,
  - example: `/api/name/burek?limit=5&page=15`
- `/api/random/[x]` returns `x` random dogs

## Optional parameters

If both optional parameters are provided (only one parameter won't work), object is returned instead of array. Structure of object include:
- `docs` - actual array of results,
- `totalDocs` - number of results,
- `limit` - limiter provided in parameter (indicates how many documents are on single page),
- `hasPrevPage` - boolean, indicates is there a previous page,
- `hasNextPage` - boolean, indicates is there a next page,
- `totalPages` - number of all pages within given query
- `pagingCounter` - number of first of item on page requested within given query,
- `prevPage` - number of previous page,
- `nextPage` - number of next page

## Features to implement

- Add more shelters

## Contributing

Feel free to help!
Please read [[Contribute](CONTRIBUTING.md)] first!

## Demo

[[Demo on heroku](http://dogs4dopt.herokuapp.com)] (might take some time to run at first visit, this version is limited)

## Important Notes!
- Please do not abuse this application as currently it uses other page resources (dog images)
- If you feel that this app harms you in any way please contact me @ [przemekpierzchalka@gmail.com(mailto:przemekpierzchalka@gmail.com)]
