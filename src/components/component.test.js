// Imports for all tests
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddAlbumForm from './AddAlbumForm';

// Test for Rendering
test('renders AddAlbumForm', async () => {
  render(<AddAlbumForm onAddAlbum={() => {}} />);
  expect(screen.getByPlaceholderText('Album Name')).toBeInTheDocument();
  expect(screen.getByText('Create Album')).toBeInTheDocument();
});

// Test for Input Change and Validation Message
test('updates input value and displays validation message', async () => {
  render(<AddAlbumForm onAddAlbum={() => {}} />);
  const input = screen.getByPlaceholderText('Album Name');
  
  await userEvent.type(input, 'ab'); 
  
  expect(input.value).toBe('ab');
  expect(screen.getByText('Album name must be at least 3 characters long.')).toBeInTheDocument();
});

// Test for Successful Form Submission
test('handles form submission successfully', async () => {
  const mockOnAddAlbum = jest.fn();
  render(<AddAlbumForm onAddAlbum={mockOnAddAlbum} />);
  
  const input = screen.getByPlaceholderText('Album Name');
  await userEvent.type(input, 'New Album'); 
  
  await userEvent.click(screen.getByText('Create Album')); 
  
  expect(mockOnAddAlbum).toHaveBeenCalledWith('New Album'); 
});
