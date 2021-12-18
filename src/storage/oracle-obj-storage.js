const axios = require('axios')
const { open } = require('fs').promises
// import { open } from 'fs/promises';

const BUCKET = 'blog'

const oralceApi = axios.create({
  baseURL: process.env.ORACLE_OBJECT_PRA_URL
})

const saveFile = async (file) => {
  const randPrefix = Math.floor(Math.random() * 1000)
  const fileName = 'p_' + randPrefix + file.originalname

  return oralceApi.put(fileName, fs.createReadStream(file.path), {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

module.exports = {
  saveFile
}