import { WrappedFormUtils } from "antd/lib/form/Form";
import { ModalProps } from 'antd/lib/modal';

interface FieldConf {
  field: string;
  compType: string;
  enumName: string;
  fieldName: string;
  required: boolean;
}

export interface BatchEditModalProps extends ModalProps {
  form: WrappedFormUtils;
  fieldConfList: FieldConf[],
  modalProps: ModalProps,
  onSave: (params: { [key: string]: string | undefined }) => Promise<void>,
  onClose: () => Promise<void>,
}

export interface BatchEditModalState {
  fetching: boolean;
}

export interface EnumType {
  [key: string]: string;
}
