import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://next_blog_app:next_blog_app@cluster0.fme4c.mongodb.net/next-blog-app');

    console.log('Connected to MongoDB');
}