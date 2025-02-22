import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App';
import { unselectAll } from '../../store/selectedItemSlice';
import FileSaver from 'file-saver';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

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
    FileSaver.saveAs(blob, `${selectedItems.length}_heroes.csv`);
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
    </div>
  );
}
