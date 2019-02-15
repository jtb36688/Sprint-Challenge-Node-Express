const express = require("express");

const Actions = require("./data/helpers/actionModel.js");
const Projects = require("./data/helpers/projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({
          errormessage: "Unable to find any action matching the provided ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

//need to fix ELSE error, returning undefined instead of null

router.post("/", (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const action = { project_id, description, notes, completed };
  if (!project_id || !description || !notes) {
    return res
      .status(400)
      .json({
        errormessage: "Please provide a project id, description, and notes"
      });
  }
  Projects.get(project_id)
    .then(matchingproject => {
      if (matchingproject) {
        Actions.insert(action)
          .then(insert => {
            res.status(201).json(insert);
          })
          .catch(({ code, message }) => {
            res.status(code).json({ message });
          });
      } else {
        res
          .status(404)
          .json({
            errormessage:
              "Unable to find any project matching the given project ID "
          });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(remove => {
      if (remove) {
        res.status(204).json(remove);
      } else {
        res.status(404).json({
          errormessage: "Unable to find any action matching the provided ID"
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
  Actions.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          errormessage: "Unable to find any action matching the provided ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

module.exports = router;
