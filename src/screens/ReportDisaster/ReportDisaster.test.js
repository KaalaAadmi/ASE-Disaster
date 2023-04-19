import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ReportDisaster from './ReportDisaster';
import { addReport } from '../../api/Report';
import { typeOptions } from '../../components/DropdownOptions';

// Mock the addReport function from the Report API
jest.mock('../../api/Report', () => ({
  addReport: jest.fn(),
}));

describe('ReportDisaster', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders ReportDisaster with disaster type dropdown, location input, description textarea, and submit button', () => {
    render(<ReportDisaster />);
    expect(screen.getByText('Report Disaster')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Disaster Type:')).toBeInTheDocument();
    expect(screen.getByText('Location:')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('handles disaster type, location, and description input changes', () => {
    render(<ReportDisaster />);
    fireEvent.change(screen.getByLabelText('Select Disaster Type:'), {
      target: { value: typeOptions[1].value },
    });
    fireEvent.change(screen.getByPlaceholderText('Location'), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'A flood has occurred' },
    });

    expect(screen.getByLabelText('Select Disaster Type:').value).toBe(typeOptions[1].value);
    expect(screen.getByPlaceholderText('Location').value).toBe('New York');
    expect(screen.getByPlaceholderText('Description').value).toBe('A flood has occurred');
  });

  test('calls the addReport function with the correct values when submit button is clicked', async () => {
    render(<ReportDisaster />);
    fireEvent.change(screen.getByLabelText('Select Disaster Type:'), {
      target: { value: typeOptions[1].value },
    });
    fireEvent.change(screen.getByPlaceholderText('Location'), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'A flood has occurred' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(addReport).toHaveBeenCalledWith(
        typeOptions[1].value,
        expect.any(Number),
        expect.any(Number),
        'A flood has occurred',
        expect.any(String)
      )
    );
  });
});
