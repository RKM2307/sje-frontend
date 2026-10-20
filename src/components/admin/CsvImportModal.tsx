import { useState } from 'react';
import { X, Download, Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { exportCsvBlob, importCsvFile } from '../../api/admin';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CsvImportModal({ isOpen, onClose, onSuccess }: CsvImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadTemplate = async () => {
    setDownloading(true);
    try {
      const blob = await exportCsvBlob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sri_jayavarman_electricals_inventory_50_parts.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(`Failed to download CSV: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a .csv file to import.');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const data = await importCsvFile(file);
      setResult(data);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'CSV import failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 text-base">
              CSV Inventory Import & Export
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-4 space-y-6">
          
          {/* Step 1: Download 50-Part Template */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Step 1: Download Standard 50-Part Spreadsheet
            </h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Downloads the complete template prefilled with all 50 reference IDs and required columns: Diameter, Inner/Outer Dia, Length, Material, Price, Stock & Verified status.
            </p>
            <button
              onClick={handleDownloadTemplate}
              disabled={downloading}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-brand-yellow" />
              <span>{downloading ? 'Generating Template...' : 'Download 50-Part CSV Template'}</span>
            </button>
          </div>

          {/* Step 2: Upload CSV */}
          <form onSubmit={handleUpload} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Step 2: Upload Verified CSV File
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Update catalogue attributes, add sizes and dimensions, and publish verified products in bulk.
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-100/60 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-file-input"
              />
              <label htmlFor="csv-file-input" className="cursor-pointer block space-y-1">
                <Upload className="w-6 h-6 text-brand-blue mx-auto" />
                <span className="text-xs font-semibold text-brand-blue block">
                  {file ? file.name : 'Choose CSV File from your computer'}
                </span>
                <span className="text-[11px] text-slate-400 block">Only .csv format supported</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Processing Import...' : 'Import and Update Catalogue'}</span>
            </button>
          </form>

          {/* Import Results Feedback */}
          {result && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs space-y-2">
              <div className="flex items-center space-x-2 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Import Completed Successfully!</span>
              </div>
              <p>Products Updated: <strong>{result.products_updated}</strong></p>
              <p>Size Variants Created: <strong>{result.variants_created}</strong></p>
              {result.errors && result.errors.length > 0 && (
                <div className="mt-2 text-rose-700 bg-rose-50 p-2 rounded">
                  <p className="font-semibold">Notices / Warnings ({result.errors.length}):</p>
                  <ul className="list-disc pl-4 text-[11px] space-y-0.5">
                    {result.errors.slice(0, 5).map((err: string, i: number) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
