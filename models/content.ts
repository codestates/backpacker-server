import mongoose from "mongoose";

interface IContent {
  startDate: string;
  endDate: string;
  totalCost: number;
  thumbnail: Array<string[]>;
  schedule: Array<string[]>;
  title: string;
  touristRegion: string;
  userinfo: string[];
}

interface contentModelInterface extends mongoose.Model<ContentDoc> {
  build(attr: IContent): ContentDoc;
}

interface ContentDoc extends mongoose.Document {
  startDate: string;
  endDate: string;
  totalCost: number;
  thumbnail: Array<string[]>;
  schedule: Array<string[]>;
  title: string;
  touristRegion: string;
  userinfo: string[];
}

const contents = new mongoose.Schema({
  startDate: {
    type: String,
    trim: true,
  },
  endDate: {
    type: String,
    trim: true,
  },
  totalCost: {
    type: Number,
  },
  thumbnail: [[String]],
  schedule: [
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
      },
    ],
  ],
  touristRegion: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  userinfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

contents.statics.build = (attr: IContent) => {
  return new content(attr);
};

const content = mongoose.model<ContentDoc, contentModelInterface>(
  "content",
  contents
);

export { content };
