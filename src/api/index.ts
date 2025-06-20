// src/api/index.ts
import type { Work, Character, Relationship } from '@/types/models';

const API_BASE_URL = '/api';

/**
 * 处理API响应
 * @param response Fetch响应对象
 * @returns 解析后的JSON数据
 */
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

/**
 * 获取所有作品列表
 * @returns Promise<Work[]>
 */
export async function getWorks(): Promise<Work[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/work`);
        return handleResponse<Work[]>(response);
    } catch (error) {
        console.error('Error fetching works:', error);
        throw error;
    }
}

/**
 * 根据ID获取单个作品详情
 * @param id 作品ID
 * @returns Promise<Work>
 */
export async function getWorkById(id: number | string): Promise<Work> {
    try {
        const response = await fetch(`${API_BASE_URL}/work/${id}`);
        return handleResponse<Work>(response);
    } catch (error) {
        console.error(`Error fetching work with id ${id}:`, error);
        throw error;
    }
}

/**
 * 根据作品ID获取相关作品信息
 * @param workIds 作品ID数组
 * @returns Promise<Work[]>
 */
export async function getWorksByIds(workIds: number[]): Promise<Work[]> {
    try {
        if (!workIds || workIds.length === 0) {
            return [];
        }

        const queryParams = workIds.map(id => `id=${id}`).join('&');
        const response = await fetch(`${API_BASE_URL}/work?${queryParams}`);
        return handleResponse<Work[]>(response);
    } catch (error) {
        console.error('Error fetching related works:', error);
        throw error;
    }
}

/**
 * 获取所有角色列表
 * @returns Promise<Character[]>
 */
export async function getCharacters(): Promise<Character[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/character`);
        return handleResponse<Character[]>(response);
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

/**
 * 获取单个角色信息
 * @param id 角色ID
 * @returns Promise<Character>
 */
export async function getCharacterById(id: number | string): Promise<Character> {
    try {
        const response = await fetch(`${API_BASE_URL}/character/${id}`);
        return handleResponse<Character>(response);
    } catch (error) {
        console.error(`Error fetching character with id ${id}:`, error);
        throw error;
    }
}

/**
 * 根据ID数组获取多个角色信息
 * @param ids 角色ID数组
 * @returns Promise<Character[]>
 */
export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
    try {
        // 如果没有ID，返回空数组
        if (!ids || ids.length === 0) {
            return [];
        }

        // 构建查询参数，json-server支持通过多个id参数查询
        const queryParams = ids.map(id => `id=${id}`).join('&');
        const response = await fetch(`${API_BASE_URL}/character?${queryParams}`);
        return handleResponse<Character[]>(response);
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

/**
 * 获取所有关系列表
 * @returns Promise<Relationship[]>
 */
export async function getRelationships(): Promise<Relationship[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/relationship`);
        return handleResponse<Relationship[]>(response);
    } catch (error) {
        console.error('Error fetching relationships:', error);
        throw error;
    }
}

/**
 * 获取角色之间的关系信息
 * @param characterIds 角色ID数组，用于筛选相关的关系
 * @returns Promise<Relationship[]>
 */
export async function getRelationshipsByCharacterIds(characterIds: number[]): Promise<Relationship[]> {
    try {
        if (!characterIds || characterIds.length === 0) {
            return [];
        }

        // 构建查询：获取所有涉及这些角色的关系
        // json-server不支持复杂的OR查询，所以我们需要获取所有关系然后在前端过滤
        const response = await fetch(`${API_BASE_URL}/relationship`);
        const allRelationships = await handleResponse<Relationship[]>(response);

        // 过滤出涉及指定角色的关系
        return allRelationships.filter(rel =>
            characterIds.includes(rel.source_character_id) ||
            characterIds.includes(rel.target_character_id)
        );
    } catch (error) {
        console.error('Error fetching relationships:', error);
        throw error;
    }
}