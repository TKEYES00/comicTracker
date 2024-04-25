
import React, { useState } from "react";
import md5 from 'md5';
import Characters  from "./Characters";
import Comics from "./Comics";

export default function Search() {

    const [search, setSearch] = useState("");
    const [characterData, setCharacterData] = useState(null);
    const [comicData, setComicData] = useState(null);


    const publicKey ='test';
    const privateKey = 'test';
    

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

    const getComicData = (characterId) =>{
        window.scrollTo({top: 0, left: 0});

        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);

        const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&limit=100`;        

       fetch(url)
        .then((response) => response.json()).then((results) => {
            setComicData(results.data);
            console.log(results)
        })
        .catch(error => {console.log("error while passing in the comic data", error)
    })
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
        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);
       
    }
    const handleReset = (event) => {
        setSearch("")
        setCharacterData(null)
        setComicData(null)
    }
  
        return (
            <>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                    placeholder="Search"
                    type="text"
                    onChange={handleChange}
                    /> 
                    <div> 
                    <button className="submit--button" onClick={handleSubmit}>Find Comics</button>
                    <button className="resetButton" onClick={handleReset}>Reset</button>
                </div>
                </form>

                {!comicData && characterData && characterData.results[0] &&
                <Characters data={characterData.results} onClick={getComicData} />
                }
                {comicData && comicData.results[0] && <Comics data={comicData.results}/>}
                
            </>
            )
}

