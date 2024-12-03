import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client()
    account
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            console.error(error)
        }
    }

    async signup({ name, email, password }) {
        try {
            const userAccount = this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            userAccount && this.login({ email, password })
        } catch (error) {
            console.error(error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.error(error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.error(error);
        }
    }
}


const authService = new AuthService()

export default authService