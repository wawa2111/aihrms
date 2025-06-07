import React from 'react';

function AccessibleTable({ caption, headers, data, ariaLabel }) {
  return (
    <div className="overflow-x-auto">
      <table className="accessible-table" aria-label={ariaLabel || caption}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccessibleTable;