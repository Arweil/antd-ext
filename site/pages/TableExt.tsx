import React, { PureComponent } from 'react';
import { Card } from 'antd';
import TableExt, { ColumnPropsExtend } from '@/TableExt';

interface dataSourceDTO {
  fieldA: string;
  fieldB: string;
  fieldC: string;
  fieldD: string;
  fieldE: string;
  fieldF: string;
  fieldG: number;
}

interface sumDTO {
  sum?: number;
}

export default class PageTableExt extends PureComponent<{}, {
  dataSource: dataSourceDTO[];
  sumData: sumDTO;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  total: number;
}> {
  private columns: ColumnPropsExtend<dataSourceDTO, sumDTO>[];

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      dataSource: [],
      sumData: {},
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    }

    this.columns = [
      {
        title: 'Field A',
        dataIndex: 'FieldA',
        render: (text, record, index) => {
          const { pageIndex, pageSize } = this.state;
          return ((pageIndex - 1) * pageSize) + index + 1;
        },
        footerRender: (text, record) => {
          return '合计';
        },
      },
      {
        title: 'Field B',
        dataIndex: 'FieldB',
      },
      {
        title: 'Field C',
        dataIndex: 'FieldC',
      },
      {
        title: 'Field D',
        dataIndex: 'FieldD',
      },
      {
        title: 'Field E',
        dataIndex: 'FieldE',
      },
      {
        title: 'Field F',
        dataIndex: 'FieldF',
      },
      {
        title: 'Field G',
        dataIndex: 'FieldG',
        footerIndex: 'sum',
      },
    ];

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {

  }

  onPageChange({ pageIndex, pageSize }: { pageIndex: number; pageSize?: number; }) {

  }

  render() {
    const { dataSource, sumData, loading, pageIndex, total, pageSize } = this.state;
    
    return (
      <Card title="带有合计的表格">
        <TableExt
          columns={this.columns}
          dataSourceExt={{
            list: dataSource,
            totalRow: sumData,
          }}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            current: pageIndex,
            total,
            pageSize,
            onChange: (page, pageSize) => {
              this.onPageChange({ pageIndex: page, pageSize });
            }
          }}
        />
      </Card>
    )
  }
}
