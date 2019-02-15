const express = require("express");

const Projects = require("./data/helpers/projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({
          errormessage: "Unable to find any project matching the provided ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

//need to fix ELSE error, returning undefined instead of null

router.post("/", (req, res) => {
  const { name, description, completed } = req.body;
  const project = { name, description, completed };
  if (!name || !description) {
    return res
      .status(400)
      .json({ errormessage: "Please provide a name and a description" });
  }
  Projects.insert(project)
    .then(insert => {
      res.status(201).json(insert);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(remove => {
      if (remove) {
        res.status(204).json(remove);
      } else {
        res.status(404).json({
          errormessage: "Unable to find any project matching the provided ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Projects.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({
            errormessage: "Unable to find any project matching the provided ID"
          });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

module.exports = router;
