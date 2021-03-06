import { ObjectId, WithId } from 'mongodb'
import { getCollection } from '../storage/db';

const collName = 'users'

class User {
  email: string;
  pwd: string;

  constructor(props: Props) {
    this.email = props.email
    this.pwd = props.pwd
  }

  save() {
    return getCollection(collName).insertOne(this)
  }

  static async getSingle(email: string) {
    return getCollection(collName).findOne<WithId<User>>({ email: email })
  }
}

type Props = {
  email: string;
  pwd: string;
}

export default User;