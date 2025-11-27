import {
  readFeedbacks,
  getFeedbackById,
  addFeedback,
  updateFeedback,
  deleteFeedback
} from '../data/storage.js';

// GET all feedbacks with optional filtering
export const getAllFeedbacks = async (req, res) => {
  try {
    let feedbacks = await readFeedbacks();

    // Filter by status if provided
    const { status, division, search } = req.query;

    if (status) {
      feedbacks = feedbacks.filter(f => f.status === status);
    }

    if (division) {
      feedbacks = feedbacks.filter(f => f.division === division);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      feedbacks = feedbacks.filter(f =>
        f.name.toLowerCase().includes(searchLower) ||
        f.email.toLowerCase().includes(searchLower) ||
        f.eventName.toLowerCase().includes(searchLower) ||
        (f.comment && f.comment.toLowerCase().includes(searchLower)) ||
        (f.suggestion && f.suggestion.toLowerCase().includes(searchLower))
      );
    }

    // Sort by createdAt descending (newest first)
    feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

// GET single feedback by ID
export const getFeedback = async (req, res) => {
  try {
    const feedback = await getFeedbackById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

// POST create new feedback
export const createFeedback = async (req, res) => {
  try {
    const { name, email, eventName, division, rating, comment, suggestion } = req.body;

    // Validation
    if (!name || !email || !eventName || !division || !rating) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, eventName, division, rating'
      });
    }

    if (!['LnT', 'EEO', 'PR', 'HRD', 'RnD'].includes(division)) {
      return res.status(400).json({
        error: 'Invalid division. Must be one of: LnT, EEO, PR, HRD, RnD'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const newFeedback = await addFeedback({
      name,
      email,
      eventName,
      division,
      rating: Number(rating),
      comment: comment || '',
      suggestion: suggestion || ''
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create feedback' });
  }
};

// PUT update feedback
export const updateFeedbackData = async (req, res) => {
  try {
    const updated = await updateFeedback(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

// DELETE feedback
export const deleteFeedbackData = async (req, res) => {
  try {
    const deleted = await deleteFeedback(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};
