let m, b;

const xs = [];
const ys = [];

const learningRate = 0.01;
const optimizer = tf.train.sgd(learningRate);

function setup() {
	createCanvas(400, 400);

	// counter = 60;
	// gravity = 5;
	// noLoop();

	strokeWeight(2);

	//   points = localStorage['points'] ? JSON.parse(localStorage['points']) : [];

	//   points.forEach((point) => circle(point.mouseX, point.mouseY, 5));

	m = tf.variable(tf.scalar(random()));
	//   console.log(m);

	b = tf.variable(tf.scalar(random()));
	//   console.log(b);

	// y = mx + b

	//   const xs = tf.tensor1d([1, 2, 3]);

	//   const ys = xs.mul(m).add(b);

	//   xs.print();
	//   ys.print();

	//   
	// console.log(m.value);

	//   const m 
	//   console.log(`y=${m}x + ${b}`);
}


function loss(pred, labels) {
	return pred.sub(labels).square().mean();
}


function predict(xs) {
	const tfxs = tf.tensor1d(xs);

	// y = mx + b
	const ys = tfxs.mul(m).add(b);
	
	return ys;
}


function draw() {
	background(0);

	if (xs.length > 0) {
		optimizer.minimize(() => {
			const theLoss = loss(predict(xs), tf.tensor1d(ys))
			// console.log(typeof theLoss);
			return theLoss;
		})
	}

	xs.forEach((x, i) => {

		let x_scaled = map(x, 0, 1, 0, width);
		let y_scaled = map(ys[i], 0, 1, height, 0);
		circle(x_scaled, y_scaled, 5)

	})

	const pred_ys = predict([0, 1]);
	const y_vals = pred_ys.dataSync();

	let x1 = map(0, 0, 1, 0, width);
	let y1 = map(y_vals[0], 0, 1, height, 0);

	let x2 = map(1, 0, 1, 0, width);
	let y2 = map(y_vals[1], 0, 1, height, 0);

	// console.log({x1, y1, x2, y2});
	stroke(100);
	line(x1, y1, x2, y2);


}

function mouseClicked() {
	// background(0);
	//   circle(mouseX, mouseY, 5);
	//   points.push({ mouseX, mouseY });
	//   localStorage['points'] = JSON.stringify(points);

	let x = map(mouseX, 0, width, 0, 1)
	let y = map(mouseY, 0, height, 1, 0)

	xs.push(x);
	ys.push(y);

}
