// src/api/index.ts
import type { Work } from '@/types/models';

// API 请求的基础路径
const API_BASE_URL = '/api/mock';

/**
 * 获取所有作品列表
 * @returns Promise<Work[]>
 */
export async function getWorks(): Promise<Work[]> {
    // 请求的 URL 将是 /api/mock/works.json
    // Vite Proxy 将其转换为 /mock/works.json，并从 public 目录提供文件
    const response = await fetch(`${API_BASE_URL}/works.json`);

    if (!response.ok) {
        throw new Error('网络响应错误');
    }
    return await response.json();
}