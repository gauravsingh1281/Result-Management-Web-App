import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },

    // Personal details
    fullName: {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },
        middleName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
        }
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    admitCardNo: {
        type: String,
        required: true,
        unique: true
    },
    admissionNo: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
});

const studentProfile = mongoose.model("StudentProfile", studentProfileSchema);

export default studentProfile;
