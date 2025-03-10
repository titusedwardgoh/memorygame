import React from "react"
import MemoryCard from "./components/MemoryCard.jsx"
import Form from "./components/Form.jsx"
import EmojiFetcher from "./data/EmojiFetcher.jsx"
import { nanoid } from "nanoid"
import GameEnd from "./components/GameEnd.jsx"


function App() {

  const [allEmojis,setAllEmojis] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [params, setParams] = React.useState({})
  const [gameRunning,setGameRunning] = React.useState(false)
  const [emojis,setEmojis] = React.useState([])
  const [loading,setLoading] = React.useState(true)
  const [formData, setformData] = React.useState({
          category: "",
          number: 10
      })
  const [selectedCards, setSelectedCards] = React.useState([])
  const [gameEnd, setGameEnd] = React.useState(false)

  const numbers = [10,20,30,40,50,60]

  //get the dropdown list of unique categories//

  React.useEffect(() => {
    if (allEmojis.length > 0) {
      const uniqueCategories = [...new Set(allEmojis.map(emoji => emoji.group))]
      setCategories(uniqueCategories)
      setformData(prev => ({ ...prev, category: uniqueCategories[0] || "" }))
    }
  }, [allEmojis])
  

  //filter the emojis based on the selected form parameters//

  React.useEffect (()=>{
    if (allEmojis.length > 0 && params.category && params.number) {

      const filteredEmojis = allEmojis.filter((emoji)=> emoji.group === params.category)

      const randomEmojis = []
      
      for (let i = 0; i < params.number/2; i++) {
        const randomIndex = Math.floor(Math.random()*filteredEmojis.length)
        randomEmojis.push(filteredEmojis[randomIndex])
      }

      const duplicatedEmojis = [...randomEmojis, ...randomEmojis]
      const finalEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5)

      setEmojis(finalEmojis.map((emoji) => {
        return {
          icon: emoji.character,
          hidden: true,
          selected: false,
          id: nanoid(),
          solved: false,
          disabled: false
        }
      }))
    }

  },[allEmojis,params])

  //Controls the clicking and adding boxes to checking array//

  function handleClick(id) {
    setEmojis(prev =>
      prev.map(card =>
        card.id === id && !card.disabled ? { ...card, selected: !card.selected } : card
      )
    );
  
    setSelectedCards(prev => {
      const clickedCard = emojis.find(card => card.id === id);
  
      if (!clickedCard || clickedCard.disabled) return prev; 
  
      if (prev.some(card => card.id === id)) {
        return prev.filter(card => card.id !== id); 
      } else if (prev.length < 2) {
        return [...prev, clickedCard]; 
      }
  
      return prev;
    });
  }
  
  //Check if cards are matching//
  
  React.useEffect(() => {
    if (selectedCards.length === 2) {
      const [card1, card2] = selectedCards;
  
      if (card1.icon === card2.icon) {
        setEmojis(prev =>
          prev.map(card =>
            card.icon === card1.icon
              ? { ...card, solved: true, disabled: true, selected: false }
              : card
          )
        );
      } else {
        
        setTimeout(() => {
          setEmojis(prev =>
            prev.map(card =>
              card.id === card1.id || card.id === card2.id
                ? { ...card, selected: false }
                : card
            )
          );
        }, 1000); 
      }
  
      setSelectedCards([]);
    }
  }, [selectedCards])

  //Check if game should end//

  React.useEffect(() => {
    if (emojis.length > 0) {
      const allActive = emojis.every(item => item.solved);
      if (allActive) {
        setGameEnd(true);
      }
    }
  }, [selectedCards, emojis]); 
  

  //Create cards on game board//

  const cardsEl = emojis.map((card)=>{
    return (
      <MemoryCard 
      key = {card.id} 
      hidden = {card.hidden} 
      icon = {card.icon}
      selected = {card.selected}
      onClick = {()=>handleClick(card.id)}
      solved = {card.solved}
      />
    )
  })

   //Restart game//

   function restartGame() {
    setGameEnd(false)
    setGameRunning(false)
    
   }
  
  return (
    <>
      <h1>MEMORY</h1>
      {
        !gameRunning ? 
        (<>
        <h2>Customize the game by selecting an emoji category and a number of memory cards</h2>
        <EmojiFetcher setAllEmojis = {setAllEmojis}/>
        <Form 
        categories = {categories} 
        numbers = {numbers} 
        setParams = {setParams} 
        setGameRunning = {setGameRunning}
        loading = {loading}
        setLoading = {setLoading}
        formData={formData}
        setformData={setformData}
        disabled = {loading}
        /> </>) : null 
      }
      
      {(gameRunning && gameEnd) ? <GameEnd restartGame = {restartGame}/> : null}
      
      {gameRunning ? (
        <>
        <div className="card-container">
        {cardsEl}
        </div>
        </>
        ) : null}
    </>
  )
}

export default App
