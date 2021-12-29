import { ObjectId, WithId } from 'mongodb'
import { getCollection } from '../storage/db';

const collName = 'articles'

class Article {
  _id: ObjectId | undefined;
  title: string;
  body: string;
  imageName?: string;
  tags?: string[]
  createdAt: number;

  constructor(props: Props) {
    this._id = props._id ? new ObjectId(props._id) : undefined;
    this.title = props.title
    this.body = props.body
    this.imageName = props.imageName || undefined
    this.tags = props.tags
    this.createdAt = Date.now()
  }

  save() {
    const collection = getCollection(collName);

    if (this._id) {
      return collection.updateOne({ _id: this._id }, { $set: this })
    } else {
      return collection.insertOne(this);
    }
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
  _id?: string;
  title: string;
  body: string;
  imageName?: string;
  tags?: string[];
}

export default Article;