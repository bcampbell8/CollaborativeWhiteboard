
export default class CircularBuffer<T> {
	
	private buffer : Array<T | null>
	
	private readIndex : number = 0;
	private writeIndex : number = 0;
	
	constructor(capacity : number) {
		this.buffer = new Array<T>(capacity);
		this.buffer.fill(null);
	}
	
	read() : T | null {
		// return readIndex and increment, unless rI > buffer.capacity, in which case wrap around
		if (this.readIndex == this.writeIndex) {
			// the read pointer couldn't be moved forwards
			return null;
		}
		let value : T = this.buffer[this.readIndex];
		this.readIndex++;
		if (this.readIndex >= this.buffer.length) {
			this.readIndex %= this.buffer.length;
		}
		return value;
	}
	
	write(value : T) : void {
		// set writeIndex and increment, wrap around if over buffer.capacity
		if ((this.writeIndex + 1) == this.readIndex
		  || ((this.writeIndex + 1) == this.buffer.length && this.readIndex == 0)) {
			return;
		}
		this.buffer[this.writeIndex] = value;
		this.writeIndex++;
		if (this.writeIndex >= this.buffer.length) {
			this.writeIndex %= this.buffer.length
		}
	}
	
	getSize() {
		return this.buffer.length;
	}
}







