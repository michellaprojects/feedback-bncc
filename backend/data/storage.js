import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'feedbacks.json');

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// Read all feedbacks
export async function readFeedbacks() {
  await initDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write feedbacks
export async function writeFeedbacks(feedbacks) {
  await fs.writeFile(DATA_FILE, JSON.stringify(feedbacks, null, 2));
}

// Get single feedback by ID
export async function getFeedbackById(id) {
  const feedbacks = await readFeedbacks();
  return feedbacks.find(f => f.id === id);
}

// Add new feedback
export async function addFeedback(feedback) {
  const feedbacks = await readFeedbacks();
  const newFeedback = {
    id: Date.now().toString(),
    ...feedback,
    createdAt: new Date().toISOString(),
    status: feedback.status || 'open'
  };
  feedbacks.push(newFeedback);
  await writeFeedbacks(feedbacks);
  return newFeedback;
}

// Update feedback
export async function updateFeedback(id, updates) {
  const feedbacks = await readFeedbacks();
  const index = feedbacks.findIndex(f => f.id === id);
  if (index === -1) return null;

  feedbacks[index] = { ...feedbacks[index], ...updates };
  await writeFeedbacks(feedbacks);
  return feedbacks[index];
}

// Delete feedback
export async function deleteFeedback(id) {
  const feedbacks = await readFeedbacks();
  const filtered = feedbacks.filter(f => f.id !== id);
  if (filtered.length === feedbacks.length) return false;

  await writeFeedbacks(filtered);
  return true;
}
