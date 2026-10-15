export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="page-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {children && <div className="page-header__intro">{children}</div>}
    </header>
  )
}
