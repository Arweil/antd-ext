import { WrappedFormUtils } from "antd/lib/form/Form";
import { ModalProps } from 'antd/lib/modal';
import { CascaderProps, CascaderOptionType } from 'antd/lib/cascader';
import { FSelectProps } from '@/FormExt/FSelect';
import { FItemExtraProps, AllFItemCompsType } from '@/FormExt/FormItem';
import { FDatePickerProps } from '@/FormExt/FDatePicker';
import { FInputProps } from '@/FormExt/FInput';

export type InitialFieldValueType = EnumType | CascaderOptionType[] | undefined;

export interface FieldConf {
  field: string;
  compProps: AllFItemCompsType;
  enumName: string;
  fieldName: string;
  required: boolean;
  disabled?: boolean;
}

export interface BatchEditModalProps {
  form: WrappedFormUtils;
  fieldConfList: FieldConf[];
  modalProps: ModalProps;
  onSave: (params: { [key: string]: string | undefined }) => Promise<void>;
  onClose: () => void;
  onAddField?: (addField: FieldConf, addedFields: FieldConf[]) => Promise<InitialFieldValueType> | void;
  onSearch?: (params: { field: string, value: string; }) => Promise<EnumType>;
  onValidate?: (element: FieldConf, value: any, callback: any) => Promise<void>;
  onDelete?: (deleField: FieldConf, unDeleFields: FieldConf[]) => void | Promise<void>;
}

export interface BatchEditModalState {
  saving: boolean;
  addingField: boolean;
  enumItems: { [key: string]: InitialFieldValueType };
}

export interface EnumType {
  [key: string]: string;
}

export interface CompProps {
  Select?: FSelectProps;
  // Cascader?: CascaderProps;
  Input?: FInputProps;
  DatePicker?: FDatePickerProps;
  Extra?: FItemExtraProps;
}

