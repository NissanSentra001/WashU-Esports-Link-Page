import React from 'react';

interface SortableElementProps {
  order?: number;
  // Custom buttons are wrapped in a <div>, which cannot take a custom `order` prop in TSX,
  // so Home passes their position as `data-order` instead.
  'data-order'?: number;
}

const orderOf = (element: React.ReactNode): number => {
  if (!React.isValidElement<SortableElementProps>(element)) return -Infinity;

  return element.props.order ?? element.props['data-order'] ?? -Infinity;
};

// this will sort in descending order because data is reverse sorted before it is rendered
const Sort = ({ children }: { children?: React.ReactNode }) => {
  const sorted = React.Children.toArray(children).sort((a, b) => {
    return orderOf(b) - orderOf(a);
  });

  return <>{sorted}</>;
};

export default Sort;
