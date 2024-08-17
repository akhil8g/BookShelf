import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import WishlistPage from "./components/WishlistPage";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader"; // Import the loader component
import "./styles.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading

 



  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const searchBooks = async () => {
    if (query.trim() === "") return;
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching data from Open Library API", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const addToWishlist = (book) => {
    if (!wishlist.find((item) => item.key === book.key)) {
      setWishlist([...wishlist, book]);
    }
  };

  const removeFromWishlist = (book) => {
    setWishlist(wishlist.filter((item) => item.key !== book.key));
  };

  const handleKeyPress = (e) => {
    if( e.key === "Enter") {searchBooks();}
      
    
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Book Finder</h1>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by title, author, or ISBN"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button className="button" onClick={searchBooks}>
                  Search
                </button>
                {loading ? (
                  <div className="loadingscreen"><Loader /></div>
                   // Show loader if loading is true
                ) : (
                  <BookList books={books} addToWishlist={addToWishlist} />
                )}
              </>
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
