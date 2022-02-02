import { ObjectId, WithId } from 'mongodb'
import { getCollection } from '../storage/db';

const collName = 'articles'

class Article {
  _id?: ObjectId;
  category: string;
  title: string;
  body: string;
  imageName?: string;
  tags?: string[]
  createdAt?: number;

  constructor(props: Props) {
    const isEditing = !!props._id;
    if (isEditing) {
      this._id = new ObjectId(props._id);
    } else {
      this.createdAt = Date.now();
    }

    this.category = props.category
    this.title = props.title;
    this.body = props.body;
    this.imageName = props.imageName || undefined;
    this.tags = props.tags;
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
  category: string;
  title: string;
  body: string;
  imageName?: string;
  tags?: string[];
  createdAt?: number;
}

export default Article;