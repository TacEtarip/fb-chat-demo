export interface IFacebookWebHook {
    object: string;
    entry: {
        id: string,
        time: number,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messaging: any[]
    }[];
}