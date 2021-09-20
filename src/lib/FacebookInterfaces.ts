export interface IFacebookWebHook {
    object: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entry: {messaging: any[]}[];
}