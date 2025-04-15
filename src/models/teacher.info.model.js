import mongoose from "mongoose";
const { Schema } = mongoose;

const TeacherInfoSchema = Schema(
  {
    staff_id: {
      type: Schema.Types.ObjectId,
      ref: "staff",
    },
    specialization: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TeacherInfoModel = mongoose.model("teacherInfo", TeacherInfoSchema);
export default TeacherInfoModel;
