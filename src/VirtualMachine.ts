export interface VirtualMachine {
  name: string;
  operation: OperationStatus;
  connectedMachine: string;
}

export enum OperationStatus {
  Work = 0,
    Stop = 1,
}