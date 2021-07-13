const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --
//allPokemon
app.get("/pokemon", (req, res) => {
    return res.json(allPokemon);
  });
  
  // search pokemon
  app.get("/pokemon/search", (req, res) => {
    const queryParams = req.query;
    console.log(queryParams);
  
    for (let key in queryParams) {
      const foundPokemon = allPokemon.find((pokemonElement) => {
        return pokemonElement[key]
          .toLowerCase()
          .includes(queryParams[key].toLowerCase());
      });
  
      if (foundPokemon) {
        return res.json(foundPokemon);
      } else {
        return res.json({ msg: "Pokemon not found!" });
      }
    }
  
    res.json(queryParams);
  });
  
  // especific pokemon
  app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id;
  
    const foundPokemon = allPokemon.find((pokemonUnique) => {
      return pokemonUnique.id === Number(id);
    });
  
    if (foundPokemon) {
      return res.json(foundPokemon);
    } else {
      return res.json({ msg: "Pokemon not found!" });
    }
  });
  
  // create
  app.post("/pokemon", (req, res) => {
    const formData = req.body;
  
    const newPokemon = {
      id: uuidv4(),
      name: formData.name,
      types: formData.types,
      height: formData.height,
      weight: formData.weight,
      sprite: formData.sprite,
    };
  
    allPokemon.push(newPokemon);
  
    return res.json(newPokemon);
  });
  
  // update
  app.put("/pokemon/:id", (req, res) => {
    const formData = req.body;
  
    const id = req.params.id;
  
    const foundPokemon = allPokemon.find((pokemonElement) => {
      return pokemonElement.id === id;
    });
  
    const index = allPokemon.indexOf(foundPokemon);
    allPokemon[index] = { ...foundPokemon, ...formData };
    return res.json(allPokemon[index]);
  });
  
  // delete
  app.delete("/pokemon/:id", (req, res) => {
    const index = allPokemon.findIndex((pokemonElement) => {
      return pokemonElement.id === req.params.id;
    });
  
    if (index > 0) {
      allPokemon.splice(index, 1);
      return res.json({ msg: "Contact deleted successfully" });
    } else {
      return res.json({ msg: "Contact not found." });
    }
  });
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
