export interface VirtualMachine {
  name: string;
  operation: OperationStatus;
  connectedMachine: string;
}

enum OperationStatus {
  Work = 0,
    Stop = 1,
}