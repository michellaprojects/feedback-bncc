import express from 'express';
import {
  getAllFeedbacks,
  getFeedback,
  createFeedback,
  updateFeedbackData,
  deleteFeedbackData
} from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/', getAllFeedbacks);
router.get('/:id', getFeedback);
router.post('/', createFeedback);
router.put('/:id', updateFeedbackData);
router.delete('/:id', deleteFeedbackData);

export default router;
