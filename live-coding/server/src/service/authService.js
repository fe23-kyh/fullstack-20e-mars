import { fetchCollection } from "../mongodb/mongoDbClient.js";
import bcrypt from 'bcrypt';

const USER_COLLECTION_NAME = "users";

const create = async ({username, password}) => {
  let result = await fetchCollection(USER_COLLECTION_NAME).findOne({username});
  
  if(result != null) {
    return false;
  }

  bcrypt.hash(password, 12, async (err, hash) => {
    result = await fetchCollection(USER_COLLECTION_NAME).insertOne({username, hash, role: "USER"});
  });
}


const exists = async ({username, password}, afterValid) => {
  let data = await fetchCollection(USER_COLLECTION_NAME).findOne({username});

  if(data == null) {
    throw new Error("Account did not exist");
  }

  bcrypt.compare(password, data.hash, (err, result) => {
    if(result) {
      afterValid(data);
    } else {
      throw new Error("Account login error");
    }
  })
}

export default { create, exists }