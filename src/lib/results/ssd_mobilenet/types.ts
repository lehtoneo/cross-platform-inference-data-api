export type BoundingBox = {
  normalized_top: number;
  normalized_bottom: number;
  normalized_left: number;
  normalized_right: number;
};
type Obj = {
  class_id: number;
  bounding_box: BoundingBox;
};

export type CocoGroundTruth = {
  objects: Obj[];
  image_name: string;
  image_id: number;
};
