import React from 'react';

const copyToClipboard = (content) => {
  const el = document.createElement('textarea');
  el.value = content;

  document.body.appendChild(el);

  el.select();

  document.execCommand('copy');
  document.body.removeChild(el);
};

export default ({ content, children, onClick }) => {
  return (
    <span
      className="copy-text"
      onClick={() => {
        copyToClipboard(content);
        onClick();
      }}
    >
      {children}
    </span>
  );
};
