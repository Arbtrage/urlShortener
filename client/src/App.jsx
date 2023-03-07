import React from "react";
import Axios from "axios";
import './index.css';
import { useState } from "react";

const App = () => {
  const apiUrl = "http://localhost:5000/api/";
  const [orUrl, setOrUrl] = useState("");
  const [shortUrl,setShortUrl]=useState("");
  const [nurl,setNurl]=useState("");

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    await Axios
      .post(apiUrl + `?id=${orUrl}`)
      .then((response) => {
        const shur=response.data.url;
        setShortUrl(shur['shortUrl']);
      })
      .catch((error) => {
        console.log(error); 
      });
    setNurl(orUrl);
    setOrUrl("");
  };

  const IsUrl=(props)=>{
    const {shortUrl}=props;
    if(shortUrl!=""){
      return(
        <div>
          <h4>
            Your Original URL : {nurl}
          </h4>
          <h4>
          Shortened Url: {shortUrl}
          </h4>
        </div>
      )
    };
  };

  const handleOnChange = (e) => {
    setOrUrl(e.target.value);
    setNurl("");
    setShortUrl("");
  };
  return (
    <div className="main">
      <div className="input">
        <h1>URL SHORTENER</h1>
        <form onSubmit={handleOnSubmit}>
          <input className="infield" type="text" onChange={handleOnChange} value={orUrl} />
        </form>
        <br />
        <IsUrl shortUrl={shortUrl}/>
      </div>
    </div>
  );
};

export default App;
