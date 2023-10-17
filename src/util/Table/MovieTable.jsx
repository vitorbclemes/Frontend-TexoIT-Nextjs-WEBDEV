import {useState,React} from 'react';
import { useTable } from '../tableContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const tableStyle = {
  borderCollapse: 'collapse',
  flex:1,
  flexGrow:1
};

const thTdStyle = {
  border: '1px solid #ccc',
  padding: '5px',
  textAlign: 'left',
  maxWidth:'100em',
  minWidth:'6.5em',
  width: 'auto',
};

const oddRowStyle = {
    backgroundColor: '#ffffff',
  };

  const evenRowStyle = {
    backgroundColor: '#f3f3f3',
  };

   const inputContainer ={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px'
  }

   const input ={
    width: '80%',
    marginLeft: '1em',
    padding: '3px',
    border:'1px solid #ededed',
    borderRadius: '5px'
  }

 const searchIcon = {
    color: '#FFF',
    marginRight: '10px',
    backgroundColor:' #524dd1',
    padding: '3px',
    marginLeft: '10px',
    borderRadius: '5px',
    fontSize: '10px',
}


const MovieTable = ({ data, columns,fullPage,questions }) => {
  const {selectedYear,setSelectedYear,isWinner,setIsWinner} = useTable();
  const [currentYear,setCurrentYear] = useState('')
  return (
    <table style={{ ...tableStyle, width: fullPage ? '100%' : '35vw' }}>
        <tbody>
            <tr style={evenRowStyle}>
            {columns.map(column => (
                <th key={column} style={{...thTdStyle,textAlign: fullPage ? 'center' : 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {column}
                      {(questions && (column === 'Year')) && (
                        <div className={inputContainer} >
                          <input style={input} type='number' placeholder={`Filter by year`}  value={currentYear} onChange={(e)=>setCurrentYear(e.target.value)}/>
                          <FontAwesomeIcon icon={faSearch} style={searchIcon}  onClick={(e)=> setSelectedYear(currentYear)}/>
                        </div>
                      )}
                      {(questions && (column === 'Winner?')) && (
                        <select value={isWinner} onChange={(e)=>setIsWinner(e.target.value)}>
                          <option value={""}>Yes/No</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      )}
                    </div>
                </th>
            ))}
            </tr>
            {data.map((item,index) => (
                <tr key={index} style={ index % 2 === 0  ? oddRowStyle : evenRowStyle}>
                {Object.keys(item).map(itemKey => (
                  <td key={itemKey}>{item[itemKey]}</td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
  );
};

export default MovieTable;
