import {Client,Account,ID} from 'appwrite'
import {conf} from '../env_config/conf'
 export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}){
        try{
            const useraccount=await this.account.create(ID.unique(),email,password,name);
            if(useraccount){
            return this.login({email,password});
            }else{
                console.log("useraccount is not created",useraccount);
                return useraccount
            }
        }catch(error){
            console.log("Error while creating account in AuthService",error)
            throw error
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }catch(error){
            console.log("Error while login account in AuthService",error)
            throw error
        }
    }
    async getcurrentUser(){
        try{
            const user=await this.account.get();
             return user;
        }catch(error){
            console.log("error while getting user",error.message);
        }
        return null;
    }
    async deleteCurrentUser(){
        try{
            await this.account.deleteSession();
        }catch(error){
            console.log("error while deleting user",error)
            throw error
        }
    }
 }
 const authService=new AuthService();
 export default authService;