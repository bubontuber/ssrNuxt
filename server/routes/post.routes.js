const passport = require('passport')
const { Router } = require('express')
const router = Router()
const upload = require('../middleware/upload')
const ctr = require('../controllers/post.controller')

// ADMIN
// api/post/admin
router.post(
  '/admin/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  ctr.create
)

router.get(
  '/admin/',
  ctr.getAll
)

router.get(
  '/admin/:id',
  ctr.getById
)

router.put(
  '/admin/:id',
  ctr.update
)

router.delete(
  '/admin/:id',
  ctr.remove
)

router.get(
  '/admin/get/analytics',
  ctr.getAnalytics
)

// BASE
// api/post
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.put('/add/view/:id', ctr.addView)

module.exports = router
