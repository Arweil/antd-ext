import React from 'react'
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export default function InputExt(props: InputProps) {
  return (
    <Input
      autoComplete="off"
      {...props}
    />
  );
}
