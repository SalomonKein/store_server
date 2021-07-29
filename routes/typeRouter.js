const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()
const checkRout = require('../middleware/chekRoleMiddleware')

router.post('/',checkRout('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

module.exports = router