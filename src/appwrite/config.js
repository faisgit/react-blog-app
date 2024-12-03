import { Client, Databases, ID, Storage } from "appwrite";
import conf from "../conf/conf";

export class Services {
    client = new Client()
    database
    bucket
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }


    async createPost({ title, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userId,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    async updatePost({ title, content, featuredImage, status }, slug) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getPost(slug) {
        try {
            this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error(error);

        }
    }

    async getAllPost() {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId
            )
        } catch (error) {
            console.error(error);

        }
    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            )
        } catch (error) {
            console.error(error);

        }
    }


    // files uploading


    async uplaodFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBuckedId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error(error);

        }
    }

    async deletefile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBuckedId,
                fileId
            )
        } catch (error) {
            console.error(error);
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBuckedId,
                fileId
            )
        } catch (error) {
            console.error(error);

        }
    }
}

const services = new Services()

export default services