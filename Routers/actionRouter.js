const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel');

router.use(express.json());



// Middleware

function validateActionId() {
  return (req, res, next) => {
    db.get(req.params.id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(400).json({
            messag: "invalid ID"
          });
        }
      })
      .catch(err => {
        next(err);
      });
  };
}

function validateAction() {
  return (req, res, next) => {
    const action = req.body;
    if (!action.project_id) {
      res.status(400).json({
        message: "not a valid project ID for this action. "
      });
    } else if (!action.notes) {
      res.status(400).json({
        message: "no notes field for action."
      });
    } else if (!action.description) {
      res.status(400).json({
        message: "no description field for action. "
      });
    } else {
      next();
    }
  };
}


//CREATE ACTION
router.post("/", validateAction(), (req, res, next) => {
  Actions.insert(req.body)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      next(err);
    });
});

//READ ALL ACTION
router.get("/", (req, res, next) => {
  Actions.get()
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      next(err);
    });
});

//READ ACTION BY ID
router.get("/:id", validateActionId(), (req, res, next) => {
  Actions.get(req.params.id)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      next(err)
    })
})

//UPDATE ACTION
router.put("/:id", validateActionId(), (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      next(err);
    });
});

//DELETE ACTION

router.delete("/:id", validateActionId(), validateAction(), (req, res, next) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.json({
        message: "action was deleted.",
        action
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;