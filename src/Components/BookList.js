import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import CatalogLoader from "./Loader";

function BookList(props) {
  const { books, loading, onUpdateShelf } = props;
  const shelves = [
    { title: "Currently Reading", key: "currentlyReading" },
    { title: "Want To Read", key: "wantToRead" },
    { title: "Read", key: "read" },
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
          {shelves.map((item) => (
            <div key={item.key} className="bookshelf">
              <h2 className="bookshelf-title">{item.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books[item.key] &&
                    books[item.key].map((book) => (
                      <Book
                        key={book.id}
                        item={book}
                        onUpdateShelf={onUpdateShelf}
                      />
                    ))}
                </ol>
              </div>
            </div>
          ))}
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
