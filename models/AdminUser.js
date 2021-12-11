import mongoose from "mongoose";

const { Schema } = mongoose;
const adminUserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// Create and export the "Location" model
const AdminUser = mongoose.model("admin-user", adminUserSchema);

export default AdminUser;


