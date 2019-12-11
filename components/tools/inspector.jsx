// ∆
import React from 'react';
import { prettyPrint } from 'arkade/utils/text-utils';

export const Inspector = ({ data, style = {}, ...rest }) => (
  <pre {...rest} style={{ maxWidth: '100%', whiteSpace: 'pre-wrap', ...style }}><code>{prettyPrint(data)}</code></pre>
);
