import {useEffect, useState, React}  from "react";
import styles from './dashboard.module.css'
import MovieTable from "@/util/Table/MovieTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Dash(){
    const [isLoading,setIsLoading] = useState(true)
    const [listYears,setListYears] = useState();
    const [studios,setStudios] = useState();
    const [producers,setProducers] = useState();

    const [selectedYear,setSelectedYear] = useState('');
    const [searchByYear,setSearchByYear] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{

            const baseUrl = 'https://tools.texoit.com/backend-java/api/movies';
            // Fetching list of years
            const listOfYearsFromApiResponse = await fetch(`https://tools.texoit.com/backend-java/api/movies?projection=years-with-multiple-winners`);
            const listOfYearsData = await listOfYearsFromApiResponse.json();
            setListYears(listOfYearsData.years);
            // Fetching top 3 studios
            const studiosFromApiResponse = await fetch(`${baseUrl}?projection=studios-with-win-count`);
            const studiosData = await studiosFromApiResponse.json();
            setStudios(studiosData.studios);
            // Fetching producers
            const producersFromApiResponse = await fetch(`${baseUrl}?projection=max-min-win-interval-for-producers`);
            const producersData = await producersFromApiResponse.json();
            setProducers(producersData);
            setIsLoading(false);
            } catch(error) {
                console.error(error)
            }
        }
        fetchData();
    }, []);

    async function handleSearch(){
        try {
            const baseUrl = 'https://tools.texoit.com/backend-java/api/movies';
            const searchedMovieResponse = await fetch(`${baseUrl}?winner=true&year=${selectedYear}`);
            let searchedMovieData = await searchedMovieResponse.json();
            searchedMovieData = searchedMovieData.map((movie)=> [movie.id,movie.year,movie.title]);
            setSearchByYear(searchedMovieData);
        } catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.container}>
                    <div className={styles.flexColumn}>
                        <div className={styles.flexRow}>
                            <div className={styles.movieTableContainer}>
                                <h3>List years with multiple winners</h3>
                                {listYears && <MovieTable data={listYears} columns={['Year','Win Count']} />}
                            </div>
                            <div className={styles.movieTableContainer}>
                                <h3>Top 3 Studios with winners</h3>
                                {studios && <MovieTable data={studios} columns={['Name','Win Count']} />}
                            </div>
                        </div>
                        <div className={styles.flexRow}>
                            <div className={styles.movieTableContainer}>
                                <h3 style={{ marginBottom: '8px' }}>Producers with longest and shortest interval between wins</h3>
                                <div>
                                    <span style={{ fontSize: '18px' }}>Maximum</span>
                                    {producers && <MovieTable data={producers.max} columns={['Producer','Interval','Previous Year','Following Year']} />}
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ fontSize: '18px' }}>Minimum</span>
                                    <MovieTable data={producers.min} columns={['Producer','Interval','Previous Year','Following Year']} />
                                </div>
                            </div>
                            <div className={styles.movieTableContainer}>
                                <div className={styles.flexColumn}>
                                    <h3>List movie winners by year</h3>
                                    <div className={styles.inputContainer}>
                                        <input className={styles.input} type="number" placeholder="Search by year" value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)} />
                                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={handleSearch}/>
                                    </div>
                                    {searchByYear && <MovieTable data={searchByYear} columns={['Id','Year','Title']} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}