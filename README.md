# SpACE IT!
Live Link: https://space-it.maman0022.vercel.app
  
## Summary  
This is the client side of my full-stack spaced repetition language learning app. This app presents users with a list of words in French. The score for each word and the total score is also presented on the dashboard.  

![main page](https://i.ibb.co/RDRF032/dashboard.png)  
  
Clicking on a button to start practicing takes the user to the learning page. The order in which the words are presented is based on the space repetition learning technique. If the user gets the word right, it is moved back double its current position. Else, the word is moved back 1 place. This continues indefinitely.  

![word page](https://i.ibb.co/Qd10DyZ/learning.png)  
  
## Tech Stack  
This is a React based app built using class components, with React Router handling navigation. This app was created with "create-react-app" node module so it contains all dependencies associated with that. Testing is done with cypress. The words are queued using a linked list implementation. The algorithm that facilitates the spaced repetition technique is an instance method of the linked list class.  
 
The back-end is hosted on Heroku and uses PostgreSQL as the persistence layer. More information on the back-end can be found here - https://github.com/maman0022/spaced-repetition-server.