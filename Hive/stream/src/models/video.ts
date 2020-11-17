import mongoose from 'mongoose';

interface VideoAttrs {
  title: string;
  description: string;
  path: string;
}

interface VideoDoc extends mongoose.Document {
  title: string;
  description: string;
  path: string;
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

videoSchema.statics.build = (attrs: VideoAttrs) => {
  return new Video(attrs);
};

const Video = mongoose.model<VideoDoc, VideoModel>('Video', videoSchema);

export { Video };
