import mongoose from "mongoose";
const { Schema } = mongoose;

const GroupSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: "teacherInfo",
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    max_students: {
      type: Number,
      default: 20,
    },
    status: {
      type: String,
      enum: ["planned", "active", "completed"],
      default: "planned",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const GroupModel = mongoose.model("group", GroupSchema);
export default GroupModel;
