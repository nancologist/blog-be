import { ObjectId } from 'mongodb'
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

  // static getSingle(id: any) {
  //   return getCollection(collName).findOne(new ObjectId(id))
  // }
}

type Props = {
  email: string;
  pwd: string;
}

export default User;