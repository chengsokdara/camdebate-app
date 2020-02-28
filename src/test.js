export function() {
  const speed = 30;
const standby = 10;
const distanceFilter = 0;

const kmh = Math.round(speed * 3.6);
const rounded = Math.round(speed / 5) * 5;
const squared = Math.pow(rounded, 2);
const result = squared + distanceFilter;
const countdown = result / rounded;

console.log('kmh:', kmh, 'rounded:', rounded, 'squared:', squared, 'distanceFilter:', result, 'countdown:', countdown)
}