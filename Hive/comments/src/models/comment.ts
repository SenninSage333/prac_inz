import mongoose from 'mongoose';

interface CommentAttrs {
  videoid: string;
  userid: string;
  useremail: string;
  content: string;
  date: string;
}

interface CommentDoc extends mongoose.Document {
  videoid: string;
  userid: string;
  useremail: string;
  content: string;
  date: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
  {
    videoid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
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

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment, CommentAttrs };
