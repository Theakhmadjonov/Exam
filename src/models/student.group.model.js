import mongoose from "mongoose";
const { Schema } = mongoose;

const StudentGroupSchema = Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
    join_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

StudentGroupSchema.index({ student_id: 1, group_id: 1 }, { unique: true });

const StudentGroupModel = mongoose.model("student_group", StudentGroupSchema);
export default StudentGroupModel;
