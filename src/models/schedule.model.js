import mongoose from "mongoose";
const { Schema } = mongoose;

const ScheduleSchema = Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ScheduleModel = mongoose.model("schedule", ScheduleSchema);
export default ScheduleModel;
