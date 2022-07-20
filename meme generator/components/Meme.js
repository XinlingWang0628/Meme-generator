import React from "react"

export default function Meme() {
    
    const [meme, setMeme] = React.useState({ // the state of meme
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])  // the state of all the meme data
    
    React.useEffect(() => {   // make an API call to get the meme data 
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())  
            .then(data => setAllMemes(data.data.memes)) // to get the url from meme data
    }, []) // no second parameter
    
    function getMemeImage() {  // get a random image
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,     
            randomImage: url   // same as previous and update the randomImage url
        }))
        
    }
    
    function handleChange(event) { // the state of text user typed
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value   // same as previous and only update the text user typed
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"             //need to match the name in meme
                    value={meme.topText}      //control state
                    onChange={handleChange}  // triggered by change
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"          //need to match the name in meme
                    value={meme.bottomText}   //control state
                    onChange={handleChange}  // triggered by change
                />
                <button                       // button type is submit
                    className="form--button"
                    onClick={getMemeImage}   //click the botton to get a random image
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />  
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}