import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import WishlistPage from "./components/WishlistPage";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader"; // Import the loader component
import "./styles.css";
import MyBooks from "./components/MyBooks";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    // Fetch initial book list and wishlist data
    const fetchInitialData = async () => {
      try {
        const booksResponse = await axios.get("https://book-shelf-server-theta.vercel.app/api/v1/bookRoutes/readBook"); // change route here
        setMyBooks(booksResponse.data.data);

        const wishlistResponse = await axios.get("https://book-shelf-server-theta.vercel.app/api/v1/bookRoutes/readWishlist"); // change route here
        setWishlist(wishlistResponse.data.data);
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const searchBooks = async () => {
    if (query.trim() === "") return;
    setLoading(true); // Start loading
    try {
      
      const response = await axios.get(`https://book-shelf-server-theta.vercel.app/api/v1/bookRoutes/readSpecificBook/${query}`);// for books with the user

      
      setBooks(response.data.data)

      
    } catch (error) {
      console.error("Error fetching data from Open Library API", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const searchExternalBooks = async() => {
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
  

  const addToWishlist = async (book) => {
    try {
      // Check if the book is already in the wishlist
      if (!wishlist.find((item) => item.key === book.key)) {
        // Extract the relevant data in the desired format
        const bookData = {
          bookId: book._id
        };
  
        // Send a POST request to your API and get the response
        const response = await axios.post("https://book-shelf-server-theta.vercel.app/api/v1/bookRoutes/addToWishlist", bookData);
        
        // Assuming the response contains the inserted _id
        // const bookWithId = { ...bookData, _id: response.data.data };
  
        // Update the wishlist state with the new book that includes the _id
        setWishlist([...wishlist, response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const addToMyBooks = async (book) => {
    try {
      // Check if the book is already in myBooks
      if (!myBooks.find((item) => item.key === book.key)) {
        // Extract the relevant data in the desired format
        const bookData = {
          key: book.key,
          title: book.title,
          author_name: book.author_name,
          cover_i: book.cover_i,
        };
  
        // Send a POST request to your API and get the response
        const response = await axios.post("https://book-shelf-server-theta.vercel.app/api/v1/bookRoutes/createBook", bookData);
        
        // Assuming the response contains the inserted _id
        const bookWithId = { ...bookData, _id: response.data.data };
  
        // Update the myBooks state with the new book that includes the _id
        setMyBooks([...myBooks, bookWithId]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const removeFromWishlist = async (book) => {
    try {
      setWishlist(wishlist.filter((item) => item._id !== book._id));
      await axios.delete(`https://book-shelf-server-theta.vercel.app/api/v1/bookRoutes/removeWishlist/${book._id}`); // Adjusted delete request to include the _id
    } catch (error) {
      console.log(error);
    }
  };
  
  const removeFromMyBooks = async (book) => {
    try {
      
      await axios.delete(`https://book-shelf-server-theta.vercel.app/api/v1/bookRoutes/deleteBook/${book._id}`); // Adjusted delete request to include the _id
      setWishlist(wishlist.filter((item) => item._id !== book._id));

      setMyBooks(myBooks.filter((item) => item._id !== book._id));
      searchBooks()
       
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router basename="/BookShelf">
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Book Shelf</h1>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by title, author, or ISBN"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button className="button" onClick={searchBooks}>
                  Search Books Shelf
                </button>
                <button className="button" onClick={searchExternalBooks}>
                  Search External
                </button>
                {loading ? (
                  <div className="loadingscreen">
                    <Loader />
                  </div>
                ) : (
                  // Show loader if loading is true
                  <BookList
                  
                    
                    books={books}
                    addToWishlist={addToWishlist}
                    addToMyBooks={addToMyBooks}
                  />
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

          <Route
            path="/myBooks"
            element={
              <MyBooks
              
                myBooks={myBooks}
                removeFromMyBooks={removeFromMyBooks}
                addToWishlist={addToWishlist}

              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
