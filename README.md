# MyReads Project
I created this website as a project for React Nanodegree for Udacity. This website allows the user to keep track of books that have been read, are currently being read, or that he or she would like to read. Also users can search books and than add, remove or update your shelf.

### Prerequisites

[Git](https://git-scm.com/)
[Npm](https://www.npmjs.com/)

### Installing
1. Open terminal clone the project using `https://github.com/yunuskiran/reactnd-project-myreads-starter.git`
2. Navigate to project directory
3. Run the command `npm install` for necessary dependencies
4. Run the command `npm start` to start the server.

### How I made this app
I forked starter project from [Udacity Myreads Starter Project] `udacity/reactnd-project-myreads-starter`. I use Udacity's [BooksAPI.js](https://github.com/udacity/reactnd-project-myreads-starter/tree/master/src/booksAPI.js) which allows me to retrieve data from a mock server. I wrote the code that fetches the array of books from the Udacity server, then maps over the array to display each book on the appropriate shelf according to its 'shelf' key. Each book has a 'select' tag that allows for switching shelves, or removing the book altogether. Once I got this functionality working, I added a component to search for books to add to the shelf. This component dynamically searches the server for books whose titles match the inputted query as it is entered. I used [React Router](https://github.com/ReactTraining/react-router) to sync the URL with the app's state so that the back button and bookmark browser features still work.

## Author
* **Yunus KIRAN** [GitHub](https://github.com/yunuskiran)

