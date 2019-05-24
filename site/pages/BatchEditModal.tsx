import React, { PureComponent } from 'react';
import { Button } from 'antd';
import BatchEditModalComp from '@/BatchEditModal';

export default class BatchEditModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    }

    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  async onSave(params: {
    [key: string]: string | undefined;
  }) {

  }

  async onClose() {
  }

  render() {
    return (
      <div>
        <Button onClick={() => { this.setState }}>批量修改字段</Button>
        <BatchEditModalComp
          fieldConfList={[]}
          modalProps={{visible: true}}
          onSave={this.onSave}
          onClose={this.onClose}
        />
      </div>
    )
  }
}
