// array dequeue implementation
export class ArrayDeque<T> {
  private items: T[] = [];

  addFront(item: T): void {
    this.items.unshift(item);
  }

  addBack(item: T): void {
    this.items.push(item);
  }

  removeFront(): T | undefined {
    return this.items.shift();
  }

  removeBack(): T | undefined {
    return this.items.pop();
  }

  peekFront(): T | undefined {
    return this.items[0];
  }

  peekBack(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// linked list node
export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

// linked list implementation
export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  addFront(value: T): void {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.length++;
  }

  addBack(value: T): void {
    const newNode = new ListNode(value);
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
    this.length++;
  }

  removeFront(): T | null {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.length--;
    return value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  size(): number {
    return this.length;
  }
}

// stack implementation using linked list
export class LinkedListStack<T> {
  private list: LinkedList<T> = new LinkedList<T>();

  push(value: T): void {
    this.list.addFront(value);
  }

  pop(): T | null {
    return this.list.removeFront();
  }

  peek(): T | null {
    return this.list.isEmpty() ? null : this.list['head']!.value;
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  size(): number {
    return this.list.size();
  }
}

// queue implementation using linked list
export class LinkedListQueue<T> {
  private list: LinkedList<T> = new LinkedList<T>();

  enqueue(value: T): void {
    this.list.addBack(value);
  }

  dequeue(): T | null {
    return this.list.removeFront();
  }

  peek(): T | null {
    return this.list.isEmpty() ? null : this.list['head']!.value;
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  size(): number {
    return this.list.size();
  }
}

let dequeueInstance: ArrayDeque<number> = new ArrayDeque<number>();
dequeueInstance.addBack(10);
dequeueInstance.addFront(20);
dequeueInstance.addBack(30);
dequeueInstance.removeFront(); // removes 20
dequeueInstance.removeBack(); // removes 30
console.log(dequeueInstance.peekFront()); // should print 10
console.log(dequeueInstance.peekBack()); // should print 10
