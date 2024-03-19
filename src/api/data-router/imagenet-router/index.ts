import routersUtil from '../util/routers';

const imagenetRouter = routersUtil.createImageRouter({
  startPath: 'imagenet/ILSVRC2012_val_00000',
  extension: 'JPEG'
});

export default imagenetRouter;
