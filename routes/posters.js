const express = require('express');
const { Poster } = require('../models');
const { createPosterForm, bootstrapField } = require('../forms');
const router = express.Router();

router.get('/', async function (req, res) {
    const posters = await Poster.collection().fetch();
    res.render('posters',{
        posters: posters.toJSON()
    })
});

router.get('/create', function (req, res) {
    const form = createPosterForm();
    res.render('posters/create', {
        form: form.toHTML(bootstrapField)
    });
});

router.post('/create', function (req, res) {
    const form = createPosterForm();
    form.handle(req, {
        success: async function (form) {
            const poster = new Poster();
            poster.set('name', form.data.name);
            poster.set('cost', form.data.cost);
            poster.set('description', form.data.description);
            await poster.save();
            res.redirect('/posters')
        },
        error: function (form) {
            res.render('posters/create', {
                form: form.toHTML(bootstrapField)
            });
        },
        empty: function (form) {
            res.render('posters/create', {
                form: form.toHTML(bootstrapField)
            });
        }
    });
})

module.exports = router;