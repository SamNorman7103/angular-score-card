export interface Player {
    id: string;
    name: string;
    data: {out: any[],in: any[], outScore: number, inScore: number};
}
