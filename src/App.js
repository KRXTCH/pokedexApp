import './App.css'
import pokeLogo from './ressources/logo.svg'
import pokeList from './ressources/pokemons.json'
import typeTrad from './ressources/types.json'
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
  Outlet,
} from 'react-router-dom'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'

function App() {
  const [language, setLanguage] = React.useState('en')
  const [name, setName] = React.useState('')

  return (
    <div className="app">
      <BrowserRouter>
        <Header language={language} setLanguage={setLanguage} />
        <Routes>
          <Route path="/" element={<AppBody language={language} name={name} setName={setName} />}>
            <Route
              path="/details/:pokemonId"
              element={<Details language={language} name={name} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function SearchBar({ name, setName }) {
  function handleNameChange(e) {
    setName(e.target.value)
  }

  return (
    <TextField
      style={{ backgroundColor: 'white' }}
      fullWidth
      placeholder="Enter a pokemon name"
      value={name}
      onChange={handleNameChange}
    ></TextField>
  )
}

function Header({ language, setLanguage }) {
  let languages = Object.keys(pokeList[0]['names']).map((l) => {
    if (l == language) {
      return <option selected>{l}</option>
    }
    return <option>{l}</option>
  })

  function ChangeLanguage(e) {
    setLanguage(e.target.value)
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header-logo" src={pokeLogo} alt="logo" />
      </Link>
      <select className="language-selector" onChange={ChangeLanguage}>
        {languages}
      </select>
    </div>
  )
}

function AppBody({ language, name, setName }) {
  let html = pokeList
    .filter((element) => element.names[language].toLowerCase().includes(name))
    .map((element) => {
      return (
        <Grid item xs={12} sm={6} md={2}>
          <Link to={'details/' + element.id}>
            <PokemonComponent
              id={element['id']}
              img={element['image']}
              name={element['names'][language]}
              typesList={element['types']}
              language={language}
            ></PokemonComponent>
          </Link>
        </Grid>
      )
    })

  return (
    <div>
      <SearchBar name={name} setName={setName}></SearchBar>
      <div className="pokemon-list" style={{ padding: '1rem' }}>
        <Grid container spacing={3}>
          {html}
        </Grid>

        <Outlet />
      </div>
    </div>
  )
}

function PokemonComponent({ id, img, name, typesList, language }) {
  let types = typesList.map((e) => {
    return <p className={`type ${e}`}>{typeTrad[e][language]}</p>
  })

  return (
    <Card>
      <span className="pokemon-id">No.{pad(id, 3)}</span>
      <p className="pokemon-name">{name}</p>
      <div className="img-container">
        <img className="img" src={img} alt={img}></img>
      </div>
      <div className="card-footer">{types}</div>
    </Card>
  )
}

function pad(iNumber, iSize) {
  iNumber = iNumber.toString()
  while (iNumber.length < iSize) iNumber = '0' + iNumber
  return iNumber
}

function Details({ language }) {
  const { pokemonId } = useParams()
  const navigate = useNavigate()

  function handleClose() {
    navigate('/')
  }

  let pokemon = pokeList.map((element) => {
    let types = element['types'].map((e) => {
      return <p className={`type ${e}`}>{typeTrad[e][language]}</p>
    })

    if (element.id == pokemonId) {
      return (
        <Dialog open={true} onClose={handleClose}>
          <Grid item>
            <Card>
              <span className="pokemon-id">No.{pad(element['id'], 3)}</span>
              <p className="pokemon-name">{element['names'][language]}</p>
              <div className="img-container">
                <img className="img zoom" src={element['image']} alt={element['image']}></img>
              </div>
              <div className="card-footer">{types}</div>
              <PokeDetails
                movesListe={element['moves']}
                height={element['height']}
                weight={element['height']}
              />
            </Card>
          </Grid>
        </Dialog>
      )
    }
  })

  return <div class="details-pokemon">{pokemon}</div>
}

function PokeDetails({ movesListe, height, weight }) {
  let moves = movesListe.map((move) => {
    return <span>{move}&nbsp;&nbsp;</span>
  })

  return (
    <div className="moves">
      {moves}
      <div>
        <span>
          <h5>Height : </h5>
          {height}
        </span>
        <span>
          <h5>Weight : </h5>
          {weight}
        </span>
      </div>
    </div>
  )
}

export default App
