import express from 'express'
import { upload, importFile, exportFile } from './constroller'
const router = express.Router()

router.post('/exportfile', exportFile)

router.post('/importfile', upload.single('xlsx'), importFile)

export default router;