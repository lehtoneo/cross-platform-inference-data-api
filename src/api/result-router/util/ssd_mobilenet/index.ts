var t: CocoGroundTruth[] = require('./array_grouped_coco_val_tiny.json');

const getAmountMap = (arr: number[]): Record<number, number> => {
  return arr.reduce((acc, curr) => {
    if (typeof acc[curr] === 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});
};

const validateSSDMobileNet = (input: {
  result: [number[], number[], number[], number[]];
  index: number;
}) => {
  const groundTruth = t[input.index];
  const groundTruthObjects = groundTruth.objects.map((o) => o.class_id);
  const boxes = input.result[0];
  const classes = input.result[1].map((c) => c + 1);
  const scores = input.result[2];
  const numDetections = input.result[3];

  let treshHoldDetections: number[] = [];

  scores.forEach((score, i) => {
    if (score >= 0.4) {
      // console.log(`Detected object ${classes[i]} with score: ${score}`);
      treshHoldDetections.push(classes[i]);
    }
  });

  const amountMap = getAmountMap(treshHoldDetections);
  const groundTruthAmountMap = getAmountMap(groundTruthObjects);

  let errors = false;
  Object.keys(groundTruthAmountMap).forEach((key) => {
    if (groundTruthAmountMap[key] !== amountMap[key]) {
      console.log(`Amount of detected object ${key} is not correct`);
      errors = true;
    }
  });

  return errors ? false : true;
};

const ssdMobileNetUtil = {
  validateSSDMobileNet
};

export { ssdMobileNetUtil };
