const express = require('express')

const router = new express.Router();

router.get('/fast_movie', (req, res) => {
    console.log(res.pathname);
    res.json(require("../data/movie/fast_movie_list.json"));
})

router.get('/local_file', (req, res) => {
    console.log(res.pathname);
    res.json(require("../data/movie/local_file.json"));
})

router.get('/movie_list', (req, res) => {
    console.log(res.pathname);
    res.json(require("../data/movie/movie_list.json"));
})

router.get('/movie_list_nav', (req, res) => {
    console.log(res.pathname);
    res.json(require("../data/movie/movie_list_nav.json"));
})


module.exports = router