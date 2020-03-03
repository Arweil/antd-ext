import React, { Component } from 'react';
import ReactViewer from '@/ReactViewer';
import { IImageList } from '@/ReactViewer/ReactViewer';

const mockData = (() => {
  const list = [];

  for (let index = 1; index < 10; index++) {
    list.push({
      id: index,
      name: `tibet-${index}`, // 图片名称
      imageRealURL: `https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-${index}.jpg`, // 原图
      imageCompressURL: index === 3 ? 'error' : `https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-${index}.jpg`, // 压缩图片
      rotate: 0, // 顺时针旋转
    });
  }

  return list;
})()

export default class Viewer extends Component<{}, {
  imageList: IImageList[],
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      imageList: [],
    }
  }

  async componentDidMount() {
    const res = await Promise.resolve(mockData);

    this.setState({
      imageList: res,
    });
  }
  
  render() {
    const { imageList } = this.state;

    return (
      <ReactViewer
        isShow={true}
        imageIndex={0}
        imageList={imageList}
      />
    )
  }
}
