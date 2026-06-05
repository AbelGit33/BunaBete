const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const query = category ? { category } : {};
    const articles = await Article.find(query)
      .sort('-publishedAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getFeaturedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isFeatured: true })
      .sort('-publishedAt')
      .limit(10);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getArticlesByCategory = async (req, res) => {
  try {
    const articles = await Article.find({ category: req.params.category })
      .sort('-publishedAt')
      .limit(50);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
