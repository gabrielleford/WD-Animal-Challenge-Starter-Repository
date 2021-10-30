const express = require("express");
const router = express.Router();
const { Animal } = require("../models");

// * BRONZE *
router.post("/create", async (req, res) => {
    let { name, legNumber, predator } = req.body.animal;

    try {
        const animal = await Animal.create({
            name,
            legNumber,
            predator
        });

        res.status(201).json({
            message: "Animal successfully created",
            animal: animal
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to create animal"
        });
    }
});

// * SILVER *
router.delete("/delete/:animalName", async (req, res) => {
  const animalName = req.params.animalName;

  try {
    const query = {
      where: {
        name: animalName,
      },
    };

    await Animal.destroy(query);
    res.status(200).json({ message: "Animal Deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// * GOLD *
router.put("/update/:animalName", async (req, res) => {
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