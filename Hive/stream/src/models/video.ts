import mongoose from 'mongoose';

interface VideoAttrs {
  title: string;
  description: string;
  path: string;
  logo: string;
  likes: string[];
}

interface VideoDoc extends mongoose.Document {
  title: string;
  description: string;
  path: string;
  logo: string;
  likes: string[];
}

interface VideoModel extends mongoose.Model<VideoDoc> {
  build(attrs: VideoAttrs): VideoDoc;
}

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    likes: {
      type: [],
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.logo;
      },
    },
  }
);

videoSchema.statics.build = (attrs: VideoAttrs) => {
  return new Video(attrs);
};

const Video = mongoose.model<VideoDoc, VideoModel>('Video', videoSchema);

export { Video, VideoAttrs, VideoDoc };
