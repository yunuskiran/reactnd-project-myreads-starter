import React from "react";
import defaultThumbnail from "../static/src/img/nocover.jpg";

function Book(props) {
  const { item, onUpdateShelf } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          {(
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  item.imageLinks != null && item.imageLinks.smallThumbnail
                    ? item.imageLinks.smallThumbnail
                    : defaultThumbnail
                })`,
              }}
            />
          )}
          <div className="book-shelf-changer">
            <select
              value={item.shelf}
              onChange={(event) => onUpdateShelf(item, event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{item.title}</div>
        {item.author &&
          item.authors.map((author, index) => (
            <div key={index} className="book-authors">
              {author}
            </div>
          ))}
      </div>
    </li>
  );
}

export default Book;