import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Cards from "../components/Cards";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    

    useEffect(() => {
        fetchMovies();
    },[]);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axios(`http://localhost:4000/api/movies?searchText=${searchText}`);
            setLoading(false);
            setMovies(response.data);
            setError(null);
        }
        catch (e) {
            setLoading(false);
            setError(`Server Error: ${e.message} ${e.stack}`);
        }
    }

    

    return (
        <>
            <SearchBar onClickRefresh={fetchMovies} setSearchText={setSearchText} />
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ?
                <Loader />
                : <div className="d-flex flex-wrap justify-content-start">
                    {movies.map(movie => {
                        
                      
                        return (
                           <Cards movie={movie}/>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Home;