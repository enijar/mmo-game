import { TILE_SIZE } from "./consts";
import settings from "./settings";
import state from "./state";

export default function createCamera(canvas) {
  function onKeyDown(event) {
    const key = event.key.toLowerCase();
    if (!state.pressedKeys.includes(key)) state.pressedKeys.push(key);
  }

  function onKeyUp(event) {
    const key = event.key.toLowerCase();
    const keyIndex = state.pressedKeys.indexOf(key);
    if (keyIndex > -1) state.pressedKeys.splice(keyIndex, 1);
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return {
    update() {
      const screenMaxX = Math.ceil(canvas.element.width / TILE_SIZE);
      const screenMaxY = Math.ceil(canvas.element.height / TILE_SIZE);

      state.pressedKeys.forEach((pressedKey) => {
        if (pressedKey === "w") {
          state.camera.y = Math.max(state.camera.y - 1, 0);
        }
        if (pressedKey === "s") {
          state.camera.y = Math.min(
            state.camera.y + 1,
            settings.world.height - screenMaxY
          );
        }
        if (pressedKey === "a") {
          state.camera.x = Math.max(state.camera.x - 1, 0);
        }
        if (pressedKey === "d") {
          state.camera.x = Math.min(
            state.camera.x + 1,
            settings.world.width - screenMaxX
          );
        }
      });
    },
    destroy() {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    },
  };
}
