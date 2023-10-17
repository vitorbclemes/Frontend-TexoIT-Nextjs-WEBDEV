"use client";

import MovieTable from "@/util/Table/MovieTable";
import { useTable } from "@/util/tableContext";
import { useEffect, useState, React } from "react";
import styles from './list.module.css';

export default function List() {
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedYear, isWinner } = useTable();
  const moviesPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      let page = 0;
      let hasMoreData = true;
      const baseUrl = 'https://tools.texoit.com/backend-java/api/movies';
      let accumulatedData = [];

      try {
        while (hasMoreData) {
          const response = await fetch(`${baseUrl}?page=${page}&size=99&winner=${isWinner}&year=${selectedYear}`);
          const data = await response.json();

          if (data && data.content && data.content.length > 0) {
            const mappedData = data.content.map((movie) => ({
              id: movie.id,
              year: movie.year,
              title: movie.title,
              winner: movie.winner ? "Yes" : "No"
            }));

            accumulatedData = [...accumulatedData, ...mappedData];
            page++;
          } else {
            hasMoreData = false;
          }
        }

        setAllMovies(accumulatedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, isWinner]);

  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const moviesForCurrentPage = allMovies.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>List movies</h3>
          {moviesForCurrentPage.length > 0 ? (
            <>
            <MovieTable
              data={moviesForCurrentPage}
              columns={['ID', 'Year', 'Title', 'Winner?']}
              fullPage={true}
              questions={true}
              />
            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1} style={{marginRight:'10px'}}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{marginLeft:'10px'}}>Next</button>
            </div>
            </>
          ) : (
            <p>No movies found for the current page.</p>
          )}

        </>
      )}
    </div>
  );
}
