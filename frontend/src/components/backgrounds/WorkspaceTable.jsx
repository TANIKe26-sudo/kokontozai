import './WorkspaceTable.css';

export default function WorkspaceTable({ className = '' }) {
  return <div className={`workspace-table ${className}`.trim()} aria-hidden="true" />;
}
