export interface ListItemData {
    id: string;
    title: string;
    href: string;
    smallTitle?: string;
    subtitle?: string;
    excerpt?: string;
    links?: { label: string; href: string }[];
}

export interface JobOpeningData extends ListItemData {
    department: string;
    location: string;
    region: string;
}

export type ListFilter = {
    name: string;
    items: string[];
    active: string[];
};
