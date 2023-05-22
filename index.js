const player = document.querySelector('video');
const src = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_10MB.mp4";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// exports.init
// exports.load
// exports.getDuration
// exports.getSize
// exports.getFrameData
// exports.getNextFrame
// exports.getPreviousFrame
// exports.seekToFrameNumber
// exports.seekTo
// exports.play
// exports.pause
// exports.getFrameNumber

async function load(src) {
  const response = await fetch(src, {
    mode: 'no-cors',
  });
  const buffer = await response.arrayBuffer();
  const data = new Uint8Array(buffer);

  return data;
}

async function init() {

  load(src).then(async(data) => {
    const module = await WebAssembly.instantiateStreaming(fetch('./main.wasm'))
    const memory = module.instance.exports.memory;
    const exports = module.instance.exports;

    exports.init(src);

    //const frame = exports.getFrameData();

    console.log(frame, memory);

    canvas.width = exports.getSize()[0];
    canvas.height = exports.getSize()[1];
  })

}

init().catch(console.error);
