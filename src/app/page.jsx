"use client"
import { useOption } from '../util/optionContext';
import Header from '@/util/Header/Header';
import Navbar from '@/util/Navbar/Navbar';
import Dash from './dashboard/Dash';
import List from './list/List';
import styles from './page.module.css'
import TableProvider from '@/util/tableContext';

export default function Home() {
  const {option} = useOption();

  return (
    <main className={styles.root}>
      <Header />

      <div className={styles.container}>
        <Navbar />
        <TableProvider>
          <div style={{marginLeft:'2em',flex:1,flexGrow:1}}>
            {

              option == 'dash' ?  <Dash />
              : option == 'list' ? <List />
              : null
            }
          </div>
        </TableProvider>

      </div>
    </main>
  )
}
