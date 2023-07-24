const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const tmpPath = path.resolve(__dirname, "tmp_frames");
const outFramesPath = path.resolve(__dirname, "out_frames");

if (!fs.existsSync(tmpPath)) {
  fs.mkdirSync(tmpPath);
}
if (!fs.existsSync(outFramesPath)) {
  fs.mkdirSync(outFramesPath);
}
function getTmpFrames() {
  const str = `-i onepiece_demo.mp4 -qscale:v 1 -qmin 1 -qmax 1 -vsync 0 ${path.resolve(
    tmpPath,
    `frame%08d.png`
  )}`;

  const tmpProcess = spawn("ffmpeg", str.split(" "), {
    cwd: "./soft/realesrgan-ncnn-vulkan-20220424-windows",
  });
  bindEvent(tmpProcess);
}

function getOutFrames() {
  const str = `-i ${tmpPath} -o ${outFramesPath} -n realesr-animevideov3 -s 2 -f jpg`;

  const outProcess = spawn(
    path.resolve(
      "./soft/realesrgan-ncnn-vulkan-20220424-windows/realesrgan-ncnn-vulkan.exe"
    ),
    str.split(" "),
    {}
  );
  bindEvent(outProcess);
}
// getOutFrames();

// ffmpeg -r 23.98 -i out_frames/frame%08d.jpg -c:v libx264 -r 23.98 -pix_fmt yuv420p   output.mp4
function outputVideo() {
  const str = `-r 23.98 -i ${path.resolve(
    outFramesPath,
    "frame%08d.jpg"
  )} -c:v libx264 -r 23.98 -pix_fmt yuv420p output.mp4`;

  const outputProcess = spawn("ffmpeg", str.split(" "), {});

  bindEvent(outputProcess);
}
outputVideo();

function bindEvent(childProcess) {
  childProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  childProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
}
