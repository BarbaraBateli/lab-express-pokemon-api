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
  app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id;
    
      const foundPokemon = allPokemon.find((currentPokemon) => {
        return currentPokemon.id === Number(id);
      });
       
      if (foundPokemon) {
        return res.json(foundPokemon);
      }
        return res.json({ msg: "Pokemon not found!" });
      });
  
  // especific pokemon
  app.get("/search", (req, res) => {
    for (let key in req.query) {
      const filteredPokemon = allPokemon.filter((currentPokemon) => {
        // Pesquisando por tipos
        if (key === "types") {
          return currentPokemon.types.includes(req.query.types);
        }

        return currentPokemon.name
        .toLowerCase()
        .includes(req.query.name.toLowerCase());
    });

    if (filteredPokemon.length) {
      return res.json(filteredPokemon);
    }

    return res.json({ msg: "No Pokemon matches this search." });
  }
});

app.post("/pokemon", (req, res) => {
  const formData = req.body;

  // Pegando o último id da lista de todos os Pokemons
  const lastId = allPokemon[allPokemon.length - 1].id;

  // O novo Pokemon vai continuar a sequencia de ids
  const newPokemon = { ...formData, id: lastId + 1 };

  allPokemon.push(newPokemon);

  return res.json(newPokemon);
});
    
app.put("/pokemon/:id", (req, res) => {
  const formData = req.body;

  // Encontrar o Pokemon com o id do parametro de rota
  const id = req.params.id;

  const foundPokemon = allPokemon.find((currentPokemon) => {
    return currentPokemon.id === Number(id);
  });

  if (foundPokemon) {
    // Atualiza o elemento da array com os dados do corpo (body) da requisição
    const index = allPokemon.findIndex((currentPokemon) => {
      return currentPokemon.id === Number(id);
    });

    if (index > -1) {
      allPokemon[index] = { ...foundPokemon, ...formData };

      return res.json(allPokemon[index]);
    } else {
      return res.json({ msg: "Pokemon not found." });
    }
  }

  return res.json({ msg: "Pokemon not found." });
});

// 6. A DELETE /pokemon/:id route, that deletes an existing Pokemon and returns a success message

app.delete("/pokemon/:id", (req, res) => {
  const id = req.params.id;

  const index = allPokemon.findIndex((currentPokemon) => {
    return currentPokemon.id === Number(id);
  });

  if (index > -1) {
    allPokemon.splice(index, 1);
    return res.json({ msg: "Pokemon successfully removed." });
  }

  return res.json({ msg: "Pokemon not found." });
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));

   