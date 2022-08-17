class Dot {

	constructor(x, y, size, color) {
		this.x = x;
		this.y = y;
		this._size = size;
		this._color = color;
		// console.log(x, y, size, color);
	}

	draw() {
		fill(this._color.r, this._color.g, this._color.b);
		circle(this.x, this.y, this._size);
	}


	getSize() {
		return this._size;
	}

	setSize(newSize) {
		let curSize = this._size;
		this._size = lerp(curSize, newSize, .05);		
	}

	getColor() {
		return this._color;
	}

	setColor(newColor) {
		this._color = newColor;
	}

}