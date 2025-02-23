import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App';
import { unselectAll } from '../../store/selectedItemSlice';

import { useRef, useState } from 'react';
import { createDownloadUrl, revokeDownloadUrl } from '../../utils/FileSaver';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const url = createDownloadUrl(selectedItems);
    setDownloadUrl(url);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        revokeDownloadUrl(url);
        setDownloadUrl('');
      }
    }, 0);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '600px',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      <span>Selected Items: {selectedItems.length}</span>
      <button className="unselect-button" onClick={handleUnselectAll}>
        UnselectAll
      </button>
      <button className="download-button" onClick={handleDownload}>
        Download selected
      </button>
      <a
        ref={downloadRef}
        href={downloadUrl}
        download={`${selectedItems.length}_heroes.csv`}
        style={{ display: 'none' }}
      >
        Download
      </a>
    </div>
  );
}
