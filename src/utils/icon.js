import { defineAsyncComponent } from 'vue';

// Every Lucide icon becomes a separate tiny chunk, only icons that are actually rendered get loaded
const iconLoaders = import.meta.glob([
  '/node_modules/@lucide/vue/dist/esm/icons/*.mjs',
  '!/node_modules/@lucide/vue/dist/esm/icons/index.mjs'
]);

// 'arrow-right', 'ArrowRight', 'arrowRight', 'ArrowRightIcon', 'LucideArrowRight' -> 'arrowright'
const normalizeName = (name) =>
  name
    .replace(/^Lucide(?=[A-Z])/, '')
    .replace(/Icon$/, '')
    .replace(/[-_\s]/g, '')
    .toLowerCase();

const loadersByName = Object.fromEntries(
  Object.entries(iconLoaders).map(([path, loader]) => [
    normalizeName(path.split('/').pop().replace('.mjs', '')),
    loader
  ])
);

const cache = new Map();

// Names as on https://lucide.dev/icons, e.g. getIcon('house'), getIcon('ChevronDown')
export const getIcon = (name) => {
  if (!name) return null;

  const key = normalizeName(name);
  if (cache.has(key)) return cache.get(key);

  const loader = loadersByName[key];
  if (!loader) {
    if (import.meta.env.DEV) console.warn(`[getIcon] Unknown Lucide icon: "${name}"`);
    return null;
  }

  const icon = defineAsyncComponent(() => loader().then((module) => module.default));
  cache.set(key, icon);
  return icon;
};
