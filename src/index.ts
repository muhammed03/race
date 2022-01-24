import './app/router.ts';
import './app/styles/style.scss';

console.log(
    'TOTAL SCORE: 155 \n'+
    'Basic structure:\n' +
    '(+5) There should be two views on the site: "Garage" and "Winners".\n' +
    '(+5) "Garage" view should contain its name, page number, and the full amount of items in the database (how many car user has in his garage).\n' +
    '(+5) "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains).\n' +
    '(+10) View state should be saved when user switches from one view to another. For example, page number shouldn\'t be reset, input controls should contain that they contained before switching, etc.\n' +
    '"Garage" view:\n' +
    '(+15) User should be able to create, update, delete a car, and see the list of the cars. Car has only two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners".\n' +
    '(+10) User should be able to select any color from an RGB-Palete like here and see the picture of the car colored with the color selected and car\'s name.\n' +
    '(+5) Near the car\'s picture should be buttons to update its attributes or delete it.\n' +
    '(+10) There should be pagination on the "Garage" view (7 cars per one page).\n' +
    '(+10) There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.\n' +
    'Car animation:\n' +
    '(+5) Near the car\'s picture should be buttons for starting / stoping the car engine.\n' +
    '(+20) User clicks to the engine start button -> UI is waiting for car\'s velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.\n' +
    '(+5) User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it\'s initial place.\n' +
    '(+5) Start engine button should be disabled in case car is already in driving mode. As well as stop engine button should be disabled when car is on it\'s initial place.\n' +
    '(+15) Car animation should work fine on any screen (smallest screen size is 500px).\n' +
    'Race animation:\n' +
    '(+10) There should be a button to start race. After user clicks this button all the cars on the current page start driving.\n' +
    '(+10) There should be a button to reset race. After user clicks this button all the cars return to it\'s initial places.\n' +
    '(+10) After some car finishes first user should see the message contains car\'s name that shows which one has won.'
);