import mongoose from "mongoose";
const { Schema } = mongoose;

const PaymentSchema = Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
    payment_method: {
      type: String,
      enum: ["cash", "card", "transfer"],
    },
    description: {
      type: String,
    },
    receipt_number: {
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

const PaymentModel = mongoose.model("payment", PaymentSchema);
export default PaymentModel;
