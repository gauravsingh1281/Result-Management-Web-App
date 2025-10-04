import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectCode: String,
    subjectName: String,
    theoryMarks: Number,
    practicalMarks: Number,
    totalMarks: Number,
    grade: String
});

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rollNo: {
        type: String,
        required: true
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
    session: {
        type: String,
        required: true
    },
    subjects: [subjectSchema],
    overallResult: {
        type: String,
        enum: ["PASS", "FAIL", "COMPARTMENT"],
        required: true
    },
    percentage: Number
}, { timestamps: true });

export default mongoose.model("Result", resultSchema);
