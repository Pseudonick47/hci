import * as _ from 'lodash';

class Queue {
  storage = [];

  enqueue(item) {
    this.storage.push(item);
  }

  dequeue() {
    const item = _.head(this.storage);
    this.storage.splice(0, 1);
    return item;
  }

  isEmpty() {
    return this.storage.length === 0;
  }
}

const queue = new Queue();

export {
  queue,
};
