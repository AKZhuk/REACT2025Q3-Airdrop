'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearItems } from '../../store/selectedItemsSlice';
import { downloadCSV } from '../../utils/downloadCSV';
import './SelectedFlyout.css';

const SelectedFlyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const [downloading, setDownloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClear = () => {
    dispatch(clearItems());
  };

  const handleDownload = async () => {
    if (selectedItems.length === 0 || downloading) return;

    setErrorMsg(null);
    setDownloading(true);
    try {
      await downloadCSV(selectedItems);
    } catch {
      setErrorMsg('Failed to export CSV');
    } finally {
      setDownloading(false);
    }
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <span>{selectedItems.length} item(s) selected</span>
      <div className="flyout__buttons">
        <button onClick={handleClear}>Unselect all</button>
        <button onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Downloading…' : 'Download'}
        </button>
      </div>
      {errorMsg && (
        <span role="alert" style={{ marginLeft: '1rem' }}>
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export default SelectedFlyout;
