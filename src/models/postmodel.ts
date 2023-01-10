import mongoose from "mongoose";

interface Post {
  createdAt: Date;
  createdBy: mongoose.Schema.Types.ObjectId;
  b64: string;
  likedBy: mongoose.Schema.Types.ObjectId[];
  description: string;
}

const postSchema = new mongoose.Schema<Post>({
  createdAt: {
    type: Date,
    default: () => new Date(),
    imutable: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
    imutable: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  b64: {
    type: String,
    required: true,
    match: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

export default mongoose.model<Post>("Post", postSchema);
