import React from "react";
import "./BookList.css"; // Import the CSS file

const BookList = ({
  searchExternalBooks,
  localSearch,
  books,
  addToWishlist,
  addToMyBooks,
}) => {
  const handleAddBook = async (book) => {
    addToWishlist(book);
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.key} className="book">
          <div className="back">
            <p className="book-info">
              <strong>{book.title}</strong>
              <br />
              {book.author_name ? book.author_name.join(", ") : "Unknown"}
              <br />
            </p>

            {book._id ? (
              <button onClick={() => handleAddBook(book)} className="cta">
                <span>Add to Wishlist</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            ) : (
              <button onClick={() => addToMyBooks(book)} className="cta">
                <span>Add to Mybooks</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            )}
          </div>

          <div className="cover">
            <div className="front">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
                onError={(e) => (e.target.style.display = "none")}
                className="book-cover"
                style={{ height: "110%", width: "auto" }}
              />
              <p style={{ color: "white" }} className="book-title">
                {book.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
