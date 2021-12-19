const { getDb } = require('../storage/mongodb')
const collectionName = 'articles'

class Article {
  constructor({ title, body, imageName, tags }) {
    this.title = title
    this.body = body
    this.imageName = imageName
    
    if (tags) {
      this.tags = tags
    }
  }

  save() {
    const db = getDb()

    return db.collection(collectionName).insertOne(this)
  }
}

module.exports = Article;