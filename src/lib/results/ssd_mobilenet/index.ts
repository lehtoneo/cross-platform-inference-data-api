import { getAmountMap } from '@/lib/util/common';
import { SendResultsBodySchema } from '../common';
import { z } from 'zod';
import sharp from 'sharp';
import { BoundingBox, CocoGroundTruth } from './types';

const numberArray = z.array(z.number());

export const SsdMobileNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    output: z.tuple([numberArray, numberArray, numberArray, numberArray])
  })
);

type SsdMobileNetResultBody = z.infer<typeof SsdMobileNetResultBodySchema>;

var t: CocoGroundTruth[] = require('./array_grouped_coco_val_tiny.json');

const validateSSDMobileNet = (body: SsdMobileNetResultBody) => {
  const o = body.output;

  if (body.inputIndex === 0) {
    console.log(o);
  }
  const groundTruth = t[body.inputIndex];
  const groundTruthObjects = groundTruth.objects.map((o) => o.class_id);
  const boxes = body.output[0];
  const classes = body.output[1].map((c) => c + 1);
  const scores = body.output[2];
  const numDetections = body.output[3];

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

  let predictions: Prediction[] = [];
  const [_, classIds, confidences] = o;

  for (let i = 0; i < classIds.length; i++) {
    const boundingBox = {
      normalized_top: boxes[i * 4],
      normalized_left: boxes[i * 4 + 1],
      normalized_bottom: boxes[i * 4 + 2],
      normalized_right: boxes[i * 4 + 3]
    };
    predictions.push({
      boundingBox: boundingBox,
      classId: classIds[i],
      confidence: confidences[i]
    });
  }

  let groundTruths: GroundTruth[] = [];
  groundTruth.objects.forEach((obj) => {
    groundTruths.push({
      classId: obj.class_id,
      boundingBox: obj.bounding_box
    });
  });

  const iouThreshold = 0.5; // Set your IoU threshold
  const numClasses = 2; // Set the total number of classes

  const mapScore = calculateMAP(
    predictions,
    groundTruths,
    iouThreshold,
    numClasses
  );
  console.log('mAP score:', mapScore);

  return errors ? false : true;
};

const ssdMobileNetUtil = {
  validateSSDMobileNet
};

export { ssdMobileNetUtil };

type Prediction = {
  boundingBox: BoundingBox;
  classId: number;
  confidence: number;
};

type GroundTruth = {
  classId: number;
  boundingBox: BoundingBox;
};

function calculateIoU(boxA: BoundingBox, boxB: BoundingBox): number {
  const xA = Math.max(boxA.normalized_left, boxB.normalized_left);
  const yA = Math.max(boxA.normalized_top, boxB.normalized_top);
  const xB = Math.min(boxA.normalized_right, boxB.normalized_right);
  const yB = Math.min(boxA.normalized_bottom, boxB.normalized_bottom);

  const interArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
  const boxAArea =
    (boxA.normalized_right - boxA.normalized_left) *
    (boxA.normalized_bottom - boxA.normalized_top);
  const boxBArea =
    (boxB.normalized_right - boxB.normalized_left) *
    (boxB.normalized_bottom - boxB.normalized_top);

  return interArea / (boxAArea + boxBArea - interArea);
}

function calculateAP(
  predictions: Prediction[],
  groundTruths: GroundTruth[],
  classId: number,
  iouThreshold: number
): number {
  const filteredPredictions = predictions
    .filter((p) => p.classId === classId)
    .sort((a, b) => b.confidence - a.confidence);
  const filteredGroundTruths = groundTruths.filter(
    (g) => g.classId === classId
  );

  let tp = 0,
    fp = 0;
  let precision: number[] = [];
  let recall: number[] = [];
  let usedGroundTruths: Set<number> = new Set();

  filteredPredictions.forEach((prediction) => {
    let iouMax = 0;
    let matchedIndex = -1;

    filteredGroundTruths.forEach((gt, index) => {
      if (!usedGroundTruths.has(index)) {
        const iou = calculateIoU(prediction.boundingBox, gt.boundingBox);
        if (iou > iouMax) {
          iouMax = iou;
          matchedIndex = index;
        }
      }
    });

    if (iouMax >= iouThreshold) {
      tp++;
      usedGroundTruths.add(matchedIndex);
    } else {
      fp++;
    }

    precision.push(tp / (tp + fp));
    recall.push(tp / filteredGroundTruths.length);
  });

  // Calculate the area under the curve (AUC) for precision-recall
  let ap = 0;
  for (let i = 1; i < precision.length; i++) {
    ap += ((recall[i] - recall[i - 1]) * (precision[i] + precision[i - 1])) / 2;
  }

  return ap;
}

function calculateMAP(
  predictions: Prediction[],
  groundTruths: GroundTruth[],
  iouThreshold: number,
  numClasses: number
): number {
  let sumAP = 0;

  for (let classId = 0; classId < numClasses; classId++) {
    sumAP += calculateAP(predictions, groundTruths, classId, iouThreshold);
  }

  return sumAP / numClasses;
}
