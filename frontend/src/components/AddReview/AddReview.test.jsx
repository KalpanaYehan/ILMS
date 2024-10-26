import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddReview from './AddReview';
import axios from 'axios';
import { describe, vi, it, beforeEach, afterEach, expect } from 'vitest';

vi.mock('axios');

describe('AddReview Component', () => {
  const mockOnClose = vi.fn();
  const mockOnReviewSubmit = vi.fn();

  beforeEach(() => {
    render(
      <AddReview
        titleId="T001"
        memberName="John Doe"
        onClose={mockOnClose}
        onReviewSubmit={mockOnReviewSubmit}
      />
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders AddReview modal', () => {
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('renders review input and allows typing', () => {
    const reviewInput = screen.getByTestId('review-text');
    fireEvent.change(reviewInput, { target: { value: 'Great book!' } });
    expect(reviewInput.value).toBe('Great book!');
  });

  it('renders rating input and allows typing', () => {
    const ratingInput = screen.getByTestId('rating');
    fireEvent.change(ratingInput, { target: { value: '4.5' } });
    expect(ratingInput.value).toBe('4.5');
  });

  it('calls onClose when the cancel button is clicked', () => {
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('submits review form with correct data and calls onReviewSubmit', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Review added successfully' } });

    fireEvent.change(screen.getByTestId('review-text'), { target: { value: 'Fantastic read!' } });
    fireEvent.change(screen.getByTestId('rating'), { target: { value: '5' } });

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/reviews', {
        Title_ID: 'T001',
        Member_ID: 'John Doe',
        Rating: '5',
        Review_Text: 'Fantastic read!',
        Review_Date: expect.any(String),
      });
      expect(mockOnReviewSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});