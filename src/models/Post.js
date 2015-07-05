class Post {

  constructor (rawData) {
    this.id = rawData.id;
    this.isAd = false;

    if (/(некоммерческий\sсоциальный\sпроект|объявление\sс\sкомиссией|\:\sреклама\s\:)/.test(rawData.text.toLowerCase())) {
      this.isAd = true;
    }

    console.info(`Got new post: ${this.id}`, this);
  };
}

export default Post;
