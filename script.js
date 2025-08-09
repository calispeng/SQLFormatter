document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formatBtn').addEventListener('click', formatSQL);
  });
  
  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  
  function formatSQL() {
    let sql = document.getElementById('inputSql').value;
  
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
      'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES',
      'UPDATE', 'SET', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'UNION', 'AND', 'OR', 'AS', 'IN', 'IS', 'NULL'
    ];
  
    // Insert line breaks before keywords for formatting
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      sql = sql.replace(regex, '\n' + keyword.toUpperCase());
    });
  
    sql = sql.replace(/\s+\n/g, '\n');
    sql = sql.replace(/\n\s+/g, '\n');
    sql = sql.replace(/\n{2,}/g, '\n');
    sql = sql.trim();
  
    const lines = sql.split('\n');
    let indentLevel = 0;
    const indentStep = '  ';
    const indentedLines = lines.map(line => {
      line = line.trim();
  
      if (/^(WHERE|GROUP BY|ORDER BY|HAVING|LIMIT)/.test(line)) indentLevel = 1;
      if (/JOIN/.test(line)) indentLevel = 2;
      if (/^(SELECT|INSERT INTO|UPDATE|DELETE|AS|CREATE|ALTER|DROP|UNION)/.test(line)) indentLevel = 0;
  
      return indentStep.repeat(indentLevel) + line;
    });
  
    const formattedSql = indentedLines.join('\n');
  
    // Escape HTML entities
    let escapedSql = escapeHtml(formattedSql);
  
    // Highlight operators 
    escapedSql = escapedSql.replace(/(<=|>=|<>|!=|=|<|>)/g, '<span class="operator">$1</span>');
  
    // Highlight comments
    escapedSql = escapedSql.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
    escapedSql = escapedSql.replace(/(--.*?$)/gm, '<span class="comment">$1</span>');
  
    // Highlight strings
    escapedSql = escapedSql.replace(/('[^']*')/g, '<span class="string">$1</span>');
  
    // Highlight numbers
    escapedSql = escapedSql.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>');
  
    // Highlight keywords
    keywords.forEach(keyword => {
      const kwRegex = new RegExp(`\\b${keyword}\\b`, 'gi');
      escapedSql = escapedSql.replace(kwRegex, `<span class="keyword">${keyword.toUpperCase()}</span>`);
    });
  
    document.getElementById('outputSql').innerHTML = escapedSql;
  }

 
  function copyToClipboard() {
    const copyElem = document.getElementById('outputSql');
    const textToCopy = copyElem.innerText || copyElem.textContent;
  
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Formatted SQL copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy text: ', err);
    });
  }
