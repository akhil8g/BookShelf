import React from "react";

const WishlistPage = ({ wishlist, removeFromWishlist }) => {
  return (
    <div className="container">
      <h2>My Wishlist</h2>
      <div className="book-list">
        {wishlist.length === 0 ? (
          <p>No books in wishlist</p>
        ) : (
          wishlist.map((book) => (
              <div key={book.key} className="book">
                <div className="back">
                  <p className="book-info">
                    <strong>{book.title}</strong>
                    <br />
                    {book.author_name ? book.author_name.join(", ") : "Unknown"}
                    <br />
                  </p>
                  <button onClick={() => removeFromWishlist(book)} class="cta">
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

export default WishlistPage;
