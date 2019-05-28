import { WrappedFormUtils } from "antd/lib/form/Form";
import { ModalProps } from 'antd/lib/modal';

export interface FieldConf {
  field: string;
  compType: string;
  enumName: string;
  fieldName: string;
  required: boolean;
}

export interface BatchEditModalProps extends ModalProps {
  form: WrappedFormUtils;
  fieldConfList: FieldConf[];
  modalProps: ModalProps;
  onSave: (params: { [key: string]: string | undefined }) => Promise<void>;
  onClose: () => Promise<void>;
  onAddField: (params: FieldConf) => Promise<EnumType>;
  onSearch?: (params: { field: string, value: string }) => Promise<EnumType>;
  onValidate?: (element: FieldConf, value: any, callback: any) => void;
}

export interface BatchEditModalState {
  saving: boolean;
  searching: boolean;
  addingField: boolean;
  enumItems: { [key: string]: EnumType };
}

export interface EnumType {
  [key: string]: string;
}
