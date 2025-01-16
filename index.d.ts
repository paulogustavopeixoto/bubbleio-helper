declare module 'bubbleio-helper' {
    // Configuration for initializing the Bubble class
    interface BubbleConfig {
      dataBaseUrl?: string;
      wfBaseUrl?: string;
      apiKey: string;
    }
  
    // Data Manager interface
    interface DataManager {
      get(tableName: string, recordId?: string | null, constraints?: any[]): Promise<any>;
      post(tableName: string, payload: any): Promise<any>;
      postBatch(tableName: string, items: any[]): Promise<any[]>;
      patch(tableName: string, recordId: string, updates: any): Promise<any>;
      delete(tableName: string, recordId: string): Promise<boolean>;
    }
  
    // Workflow Manager interface
    interface WorkflowManager {
      post(endpointName: string, payload: any): Promise<any>;
    }
  
    // The main Bubble class
    export class Bubble {
      constructor(config: BubbleConfig);
      data: DataManager | null;
      wf: WorkflowManager | null;
    }
  }