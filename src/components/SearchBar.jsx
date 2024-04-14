import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import searchIcon from "../assets/searchIcon.svg";

function SearchBar() {

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
  
    const onSubmit = (d) => {
        navigate("/dashboard/" + d.searchQuery);
        navigate(0);
    };

    return (<form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="header-search">
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Rechercher un client"
            name="s" 
            className="search-input"
            {...register("searchQuery")}
        />
        <button type="submit"><img src={searchIcon} alt="searchIcon" className="search-icon"/></button>
    </form>);
};

export default SearchBar;