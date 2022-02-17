import logo from './logo.svg';
import './App.css';
import pokeLogo from './ressources/logo.svg';
import pokeList from './ressources/pokemons.json';
import React from 'react';

var pokemonToSearch;

function App() {
  return (
    <Header></Header>
  );
}

function SearchBar({name, setName}){

function handleNameChange(e){
  setName(e.target.value)
}

  return (
  <div className='inline-flex search'>
    <input 
    className='input' 
    placeholder='Enter a pokemon name'
    value={name}
    onChange={handleNameChange}></input>
  </div>
  )
}

function Header(){
  const [name, setName] = React.useState("")
  const [language, setLanguage] = React.useState("en")

  let html = pokeList.filter(element =>
     element.names[language].toLowerCase().includes(name)
     ).map(element => {
      
        return (
        <PokemonComponent 
          id={element["id"]}
          img={element["image"]} 
          name={element["names"][language]}
          typesList={element['types']}>
        </PokemonComponent>)
  })

  let languages = Object.keys(pokeList[0]["names"]).map(l => {
    if(l == language){
      return <option selected>{l}</option>
    }
    return <option>{l}</option>
  })

  function ChangeLanguage(e){
    setLanguage(e.target.value)
  }

  return (
  <div className='app'>
    <div className='header'>
    <img className='header-logo' src={pokeLogo} alt="logo"></img>
    <SearchBar name={name} setName={setName}></SearchBar>
    <select className='language-selector' onChange={ChangeLanguage}>{languages}</select> 
    </div>
    <div className='pokemon-list'>
    {html}
    </div>
  </div>
  )
}

function PokemonComponent({id, img, name, typesList}){
  let types = typesList.map(e => {
    return <p className={`type ${e}`}>{e}</p>;
  })

  return (<div className='pokemon-card'>
    <span className='pokemon-id'>No.{pad(id, 3)}</span>
    <p className='pokemon-name'>{name}</p>
    <div className='img-container'>
    <img className='img' src={img} alt={img}></img>
    </div>
    
    <div className='card-footer'>
    {types}
    </div>
  </div>)
}

function pad(iNumber, iSize) {
  iNumber = iNumber.toString();
  while (iNumber.length < iSize) iNumber = "0" + iNumber;
  return iNumber;
}

export default App;
