![Javascript](https://aleen42.github.io/badges/src/javascript.svg)
![Webpack](https://aleen42.github.io/badges/src/webpack.svg)
# Movie Search App
MovieSearch is a single page application that displays information about movies as requested by the user.
**OMDb RESTful API** is used to obtain information.

### Downloading
`git clone {repository URL}`
### Installing NPM modules
`npm install`
### Running application
Add your OMDb RESTful API key to `src/config.js.example` and rename the file to `config.js`

`cd movie-search`

`npm run dev`
### Descripti on of the task ([RSSchool](https://rs.school))
https://github.com/rolling-scopes-school/tasks/blob/master/tasks/movie-search.md

### Application structure
- Header
- Search area
- Slider with movie cards
- Footer

![demo](https://i.imgur.com/Udnuzvh.png)

### Demo

https://gabriellji-movie-search.netlify.app/

### Technology
- OMDb RESTful API
- [Glide Slider](https://glidejs.com)

### Description
* When the user opens the application, the page displays a search field and cards with information about films for an arbitrary specified by me query
* Search is carried out by the full title of the movie or by part of the title
* If the user enters a correct search query, for which the API returns the result, the information on the cards with films is updated
* the number of displayed cards adjusts to the page width
* Each card displays the following information about the movie: title, poster, release date, IMDb rating.
* When the end of the slider / swiper is reached, the next page of the search result from the API is loaded, if there is still data to load for this search query
