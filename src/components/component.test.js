// Test for Rendering
import { render, screen } from '@testing-library/react';
import AddAlbumForm from './AddAlbumForm';
import userEvent from '@testing-library/user-event';

test('renders AddAlbumForm', () => {
  render(<AddAlbumForm onAddAlbum={() => {}} />);
  expect(screen.getByPlaceholderText('Album Name')).toBeInTheDocument();
  expect(screen.getByText('Create Album')).toBeInTheDocument();
});

// Test for Input Change and Validation Message
import { render, screen, fireEvent } from '@testing-library/react';
import AddAlbumForm from './AddAlbumForm';

test('updates input value and displays validation message', () => {
  render(<AddAlbumForm onAddAlbum={() => {}} />);
  const input = screen.getByPlaceholderText('Album Name');
  fireEvent.change(input, { target: { value: 'ab' } });
  expect(input.value).toBe('ab');
  expect(screen.getByText('Album name must be at least 3 characters long.')).toBeInTheDocument();
});

// Test for Successful Form Submission
import { render, screen, fireEvent } from '@testing-library/react';
import AddAlbumForm from './AddAlbumForm';

test('handles form submission successfully', async () => {
  const mockOnAddAlbum = jest.fn();
  render(<AddAlbumForm onAddAlbum={mockOnAddAlbum} />);
  const input = screen.getByPlaceholderText('Album Name');
  fireEvent.change(input, { target: { value: 'New Album' } });
  fireEvent.click(screen.getByText('Create Album'));
  expect(mockOnAddAlbum).toHaveBeenCalledWith('New Album');
});

