import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import CatalogLoader from "./Loader";

function BookList(props) {
  const { books, loading, onUpdateShelf } = props;
  const shelves = [
    { title: "Read", key: "read" },
    { title: "Want To Read", key: "wantToRead" },
    { title: "Currently Reading", key: "currentlyReading" },
  ];
  const renderResult = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CatalogLoader />
        </div>
      );
    } else {
      return (
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books &&
                  books.currentlyReading &&
                  books.currentlyReading.map((book) => (
                    <Book
                      key={book.id}
                      item={book}
                      onUpdateShelf={onUpdateShelf}
                    />
                  ))}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books &&
                  books.wantToRead &&
                  books.wantToRead.map((book) => (
                    <Book
                      key={book.id}
                      item={book}
                      onUpdateShelf={onUpdateShelf}
                    />
                  ))}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books &&
                  books.read &&
                  books.read.map((book) => (
                    <Book
                      key={book.id}
                      item={book}
                      onUpdateShelf={onUpdateShelf}
                    />
                  ))}
              </ol>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {renderResult()}
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

export default BookList;
