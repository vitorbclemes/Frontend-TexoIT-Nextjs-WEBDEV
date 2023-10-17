import React from "react";
import styles from './navbar.module.css'
import { useOption } from "../optionContext";

export default function Navbar(){
    const { option, setOption } = useOption();

    function handleSelectOption(selectedOption){
        setOption(selectedOption);
        console.log(option)
    }

    return (
        <div className={styles.navbar}>
            <span style={option == 'dash' ? {color:'#1E90FF'} : {color:'#000'}} onClick={()=>handleSelectOption('dash')}>Dashboard</span>
            <span style={option == 'list' ? {color:'#1E90FF'} : {color:'#000'}} onClick={()=>handleSelectOption('list')}>List</span>
        </div>
    )
}