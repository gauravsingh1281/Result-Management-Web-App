import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: [true, "Email address is required."],
        unique: [true, "Email address already exists."],
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address."
        ]
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required."],
        unique: [true, "Mobile No. already exists."],
        trim: true,
        minlength: [10, "Mobile number must be at least 10 digits."],
        maxlength: [15, "Mobile number cannot exceed 15 digits."],
        validate: {
            validator: function (v) {
                return /^\+?\d{10,15}$/.test(v); // Only digits, optional + for country code
            },
            message: props => `${props.value} is not a valid mobile number.`
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["MAIN_ADMIN", "SCHOOL_ADMIN", "STUDENT"],
        required: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School" // for school admin & student
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"  //only for student
    }
}, { timestamps: true });

// Encrypt password 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Verify password
userSchema.methods.verifyPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;