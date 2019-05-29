import React, { PureComponent } from 'react';
import { Card } from 'antd';
import TableExt, { ColumnPropsExtend } from '@/TableExt';

interface dataSourceDTO {
  fieldA: string;
  fieldB: string;
  fieldC: string;
  fieldD: string;
  fieldE: string;
  fieldF: number;
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
      total: 100,
    }

    this.columns = [
      {
        title: 'Index',
        dataIndex: 'Index',
        render: (text, record, index) => {
          const { pageIndex, pageSize } = this.state;
          return ((pageIndex - 1) * pageSize) + index + 1;
        },
        footerRender: (text, record) => {
          return 'total';
        },
      },
      {
        title: 'Field A',
        dataIndex: 'fieldA',
      },
      {
        title: 'Field B',
        dataIndex: 'fieldB',
      },
      {
        title: 'Field C',
        dataIndex: 'fieldC',
      },
      {
        title: 'Field D',
        dataIndex: 'fieldD',
      },
      {
        title: 'Field E',
        dataIndex: 'fieldE',
      },
      {
        title: 'Field F',
        dataIndex: 'fieldF',
        footerIndex: 'sum',
      },
    ];

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.queryData(1);
  }

  onPageChange({ pageIndex, pageSize }: { pageIndex: number; pageSize?: number; }) {
    this.queryData(pageIndex);
  }

  async queryData(pageIndex: number) {
    const data = [];
    for (let i = (pageIndex - 1) * 10 + 1; i < pageIndex * 10 + 1; i++) {
      data.push({
        fieldA: `item A${i}`,
        fieldB: `item B${i}`,
        fieldC: `item C${i}`,
        fieldD: `item D${i}`,
        fieldE: `item E${i}`,
        fieldF: 0,
      });
    }

    const res = await Promise.resolve(data);
    this.setState({
      dataSource: res,
      sumData: { sum: 100 },
      pageIndex,
      pageSize: 10,
    });
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
