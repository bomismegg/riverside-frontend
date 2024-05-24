import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  "Pho",
  "Banh Mi",
  "Goi Cuon",
  "Bun Cha",
  "Cao Lau",
  "Com Tam",
  "Banh Xeo",
  "Cha Ca",
  "Bun Bo Hue",
  "Mi Quang"
];

// ----------------------------------------------------------------------

export const products = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 20, max: 150, precision: 0.01 })*1000,
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 20, max: 150, precision: 0.01 })*1000,
    status: sample(['sale', 'new', '', '']),
  };
});
