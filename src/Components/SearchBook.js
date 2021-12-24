import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import CatalogLoader from "./Loader";
import { NotFound } from "./NotFound";

class SearchBook extends Component {
  render() {
    const {
      onChangeSearchQuery,
      books,
      onUpdateShelf,
      loading,
      query,
    } = this.props;
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
        return books && (books.length === 0 || books.error) ? (
          <div className="search-books-results">
            <NotFound />
          </div>
        ) : (
          <div className="search-books-results">
            <ol className="books-grid">
              {books &&
                books.length > 0 &&
                books.map((book) => (
                  <Book
                    key={book.id}
                    item={book}
                    onUpdateShelf={onUpdateShelf}
                  />
                ))}
            </ol>
          </div>
        );
      }
    };

    return (
      <div>
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              className="search-books-results"
              type="text"
              placeholder="Search books.."
              onChange={(event) => onChangeSearchQuery(event.target.value)}
              value={query}
            />
          </div>
        </div>
        {renderResult()}
      </div>
    );
  }
}

export default SearchBook;
