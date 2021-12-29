import { ObjectId, WithId } from 'mongodb'
import { getCollection } from '../storage/db';

const collName = 'articles'

class Article {
  title: string;
  body: string;
  imageName?: string;
  tags?: string[]
  createdAt: number;

  constructor(props: Props) {
    this.title = props.title
    this.body = props.body
    this.imageName = props.imageName || undefined
    this.tags = props.tags
    this.createdAt = Date.now()
  }

  save() {
    return getCollection(collName).insertOne(this)
  }

  static getAll() {
    return getCollection(collName).find().toArray()
  }

  static deleteAll() {
    return getCollection(collName).deleteMany({})
  }

  static getSingle(id: string) {
    return getCollection(collName).findOne<WithId<Article>>(new ObjectId(id))
  }

  static deleteSingle(id: string) {
    return getCollection(collName).findOneAndDelete({ _id: new ObjectId(id) })
  }
}

type Props = {
  title: string;
  body: string;
  imageName?: string;
  tags?: string[];
}

export default Article;