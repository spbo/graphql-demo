### Overview of Application
With this application, a user have the ability to check the weather in any city of the world he types.

### Utilize a public GraphQL API
For this project, the [graphql-weather-api](https://github.com/konstantinmuenster/graphql-weather-api) library is used which is a public GraphQL Wrapper for the [Open Weather Map API](https://openweathermap.org/api). Also, only the `getCityByName` query provided by this library is used.

### How to install & run
First of all, for running this project locally, you have to clone and install [graphql-weather-api](https://github.com/konstantinmuenster/graphql-weather-api) library and then, as mentioned in the project's GitHub page, in the project directory create an `.env` file and add the following variable: `KEY=3f7e0822f507178aa8875dca305653a3`. (I have already register in openweathermap.org and get the aforementioned key)

In the project directory of `graphql-weather-api`, you can run:
```sh
npm install or yarn install
npm run or yarn start
```
The server starts at http://localhost:4000/ .

Then, in the project directory of `graphql-demo`, you can run:
```sh
npm install or yarn install
npm run or yarn start
```
The server starts at http://localhost:3000/ .

### Logic description
Project is made up of two components: `App` and `DisplayData`.

`App` - Main component which is responsible for fetching weather info with the help of apollo library. When user types a city name and click the button, an async call to "https://api.openweathermap.org/data/2.5/weather?appid=${process.env.KEY}" API is made. It also retrieves/ saves the user inputs in local storage.

`DisplayData`- Component responsible only for rendering fetched data.

### Regarding styling
A responsive design is performed when "max-width" is 800px.

### Technical description
This project was created with Create React App.

Additional libraries which have been used are:

- graphql
- @apollo/client
- @material-ui/core
- sass  (for styling)

Application was developed in OS Windows 10 and Visual Studio Code and tested in:

- Mozilla Firefox version 93.0
- Google Chrome version 95.0.4638.54
- Microsoft Edge version 94.0.992.50
