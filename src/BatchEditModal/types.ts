import { WrappedFormUtils } from "antd/lib/form/Form";
import { ModalProps } from 'antd/lib/modal';
import { SelectExtend } from '@/BaseComponentExt/SelectExt';
import { SelectInputProps } from '@/BaseComponentExt/SelectInput';
import { SelectSelectProps } from '@/BaseComponentExt/SelectSelect';
import { InputProps } from 'antd/lib/input';
import { CascaderProps } from 'antd/lib/cascader';
import { DatePickerProps } from 'antd/lib/date-picker/interface';

export interface FieldConf {
  field: string;
  compType: 
    'Select' | 'SelectSearch' | 'SelectMultiple' |
    'SelectSearchInput' | 'SelectSearchSelect' | 'Cascader' | 
    'Input' | 'DatePicker' | string;
  enumName: string;
  fieldName: string;
  required: boolean;
}

export interface BatchEditModalProps extends ModalProps {
  form: WrappedFormUtils;
  fieldConfList: FieldConf[];
  modalProps: ModalProps;
  compProps: CompProps;
  onSave: (params: { [key: string]: string | undefined }) => Promise<void>;
  onClose: () => void;
  onAddField: (params: FieldConf) => Promise<EnumType>;
  onSearch?: (params: { field: string, value: string }) => Promise<EnumType>;
  onValidate?: (element: FieldConf, value: any, callback: any) => void;
}

export interface BatchEditModalState {
  saving: boolean;
  addingField: boolean;
  enumItems: { [key: string]: EnumType };
}

export interface EnumType {
  [key: string]: string;
}

export interface CompProps {
  Select?: SelectExtend;
  SelectSearch?: SelectExtend;
  SelectMultiple?: SelectExtend;
  SelectSearchInput?: SelectInputProps;
  SelectSearchSelect?: SelectSelectProps;
  Cascader?: CascaderProps;
  Input?: InputProps;
  DatePicker?: DatePickerProps;
}

