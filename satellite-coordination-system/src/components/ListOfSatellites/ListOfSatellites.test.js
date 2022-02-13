import React from "react";
import { render } from '@testing-library/react';
import ListOfSatellites from './ListOfSatellites.js';

test('render ListOfSatellites', () => {
  const component = render(<ListOfSatellites/>)
  component.getByText("Name")
  component.getByText("UTC Date")
  component.getByText("Patch")
  component.getByText("Successful")
  component.getByText("More")
  component.getByText("Click on calendar or search for satellites launched after utc date:")
  component.getByText("Show only successful satellites")
});
