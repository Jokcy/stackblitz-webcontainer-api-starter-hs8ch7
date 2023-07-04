const decoder = new TextDecoder('utf-8');
const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
let result = '';

export const writableStream = new WritableStream(
  {
    // Implement the sink
    write(chunk) {
      return new Promise((resolve, reject) => {
        const buffer = new ArrayBuffer(1);
        const view = new Uint8Array(buffer);
        view[0] = chunk;
        const decoded = decoder.decode(view, { stream: true });
        // const listItem = document.createElement("li");
        // listItem.textContent = `Chunk decoded: ${decoded}`;
        // list.appendChild(listItem);
        result += decoded;
        console.log('=====>', result);
        resolve();
      });
    },
    close() {
      const listItem = document.createElement('li');
      listItem.textContent = `[MESSAGE RECEIVED] ${result}`;
      list.appendChild(listItem);
    },
    abort(err) {
      console.log('Sink error:', err);
    },
  },
  queuingStrategy
);
