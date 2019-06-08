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

- `/api/shelters` returns array of objects, each object has shelter name `location`, and shelter string `dataLocation`, which is used in API below,
- `/api/shelters/[dataLocation]` returns object with dogs from certain shelter. Additional queries available,
- `/api/dogs` returns object with all dogs in database. Additional queries available,
- `/api/dogs/:id` returns one object (dog) of certain ID,
- `/api/random` - returns random results from all database, 5 by default, use `?count=x` to return `x` results instead

## Additional queries

`/api/shelters/[dataLocation]` and `/api/dogs` returns object paginated results of search query. API returns first page, 10 results for page by default. Use following parameters to narrow/adjust search results:
- `limit` - set limit of results per page (10 by default),
- `page` - return certain page (1 by default),
- `name` - pass dog name, or part of dog name to narrow results (case insensitive);

Pass optional parameters like this: `/api/shelters/lodz?name=pa&page=2&limit=5`, parameters can be passed in diffrent order, 1, 2, 3 parameters can be passed.

##Structure of response object

 Structure of object include:
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
