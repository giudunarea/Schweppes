const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')
const sessions = require('../server_modules/sessions.js')

router.get('/:id', async function(req, res) {
    let session_id = req.cookies.auth
    let user = null;
    if (sessions.Data[session_id]) {
        user = await db.user.findOne({
            username: sessions.Data[session_id].username
        })
    }

    res.render('./cities/allcities.ejs', {
        user: user
    });
});

module.exports = router