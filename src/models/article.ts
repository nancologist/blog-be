const { getDb } = require('../storage/mongodb')
const collectionName = 'articles'

type Props = {
  title: string;
  body: string;
  imageName?: string;
  tags?: string[];
}

class Article {

  title: string;
  body: string;
  imageName?: string
  tags?: string[]

  constructor(props: Props) {
    this.title = props.title
    this.body = props.body
    this.imageName = props.imageName
    this.tags = props.tags
  }

  save() {
    const db = getDb()

    return db.collection(collectionName).insertOne(this)
  }
}

export default Article;