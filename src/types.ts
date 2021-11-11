export interface ListItemData {
    id: string;
    title: string;
    href: string;
    smallTitle?: string;
    subtitle?: string;
    excerpt?: string;
    featuredMedia?: number;
    links?: { label: string; href: string }[];
}

export interface JobOpeningData extends ListItemData {
    department: string;
    location: string;
    region: string;
}

export interface ResourceData extends ListItemData {
    products: string[];
    type: string;
}

export interface PressReleaseData extends ListItemData {
    year: string;
}

export type ListFilter = {
    name: string;
    items: string[];
    active: string[];
};
