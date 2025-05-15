declare global {
    interface File {
      arrayBuffer(): Promise<ArrayBuffer>;
    }
  }