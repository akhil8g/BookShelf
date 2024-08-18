import React from "react";

const MyBooks = ({myBooks, removeFromMyBooks,addToWishlist}) => {
  return (
    <div className="container">
      <h2>Book Shelf</h2>
      <div className="book-list">
        {myBooks.length === 0 ? (
          <p>No books in your shelf..</p>
        ) : (
          myBooks.map((book) => (
              <div key={book.key} className="book">
                <div className="back">
                  <p className="book-info">
                    <strong>{book.title}</strong>
                    <br />
                    {book.author_name ? book.author_name.join(", ") : "Unknown"}
                    <br />
                  </p>
                  <button onClick={() => addToWishlist(book)} class="cta">
              <span>Add to Wishlist</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
                  <button onClick={() => removeFromMyBooks(book)} class="cta">
                    <span>Remove</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
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
            
          ))
        )}
      </div>
    </div>
  );
};

export default MyBooks;
