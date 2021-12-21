import { Db } from 'mongodb';

import { getDb } from '../storage/db';
const collName = 'articles'

class Article {
  title: string;
  body: string;
  imageName?: string;
  tags?: string[]

  constructor(props: Props) {
    this.title = props.title
    this.body = props.body
    this.imageName = props.imageName || undefined
    this.tags = props.tags
  }

  save() {
    const db = getDb()

    return db.collection(collName).insertOne(this)
  }

  static getAll() {
    const db = getDb()
    return db.collection(collName).find().toArray()
  }
}

type Props = {
  title: string;
  body: string;
  imageName?: string;
  tags?: string[];
}

export default Article;