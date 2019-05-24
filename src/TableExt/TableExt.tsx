import React from 'react';
import Table, { ColumnProps, TableProps } from 'antd/lib/table';

export interface ColumnPropsExtend<D, R> extends ColumnProps<D> {
  footerIndex?: string;
  footerRender?: (text: any, record: R) => {}
}

export interface TablePropsExtends<D, R> extends TableProps<D> {
  columns: ColumnPropsExtend<D, R>[];
  dataSourceExt: {
    list: D[],
    totalRow: R,
  };
}

function BodyWithSummary<D, R extends { [key: string]: any }>(
  { dataSource, columns, hasRowSelection, children, ...otherProps }:
  { dataSource: R, columns: ColumnPropsExtend<D, R>[], hasRowSelection: boolean, children: React.ReactChildren, otherProps: any }
) {
  return (
    <tbody {...otherProps}>
      {children}
      {
        dataSource && Object.keys(dataSource).length > 0 ? (
          <tr className="ant-table-row">
            {
              hasRowSelection ? <td className="ant-table-selection-column"></td> : null
            }
            {
              columns.map(itm => {
                const txt = itm.footerIndex ? dataSource[itm.footerIndex] : '';
                return (
                  <td key={itm.dataIndex || itm.key} style={{ width: itm.width }}>
                    {
                      itm.footerRender ?
                        itm.footerRender(txt, dataSource) :
                        (itm.footerIndex ? dataSource[itm.footerIndex] : '')
                    }
                  </td>
                )
              })
            }
          </tr>
        ) : null
      }
    </tbody>
  );
}

export default function TableExt<D, R extends { [key: string]: any }>(props: TablePropsExtends<D, R>) {
  const { dataSourceExt, columns, dataSource, footer, components, ...restProps } = props;
  const list = dataSourceExt.list;
  const totalRow = dataSourceExt.totalRow;

  const baseCols: ColumnProps<D>[] = columns.map((itm) => {
    return itm;
  });

  return (
    <Table<D>
      dataSource={list}
      columns={baseCols}
      components={{
        body: {
          wrapper: (props) => {
            return (
              <BodyWithSummary
                columns={columns}
                dataSource={totalRow}
                hasRowSelection={!!restProps.rowSelection}
                {...props}
              />
            );
          }
        }
      }}
      {...restProps}
    />
  );
}
