<template>
  <div>
    <h3>
      A very simple random maze with at least 1 solution from left to right.
    </h3>
    <button @click="regenerate">Regenerate</button>
    <label
      ><input
        type="checkbox"
        v-model="isAnswerVisible"
        @change="showAnswer"
      />Show a solution</label
    >
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MazeCreator from "./maze-creator";
let mazeCreator: MazeCreator;

export default defineComponent({
  name: "Maze",
  props: {},
  data() {
    return {
      isAnswerVisible: false,
    };
  },
  methods: {
    regenerate() {
      mazeCreator.generate();
      mazeCreator.render();
    },
    showAnswer() {
      mazeCreator.isAnswerShown = !mazeCreator.isAnswerShown;
      mazeCreator.render();
    },
  },
  mounted() {
    setTimeout(() => {
      const canvas = <HTMLCanvasElement>document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      mazeCreator = new MazeCreator(ctx);
      mazeCreator.setup(250, 250);

      let scale = window.devicePixelRatio;

      canvas.width = 1000 * scale;
      canvas.height = 1000 * scale;

      // Normalize coordinate system to use css pixels.
      ctx.scale(scale, scale);

      mazeCreator.generate();

      mazeCreator.render();
    }, 10);
  },
});
</script>

<style scoped>
#canvas {
  width: 1000px;
  height: 1000px;
  display: block;
}
</style>
