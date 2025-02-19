import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App';
import { unselectAll } from '../../store/selectedItemSlice';
import { useRef } from 'react';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const convertToCSV = () => {
    const header = Object.keys(selectedItems[0]).join(',');
    const rows = selectedItems.map((row) => Object.values(row).join(','));
    return [header, ...rows].join('\n');
  };

  const handleDownload = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.setAttribute(
        'download',
        `${selectedItems.length}_heroes.csv`
      );
      linkRef.current.click();
    }
  };

  if (selectedItems.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '600px',
        justifyContent: 'space-between',
      }}
    >
      <span>Selected Items: {selectedItems.length}</span>
      <button onClick={handleUnselectAll}>UnselectAll</button>
      <button onClick={handleDownload}>Download selected</button>
      <a ref={linkRef} style={{ display: 'none' }}>
        Download
      </a>
    </div>
  );
}
