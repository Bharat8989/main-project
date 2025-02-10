import { IndexType } from 'node-appwrite';
import {db,questionCollection} from  '../name'
import { databases } from './config'

export default async function createQuestionCollection() {
    //create collections 
    await databases.createCollection(db,questionCollection, 
    questionCollection ,[
        Permission.read('any'),
        Permission.read('users'),
        Permission.create('users'),
        Permission.update('users'),
        Permission.delete('users'),

    ])
    console.log("question collections is created")

    //creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,questionCollection, 'title',100, true),
        databases.createStringAttribute(db,questionCollection, 'content',10000, true),

        databases.createStringAttribute(db,questionCollection, 'authorId',50, true),
        databases.createStringAttribute(db,questionCollection, 'tags',50,undefined, true),
        databases.createStringAttribute(db,questionCollection, 'attachmentId',50, false),
    ]);
    console.log("questions attributes create")

    //create indexes

    // await Promise.all([
    //     databases.createIndex(
    //         db,
    //         questionCollection,
    //         "title",
    //         IndexType.Fulltext,
    //         ["title"],
    //         ['asc']

    //     ),
    //     databases.createIndex(
    //         db,
    //         questionCollection,
    //         "content",
    //         IndexType.Fulltext,
    //         ["content"],
    //         ['asc']

    //     )
        
    // ])
}
