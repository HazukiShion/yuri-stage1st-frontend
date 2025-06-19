// src/types/models.ts

// 对应 README 中的 "作品 (Work)"
export interface Work {
    id: number;
    title: {
        primary: string;
        chinese: string;
        aliases: string[];
    };
    images: {
        poster: string;
        banner: string;
        logo: string;
    };
    type: {
        main: string;
        sub: string;
    };
    status: string;
    period: {
        start: string;
        end: string;
    };
    synopsis: string;
    counts: {
        episodes?: number;
        volumes?: number;
        chapters?: number;
    };
    tags: string[];
    staff: {
        role: string;
        name: string;
    }[];
    characters: {
        characterId: number;
        name: string;
        role_in_work: string;
    }[];
    relations: {
        relationType: string;
        workId: number;
    }[];
    yuri_details: {
        level: string;
        concentration: number;
    };
    links: {
        official_site: string;
        aniList: string;
        bangumi: string;
    };
}

// 对应 README 中的 "角色 (Character)"
export interface Character {
    id: number;
    name: {
        primary: string;
        chinese: string;
        aliases: string[];
    };
    image: string;
    description: string;
    attributes: {
        birthday: string;
        height: string;
    };
    staff: {
        role: string;
        name: string;
    }[];
}

// 对应 README 中的 "角色关系 (Relationship)"
export interface Relationship {
    id: number;
    source_character_id: number;
    target_character_id: number;
    relation_type: string;
    context: string;
}