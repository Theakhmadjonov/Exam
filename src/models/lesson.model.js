import mongoose from "mongoose";
const { Schema } = mongoose;

const LessonSchema = Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    lesson_date: {
      type: Date,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    room_number: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "staff",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const LessonModel = mongoose.model("lesson", LessonSchema);
export default LessonModel;
