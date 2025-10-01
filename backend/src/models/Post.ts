import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  likes: mongoose.Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Conteúdo do comentário é obrigatório'],
    trim: true,
    maxlength: [500, 'Comentário não pode ter mais de 500 caracteres']
  }
}, {
  timestamps: true
});

const PostSchema = new Schema<IPost>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Autor é obrigatório']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
    trim: true,
    maxlength: [1000, 'Post não pode ter mais de 1000 caracteres']
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [CommentSchema]
}, {
  timestamps: true
});

PostSchema.index({ createdAt: -1 });
PostSchema.index({ author: 1 });

export default mongoose.model<IPost>('Post', PostSchema);
