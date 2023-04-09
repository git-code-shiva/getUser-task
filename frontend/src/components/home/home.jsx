import axios from "axios";
import React, { useState } from "react";
import "./home.css";

const Home = () => {
  const [post, setPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [flag, setFlag] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:8081/all/${searchTerm}`)
      .then((response) => {
        //   console.log(response.data)
        setPost(response.data);
        console.log(post);
        setFlag(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="main_container">
        <h3>Search for People</h3>
        <div className="search_bar">
          <input
            type="text"
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button onClick={handleSearch}>search</button>
        </div>

        <div className="post_container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(post) && post.length ? (
                post.map((val, i) => (
                  <tr key={i}>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No result found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
