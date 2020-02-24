const express = require('express')

const router = express.Router()

const Projects = require('../data/helpers/projectModel')

const Actions = require('../data/helpers/actionModel')

router.use(express.json())

//middleware

function validateProject() {
    return (req, res, next) => {
        const project = req.body;
        if (!project.name) {
            res.status(400).json({
                message: "no the required name field."
            })
        } else if (!project.description) {
            res.status(400).json({
                message: "no the required description field"
            })
        } else if (!project) {
            message: "no project data."
        }
        else {
            next()
        }
    };
}

function validateAction() {
    return (req, res, next) => {
        const action = req.body;
        if (!action) {
            res.status(400).json({
                message: 'no action data.'
            })
        } else if (!action.notes || !action.description) {
            res.status(400).json({
                message: 'no notes field'
            })
        } else {
            next();
        }
    }
}

function validateUser(req, res, next) {
    if (!req.body.name) {
        res.status(400).json({
            message: "missing username"
        })
    } else {
        next()
    }
}

function validateProjectId() {
    return (req, res, next) => {
        Projects.get(req.params.id)
            .then(response => {
                if (!response) {
                    res.status(404).json({
                        message: "that project ID does not exist."
                    })
                } else {
                    next();
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

//CREATE PROJECT
router.post("/", validateProject(), (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            next(err);
        })
})

//READ ALL PROJECTS
router.get("/", (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            next(err);
        })
})

//READ PROJECT BY ID
router.get("/:id", validateProject(), (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            next(err)
        })
})

//UPDATE PROJECT
router.put("/:id", validateProjectId(), validateAction(), (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            next(err);
        })
})

//DELETE PROJECT
router.delete("/:id", validateProjectId(), (req, res, next) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.json({
                message: "Project was succesfully deleted.",
                project
            })
        })
        .catch(err => {
            next(err);
        })
})



module.exports = router;