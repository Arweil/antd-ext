import React, { PureComponent } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import { TextAreaProps } from 'antd/lib/input';
const { TextArea } = Input;

interface TextAreaExtProps extends TextAreaProps {
  wait?: number;
}

export default class TextAreaExt extends PureComponent<TextAreaExtProps, {
  value: string;
}> {
  constructor(props: Readonly<TextAreaExtProps>) {
    super(props);

    this.state = {
      value: _.isString(props.value) ? props.value : '',
    }

    this.onChangeWrapper = this.onChangeWrapper.bind(this);
  }

  onChange = _.debounce((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange && onChange(event);
  }, this.props.wait)

  onChangeWrapper(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event.persist();
    this.setState({
      value: event.target.value,
    }, () => {
      this.onChange(event);
    })
  }

  render() {
    const { wait = 0, ...restProps } = this.props;

    restProps.onChange = this.onChangeWrapper

    return (
      <TextArea
        {...restProps}
        {...this.state}
      />
    )
  }
}

