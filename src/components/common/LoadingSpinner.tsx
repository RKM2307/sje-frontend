export function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-blue rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}
