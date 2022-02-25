import { styled } from "@mui/system";
import {Select, createTheme, TextField} from '@mui/material';

let theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff"
        }
    }
})

export const StylizedHeader = styled('div')({
  width: '100%',
  display: 'inline-flex',
  justifyContent : "space-between"
})

export const StylizedImage = styled('img')({
    height : "5vh",
    marginRight : "3rem"
})

export const PokemonName = styled('p')({
    textAlign : "center",
    margin : "0",
    fontSize : "25px"
})

export const PokemonId = styled('span')({
    fontSize : "0.75rem",
    paddingLeft : "5px"
})

export const CardFooter = styled("div")({
    textAlign : "center", 
    margin : "auto",
    display : "block"
})

export const PokemonImage = styled("img")({
    textAlign : "center",
    margin : "auto",
    display : "flex"
})

export const ZoomedPokemonImage = styled("img")({
    textAlign : "center",
    margin : "auto",
    display : "flex",
    width: "10rem"
})

export const LanguageSelecor = styled(Select)({
    background : theme.palette.primary.main
})

export const MovesList = styled("div")({
    width: "80%",
    height: "auto",
    margin: "auto",
    padding: "5rem",
    textAlign: "center"
})

export const PokemonList = styled("div")({
    padding: '1rem'
})

export const CustomTextField = styled(TextField)({
    background : theme.palette.primary.main
})