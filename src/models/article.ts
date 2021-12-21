import { getCollection } from '../storage/db';
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
    return getCollection(collName).insertOne(this)
  }

  static getAll() {
    return getCollection(collName).find().toArray()
  }

}

type Props = {
  title: string;
  body: string;
  imageName?: string;
  tags?: string[];
}

export default Article;