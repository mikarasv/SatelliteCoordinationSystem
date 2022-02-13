import React from "react";
import { render } from '@testing-library/react';
import Search from './Search.js';

test('render Search Bar', () => {
  const component = render(<Search/>)
});
