import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect } from 'react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  useEffect(() => {
    // Generate BreadcrumbList Schema.org structured data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://srijayavarmanelectricals.com/"
        },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": item.label,
          "item": item.path ? `https://srijayavarmanelectricals.com${item.path}` : undefined
        }))
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.text = JSON.stringify(schemaData);

    const existing = document.getElementById('breadcrumb-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('breadcrumb-schema');
      if (el) el.remove();
    };
  }, [items]);

  return (
    <nav className="flex items-center text-xs md:text-sm text-slate-500 py-3 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
      <Link to="/" className="inline-flex items-center hover:text-brand-blue transition-colors">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 flex-shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-brand-blue font-medium transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold truncate max-w-[200px] md:max-w-none">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
