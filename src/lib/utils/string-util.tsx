import './truncate.css';

export const truncateContent = (content: string) => {
  return (
    <div className="truncate">
      {content}
    </div>
  );
};