import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import BookList from "./Components/BookList";
import SearchBook from "./Components/SearchBook";
import { PageNotFound } from "./Components/PageNotFound";
import debounce from "lodash.debounce";
class BooksApp extends Component {
  state = {
    books: {},
    loading: true,
    searchItems: [],
    q: "",
  };

  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      this.setState({
        books: result.reduce((book, curr) => {
          if (!book[curr.shelf]) book[curr.shelf] = []; //If this type wasn't previously stored
          book[curr.shelf].push(curr);
          return book;
        }, {}),
        loading: false,
      });
    });
  }

  updateShelf = (book, shelf) => {
    this.setState({
      loading: true,
    });
    BooksAPI.update(book, shelf).then((result) => {
      BooksAPI.getAll().then((result) => {
        this.setState({
          books: result.reduce((book, curr) => {
            if (!book[curr.shelf]) book[curr.shelf] = []; //If this type wasn't previously stored
            book[curr.shelf].push(curr);
            return book;
          }, {}),
          loading: false,
        });
        this.matchSearchAndMyBooks(this.state.searchItems);
      });
    });
  };

  searchData = (query) => {
    this.setState({
      loading: true,
      q: query,
    });

    if (!query || query === "") {
      this.setState({
        searchItems: [],
        loading: false,
      });
      return;
    }

    this.debounceSearch(query);
  };

  debounceSearch = debounce((query) => {
    BooksAPI.search(query).then((result) => {
      if (!result.error) {
        this.matchSearchAndMyBooks(result);
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          searchItems: [],
        });
      }
    });
  }, 500);

  matchSearchAndMyBooks = (searchResult) => {
    if (!searchResult) return;
    if (searchResult && searchResult.error) return;
    Object.keys(this.state.books).forEach((key) => {
      if (!this.state.books[key]) return;
      this.state.books[key].forEach((book) => {
        let found = searchResult.find(
          (searchItem) => searchItem.id === book.id
        );
        if (found) {
          found.shelf = book.shelf;
        }
      });
    });
    this.setState({ searchItems: searchResult });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={this.state.books}
              loading={this.state.loading}
              onUpdateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBook
              books={this.state.searchItems}
              onChangeSearchQuery={this.searchData}
              loading={this.state.loading}
              onUpdateShelf={(book, shelf) => this.updateShelf(book, shelf)}
              query={this.state.q}
            />
          )}
        />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default BooksApp;
