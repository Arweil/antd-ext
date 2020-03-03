import React, { PureComponent } from 'react';
import { message } from 'antd';
import Viewer from 'viewerjs';

export interface IImageList {
  id: number; // id
  name: string; // 图片名称
  imageRealURL: string; // 原图
  imageCompressURL: string; // 压缩图片
  rotate: number; // 顺时针旋转
}

export interface IReactViewerProps {
  isShow: boolean;
  imageIndex: number; // 初始展示的图片索引
  imageList: IImageList[]; // 图片列表
}

function loadImages(imageList: string[]) {
  const needToLoadList = imageList; // 影像路径
  const maxLoadedNum = 3; // 最大加载数量
  const curLoadedImgList: string[] = []; // 正在加载的影像列表
  let index = 0; // 当前加载的图片索引
  const imagedoms = document.querySelectorAll('.viewer-list>li>img');

  function removeAndReloadImg(e: any) {
    if (e.path.length) {
      const curSrc = e.path[0].src;
      const _index = curLoadedImgList.findIndex(item => item.indexOf(curSrc));
      curLoadedImgList.splice(_index, 1);
      start();
    }
  }

  function start() {
    if (curLoadedImgList.length >= maxLoadedNum) {
      return;
    }

    if (needToLoadList.length <= 0) {
      // 如果全部加载完毕那么更新viewer
      return;
    }

    const img = imagedoms[index];
    const src = needToLoadList.shift();
    curLoadedImgList.push(src!);
    img.setAttribute('src', src!);
    img.setAttribute('data-index', index + '');
    img.setAttribute('data-original-url', src!);
    img.addEventListener('load', removeAndReloadImg);
    img.addEventListener('error', (e: any) => {
      const _index = Number(e.target.getAttribute('data-index'));
      removeAndReloadImg(e);
      img.setAttribute('src', require('./load.gif'));
      message.error(`第${_index + 1}张影像加载失败`);
    });

    index++;

    start();
  };

  return {
    start,
    stop,
  }
}

export default class ReactViewer extends PureComponent<IReactViewerProps> {
  private viewer: Viewer | null;
  private viewerElement: Element | null;
  private isFirstTimeRender: boolean; // 是否第一次渲染
  private isShowing: boolean; // 是否正在显示

  constructor(props: Readonly<IReactViewerProps>) {
    super(props);

    this.viewer = null;
    this.viewerElement = null;
    this.isFirstTimeRender = true;
    this.isShowing = false;
  }

  componentDidMount() {
    console.log('componentDidMount');
    
    this.viewerElement = document.getElementById('images');

    this.viewer = new Viewer(this.viewerElement!, {
      transition: false,
      loading: true,
      zIndex: 1009,
      toolbar: {
        zoomIn: true,
        zoomOut: true,
        oneToOne: true,
        reset: true,
        prev: true,
        play: true,
        next: true,
        rotateLeft: true,
        rotateRight: true,
        flipHorizontal: true,
        flipVertical: true,
        // @ts-ignore 额外加了一个图片，用来查看原图
        view: (e) => {
          // @ts-ignore index
          this.onViewRealImage(this.viewer!.index);
        },
      },
    });

    this.onShowViewer = this.onShowViewer.bind(this);
    this.onViewed = this.onViewed.bind(this);

    this.viewerElement!.addEventListener('ready', this.onReady);
    this.viewerElement!.addEventListener('shown', this.onShowViewer);
    this.viewerElement!.addEventListener('viewed', this.onViewed);
    this.viewerElement!.addEventListener('hidden', this.onHidden);

    if (this.isFirstTimeRender
      && this.props.imageList.length
      && this.props.isShow) {
      console.log('isFirstTimeRender');

      this.viewer!.show();
      this.isFirstTimeRender = false;
    }
  }

  componentDidUpdate(prevProps: IReactViewerProps) {
    console.log('componentDidUpdate', prevProps, this.props);

    const { isShow, imageList } = this.props;
    const { isShow: isShowPrev, imageList: imageListPrev } = prevProps;

    // 更新viewer-navbar
    if (imageList.length !== imageListPrev.length && imageList.length > 0) {
      this.viewer!.update(); // 更新viewer-navbar
    }

    // 显示
    if (isShow && !this.isShowing) {
      this.viewer!.show();
    }
  }

  componentWillUnmount() {
    this.viewerElement!.removeEventListener('ready', this.onReady);
    this.viewerElement!.removeEventListener('shown', this.onShowViewer);
    this.viewerElement!.removeEventListener('viewed', this.onViewed);
    this.viewerElement!.removeEventListener('hidden', this.onHidden);
    this.viewer!.destroy();
  }

  onReady() {
    console.log('ready');
  }

  onShowViewer() {
    console.log('shown');

    loadImages(this.props.imageList.map(item => item.imageCompressURL)).start();
    this.isShowing = true;
  }

  onViewed(e: any) {
    const { index } = e.detail;

    console.log('onViewed', index, this.viewer!);
    const { rotate } = this.props.imageList[index];
    this.viewer!.rotateTo(rotate);
  }

  onHidden() {
    console.log('onHidden');
    this.isShowing = false;
  }

  // 查看当前原图
  onViewRealImage(index: number) {
    console.log('onViewRealImage', index, this.viewer);

    const imagedom = document.getElementById(`images-${index}`);
    const { imageRealURL } = this.props.imageList[index];
    imagedom!.setAttribute('src', imageRealURL);
    this.viewer!.update();
    this.viewer!.view(index);
  }

  render() {
    console.log('render');

    const { imageList } = this.props;

    return (
      <div style={{ display: 'none' }}>
        <ul id="images">
          {
            imageList.map((item, index) => {
              return (
                <li key={index}>
                  <img
                    id={`images-${index}`}
                    alt={item.name}
                    src={require('./load.gif')}
                  />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
