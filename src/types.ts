export interface OKR {
    id: string;
    title: string;
    progress: number;
    status: 'on-track' | 'at-risk' | 'behind' | 'done';
    owner: string;
    children?: OKR[];
    type: 'objective' | 'key-result' | 'initiative' | 'task';
    score?: string;
}

export interface Stats {
    daysLeft: number;
    overallProgress: number;
    tasksCompleted: string;
    netConfidence: number;
}
