import { TILE_SIZE } from "./consts";

export function rand(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function randomWorldTiles(width, height) {
  const tiles = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.push({ id: rand(1, 11), y, x });
    }
  }
  return tiles;
}

// @todo load in chunks
export async function loadSprites(assets) {
  const loadedAssets = {};

  for (const asset in assets) {
    if (!assets.hasOwnProperty(asset)) continue;
    await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        loadedAssets[asset] = {
          img,
          w: img.width,
          h: img.height,
          s: TILE_SIZE,
        };
        resolve();
      };
      img.src = assets[asset];
    });
  }

  return loadedAssets;
}
