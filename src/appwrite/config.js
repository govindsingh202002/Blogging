import {conf} from '../env_config/conf'
import {Client,ID,Databases,Storage,Query} from 'appwrite'
export class Service{
    client=new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.database.createDocumentation(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.log("Error while creating post",error);
            throw error
        }
    }
    async updatePost({slug,title,content,featuredImage,status,userId}){
        try{
            return await this.database.updateDatabases(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.log("error while updating post",error);
            throw error
        }

    }
    async deletePost(slug){
        try{
            await this.database.deleteDocumnet(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("error while deleting post",error);
            throw error
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
               
            )
        } catch (error) {
            console.log("error while getting post",error);
            return null
        }
    }
    async getAllPost(queries=Query.equal('status',['active'])){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log("error while getting all posts",error)
            throw error
        }
    }
    async uploadPost(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
                
            )
        } catch (error) {
            console.log("error while uploading file",error)
            throw error            
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("error while deleting file",error);
            throw error
        }
    }
    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("error while previewing file",error);
            throw error
        }
    }
}
const service=new Service();
export default service;