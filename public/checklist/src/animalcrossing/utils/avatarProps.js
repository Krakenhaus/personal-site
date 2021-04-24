export function getAvatarProps(name, type, seen) {
  const image = seen ? `../images/${type}/${name.toLowerCase().replace(/\s/g, '')}.png` : null;
  const info = props[name.toLowerCase()] || props.default;
  const color = seen ? info.color : props.default.color;
  const height = seen ? info.height : props.default.height;
  const width = seen ? info.width : props.default.width;
  return { image, color, height, width };
}

const sizes = {
  100: {
    width: '100%',
    height: '100%',
  },
  115: {
    width: '115%',
    height: '115%',
  },
  125: {
    width: '125%',
    height: '125%',
  },
  150: {
    width: '150%',
    height: '150%',
  },
  200: {
    width: '200%',
    height: '200%',
  },
};

const props = {
  anchovy: {
    color: '#a8ebff',
    ...sizes[100],
  },
  angelfish: {
    color: '#f3de4f',
    ...sizes[125],
  },
  arapaima: {
    color: '#c4c4c4',
    ...sizes[100],
  },
  arowana: {
    color: '#fac900',
    ...sizes[115],
  },
  'barred knifejaw': {
    color: '#bebebe',
    ...sizes[115],
  },
  barreleye: {
    color: '#78d3b6',
    ...sizes[100],
  },
  betta: {
    color: '#b4c0f7',
    ...sizes[115],
  },
  bitterling: {
    color: '#f29dd0',
    ...sizes[125],
  },
  'black bass': {
    color: '#a2ba7c',
    ...sizes[115],
  },
  blowfish: {
    color: '#c8d0d8',
    ...sizes[125],
  },
  'blue marlin': {
    color: '#6baf33',
    ...sizes[100],
  },
  bluegill: {
    color: '#5ab2db',
    ...sizes[125],
  },
  'butterfly fish': {
    color: '#fcd109',
    ...sizes[125],
  },
  carp: {
    color: '#bdb8a1',
    ...sizes[100],
  },
  catfish: {
    color: '#e0d398',
    ...sizes[100],
  },
  char: {
    color: '#ff794d',
    ...sizes[100],
  },
  'cherry salmon': {
    color: '#e1a4b0',
    ...sizes[100],
  },
  'clown fish': {
    color: '#fff1cc',
    ...sizes[150],
  },
  coelacanth: {
    color: '#80d3d3',
    ...sizes[100],
  },
  crawfish: {
    color: '#dfa271',
    ...sizes[115],
  },
  'crucian carp': {
    color: '#8f8f6d',
    ...sizes[125],
  },
  dab: {
    color: '#d7c759',
    ...sizes[115],
  },
  dace: {
    color: '#f09b35',
    ...sizes[115],
  },
  dorado: {
    color: '#c7c324',
    ...sizes[100],
  },
  'football fish': {
    color: '#9d9ce6',
    ...sizes[100],
  },
  'freshwater goby': {
    color: '#b7af5d',
    ...sizes[125],
  },
  frog: {
    color: '#9ac416',
    ...sizes[125],
  },
  gar: {
    color: '#e6cd83',
    ...sizes[100],
  },
  'giant snakehead': {
    color: '#d3cab2',
    ...sizes[100],
  },
  'giant trevally': {
    color: '#a8d1d1',
    ...sizes[100],
  },
  'golden trout': {
    color: '#c9672f',
    ...sizes[100],
  },
  goldfish: {
    color: '#c1241c',
    ...sizes[150],
  },
  'great white shark': {
    color: '#b3c8cc',
    ...sizes[100],
  },
  guppy: {
    color: '#aef5ea',
    ...sizes[125],
  },
  'hammerhead shark': {
    color: '#efe3df',
    ...sizes[100],
  },
  'horse mackerel': {
    color: '#f0f000',
    ...sizes[115],
  },
  killifish: {
    color: '#c0d8c0',
    ...sizes[150],
  },
  'king salmon': {
    color: '#c9e2ea',
    ...sizes[100],
  },
  koi: {
    color: '#eae9cc',
    ...sizes[100],
  },
  loach: {
    color: '#d1c08d',
    ...sizes[115],
  },
  'mahi-mahi': {
    color: '#4ad699',
    ...sizes[100],
  },
  'mitten crab': {
    color: '#cbaa79',
    ...sizes[125],
  },
  'moray eel': {
    color: '#e9bf02',
    ...sizes[115],
  },
  napoleonfish: {
    color: '#78ebf4',
    ...sizes[100],
  },
  'neon tetra': {
    color: '#f64c4c',
    ...sizes[150],
  },
  'nibble fish': {
    color: '#e7dfa5',
    ...sizes[100],
  },
  oarfish: {
    color: '#d7efef',
    ...sizes[100],
  },
  'ocean sunfish': {
    color: '#a5e9e9',
    ...sizes[100],
  },
  'olive flounder': {
    color: '#c68421',
    ...sizes[100],
  },
  'pale chub': {
    color: '#90e5ff',
    ...sizes[125],
  },
  'puffer fish': {
    color: '#c4cce5',
    ...sizes[125],
  },
  pike: {
    color: '#c4d5a2',
    ...sizes[100],
  },
  piranha: {
    color: '#ccdd33',
    ...sizes[125],
  },
  'pond smelt': {
    color: '#cec65a',
    ...sizes[125],
  },
  'pop-eyed goldfish': {
    color: '#949472',
    ...sizes[125],
  },
  rainbowfish: {
    color: '#e3e3b5',
    ...sizes[115],
  },
  'ranchu goldfish': {
    color: '#dfb576',
    ...sizes[115],
  },
  ray: {
    color: '#f5d318',
    ...sizes[100],
  },
  'red snapper': {
    color: '#f8be9d',
    ...sizes[100],
  },
  'ribbon eel': {
    color: '#e5e5c3',
    ...sizes[100],
  },
  'saddled bichir': {
    color: '#d5b391',
    ...sizes[100],
  },
  salmon: {
    color: '#d15e66',
    ...sizes[100],
  },
  'saw shark': {
    color: '#deab9a',
    ...sizes[100],
  },
  'sea bass': {
    color: '#b2d46e',
    ...sizes[100],
  },
  'sea butterfly': {
    color: '#ffe52a',
    ...sizes[150],
  },
  'sea horse': {
    color: '#e7746b',
    ...sizes[150],
  },
  'snapping turtle': {
    color: '#c19c66',
    ...sizes[100],
  },
  'soft-shelled turtle': {
    color: '#e9e983',
    ...sizes[100],
  },
  squid: {
    color: '#d3ba88',
    ...sizes[115],
  },
  stringfish: {
    color: '#d8d8b6',
    ...sizes[100],
  },
  sturgeon: {
    color: '#c9bcb5',
    ...sizes[100],
  },
  suckerfish: {
    color: '#c2bfc4',
    ...sizes[115],
  },
  surgeonfish: {
    color: '#99ee99',
    ...sizes[125],
  },
  sweetfish: {
    color: '#e6f709',
    ...sizes[100],
  },
  tadpole: {
    color: '#d8d8c7',
    ...sizes[150],
  },
  tilapia: {
    color: '#b584c2',
    ...sizes[100],
  },
  tuna: {
    color: '#cba900',
    ...sizes[100],
  },
  'whale shark': {
    color: '#cdbcab',
    ...sizes[100],
  },
  'yellow perch': {
    color: '#90e56e',
    ...sizes[115],
  },
  'zebra turkeyfish': {
    color: '#dd9966',
    ...sizes[115],
  },
  default: {
    color: '#bdbdbd',
    ...sizes[100],
  },
};
