# Satellite Coordination System
Satellite coordination system that allows scientists to analyze active satellites.
The system provides the ability to search by satellite name and has two types of filters: 
- A date filter that allows to select a utc date and show only satellites launched after that.
- A checkbox (switch) that allows to see only successful launches.}

The system shows the information in a table including the following information:
- Name
- UTC date
- Patch
- If the satellite was successful or not
- A more information button.
This last information button opens a modal that shows additional information about the selected satellite such as the ID, the failure reason -if there is one-, details, the local date, a webcast, an article, the wikipedia page and the reddit. Not every satellite has all the information, some of them do not have details or article, etc.

# Using the project
To install project dependencies: npm install
To start the project: npm start
To run test suite: npm run test
