class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  class Queue {
    constructor() {
      this.front = null;
      this.back = null;
    }
  
    enqueue(value) {
      const node = new Node(value);
      if (!this.front) {
        this.front = node;
        this.back = node;
      }
      this.back.next = node;
      this.back = node;
    }
  
    dequeue() {
      if (!this.front) {
        return 'Queue is empty';
      }
      const temp = this.front;
      this.front = this.front.next;
      temp.next = null;
      if (!this.front) {
        this.back = null;
      }
      return temp.value;
    }
  
    peek() {
      if (!this.front) {
        throw new Error('Queue is empty');
      }
      return this.front.value;
    }
  
    isEmpty() {
      return this.front = null;
    }

  }
  
  module.exports = { Queue };
  