import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {isLast || !item.href ? (
                <span className="text-muted" aria-current="page">{item.label}</span>
              ) : (
                <>
                  <Link href={item.href} style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                  <span className="text-muted" style={{ margin: '0 0.5rem' }}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
