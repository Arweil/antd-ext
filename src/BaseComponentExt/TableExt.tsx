import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';

export default function TableExt<T>(props: TableProps<T>): JSX.Element {
  const defaultLocale = {
    emptyText: '暂无数据',
  };

  const { locale, ...resetProps } = props;
  const finalLocal = { ...defaultLocale, ...locale };

  return (
    <Table
      {...resetProps}
      locale={finalLocal}
    />
  );
}
