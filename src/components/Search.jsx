
import React, { useState } from "react";
import md5 from 'md5';

export default function Search() {

    const [search, setSearch] = useState("");
    const [characterData, setCharacterData] = useState(null);
    const [comicData, setComicData] = useState(null);


    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    

    const getCharacterData = () => {
        setCharacterData(null);
        setComicData(null);
        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);
       
        const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${search}&limit=100`;        
        
        fetch(url).then(response=> response.json()).then(
            result => {
                setCharacterData(result.data);
                console.log(result)
                
            }
        )
        
    }
    const generateHash = (timeStamp) => {
        return md5(timeStamp +privateKey + publicKey );
    }

    

    const handleSubmit = (event) =>{
        event.preventDefault();

        getCharacterData();
    }

    const handleChange = (event) =>{
        setSearch(event.target.value);
       
    }

        return (
            <>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                    placeholder="Search"
                    type="text"
                    onChange={handleChange}
                    /> 
                </form>

                <div> 
                    <button className="submit--button" onClick={handleSubmit}>Find Comics</button>
                </div>
            </>
            )
}

