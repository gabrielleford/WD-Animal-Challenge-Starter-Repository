const express = require("express");
const router = express.Router();
const { Animal } = require("../models");
const validateSession = require("../middleware/validate-session");
const util = require('util');
const { use } = require("./usercontroller");


// * BRONZE *
router.post("/create", validateSession, async (req, res) => {
  let { name, legNumber, predator } = req.body.animal;
  let { id } = req.user;

  const animal = {
    name,
    legNumber,
    predator,
    userId: id,
  };
  try {
      const newAnimal = await Animal.create(animal);
      res.status(201).json({
          message: "Animal successfully created",
          animal: newAnimal
      });
  } catch (err) {
      res.status(500).json({
          message: "Failed to create animal"
      });
  }
});

// * SILVER *
router.delete("/delete/:animalName", validateSession, async (req, res) => {
  const animalName = req.params.animalName;
  const { id } = req.user
  try {
    const query = {
      where: {
        name: animalName,
        userId: id
      },
    };

    await Animal.destroy(query);
    res.status(200).json({ message: "Animal Deleted" });
  
      
  } catch (err) {
    res.status(500).json({ error: err });
  }
    
});

// * GOLD *
router.put("/update/:animalName", validateSession, async (req, res) => {
  const { name, legNumber, predator } = req.body.animal;
  const animalName = req.params.animalName;

  const query = {
    where: {
      name: animalName,
    },
  };

  const updatedAnimal = {
    name: name,
    legNumber: legNumber,
    predator: predator,
  };

  try {
    const update = await Animal.update(updatedAnimal, query);
    res.status(200).json({ message: "Animal Updated" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;

// { "animal": { "name": "Cheetah", "legNumber": 4, "predator": true } }
// { "user": { "username": "mario", "password": "password" } }