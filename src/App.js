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
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import {MenuItem} from '@mui/material'
import {
  StylizedHeader,
  StylizedImage,
  PokemonName,
  PokemonId,
  CardFooter,
  PokemonImage,
  ZoomedPokemonImage,
  LanguageSelecor,
  MovesList,
  PokemonList,
  CustomTextField
} from 'stylesComponents'

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


function Header({ language, setLanguage }) {
  return (
    <StylizedHeader>
      <Link to="/">
        <StylizedImage src={pokeLogo} alt="logo" />
      </Link>
      <SelectLanguage language={language} setLanguage={setLanguage}></SelectLanguage>
    </StylizedHeader>
  )
}

function SelectLanguage({language, setLanguage}) {
  let languages = Object.keys(pokeList[0]['names']).map((l) => {
    return <MenuItem value={l}>{l}</MenuItem>
  })

  function ChangeLanguage(e) {
    setLanguage(e.target.value)
  }

  return (
    
      <LanguageSelecor
        labelId="default-label"
        value={language}
        label="Language"
        onChange={ChangeLanguage}>
        {languages}
      </LanguageSelecor>
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
      <PokemonList>
        <Grid container spacing={3}>
          {html}
        </Grid>
        <Outlet />
      </PokemonList>
    </div>
  )
}


function SearchBar({ name, setName }) {
  function handleNameChange(e) {
    setName(e.target.value)
  }

  return (
    <CustomTextField
      fullWidth
      placeholder="Enter a pokemon name"
      value={name}
      onChange={handleNameChange}>
      </CustomTextField>
  )
}

function PokemonComponent({ id, img, name, typesList, language }) {
  let types = typesList.map((e) => {
    return <p className={`type ${e}`}>{typeTrad[e][language]}</p>
  })

  return (
    <Card>
      <PokemonId>No.{pad(id, 3)}</PokemonId>
      <PokemonName>{name}</PokemonName>
      <div className="img-container">
        <PokemonImage src={img} alt={img} />
      </div>
      <CardFooter>{types}</CardFooter>
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
              <PokemonId>No.{pad(element['id'], 3)}</PokemonId>
              <PokemonName>{element['names'][language]}</PokemonName>
              <div className="img-container">
                <ZoomedPokemonImage src={element['image']} alt={element['image']} />
              </div>
              <CardFooter>{types}</CardFooter>
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
    <MovesList>
      <h5>Moves : </h5>
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
    </MovesList>
  )
}

export default App
