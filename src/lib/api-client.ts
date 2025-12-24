/**
 * @INPUT: [Env: EVOLINK_API_KEY]
 * @OUTPUT: [Class: EvolinkClient - Handles API communication]
 * @POS: [API Client - Wrapper for Evolink.ai Z Image Turbo API]
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新所属文件夹的 _META.md。
 */
import axios from 'axios';

const API_BASE_URL = 'https://api.evolink.ai/v1';

export interface GenerateRequest {
  model?: string;
  prompt: string;
  size?: string;
  seed?: number;
  nsfw_check?: boolean;
}

export interface GenerateResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  task_info?: {
    estimated_time?: number;
  };
}

export interface TaskStatusResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  results?: string[];
  error?: {
    message: string;
  };
}

export class EvolinkClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async generateImage(params: GenerateRequest): Promise<GenerateResponse> {
    const response = await axios.post(
      `${API_BASE_URL}/images/generations`,
      {
        model: 'z-image-turbo',
        ...params,
      },
      { headers: this.headers }
    );
    return response.data;
  }

  async getTaskStatus(taskId: string): Promise<TaskStatusResponse> {
    const response = await axios.get(
      `${API_BASE_URL}/tasks/${taskId}`,
      { headers: this.headers }
    );
    return response.data;
  }
}

export const evolinkClient = new EvolinkClient(process.env.EVOLINK_API_KEY || '');
