const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require("@testing-library/jest-dom");
require("whatwg-fetch");
class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
    this.onmessage = null;
  }

  postMessage(message) {
    if (this.onmessage) {
      this.onmessage({ data: message });
    }
  }

  close() {}
}

global.BroadcastChannel = MockBroadcastChannel;

const { TransformStream } = require("web-streams-polyfill");
global.TransformStream = TransformStream;
