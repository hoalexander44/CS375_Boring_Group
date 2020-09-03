# CS375_Boring_Group
CS375 Final project

WHAT YOU NEED
  1. you will need postgres installed to properly run our system
  
  
STARTING THE SERVER
  1. cd into app/api
  2. run npm install to install all the required packages
  3. locate .env
  4. change "PGPASSWORD=postgres" to your postgres password
  5. If your local postgres port is not at 5432, change PGPORT=5432 accordingly as well 
  6. now open a console
  7. run npm start
  8. You will be prompted to enter your postgres password
  9. enter your password
  10. the needed postgres tables should be generated for you
  11. The server will now have started.
  
  
STARTING THE CLIENT
  1. cd into app/client
  2. run npm install to install all the required packages
  3. The server that you ran should be on localhost:3001 and the configurations for client is already set to that host and port
  4. If for whatever reason you changed the server port, make sure to change the .env file in app/client as well to match
      As well as the config.js file in app/client/src
  5. Open a command console
  6. run npm start
  7. If a new tab in your default browser does not pop up, then open your browser and go to localhost:3000 to see the react app
  
  
 
