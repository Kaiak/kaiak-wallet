import type { NavigationState } from './NavigationState';
import { navigationStore } from '../stores/stores';

export class NavigationStack {
  private readonly data: NavigationState[] = [];
  private top: number = 0;

  constructor() {
    this.data = [];
    this.top = 0;
  }

  push(state: NavigationState): void {
    this.data[this.top] = state;
    this.top = this.top + 1;
    navigationStore.set(state);
  }

  pushOn(patcher: (n: NavigationState | undefined) => NavigationState): void {
    const current = this.peek();
    this.push(patcher(current));
  }

  length(): number {
    return this.top;
  }

  peek(): NavigationState | undefined {
    return this.data[this.top - 1];
  }

  isEmpty(): boolean {
    return this.top === 0;
  }

  pop(): NavigationState | undefined {
    if (!this.isEmpty()) {
      this.top = this.top - 1;
      const popped = this.data.pop();
      navigationStore.set(this.peek());
      return popped;
    } else {
      return undefined;
    }
  }

  print() {
    let top = this.top - 1;
    while (top >= 0) {
      // print upto 0th index
      console.log(this.data[top]);
      top--;
    }
  }
  reverse() {
    this.stackReverse(this.top - 1);
  }

  private stackReverse(index) {
    if (index != 0) {
      this.stackReverse(index - 1);
    }
    console.log(this.data[index]);
  }
}
