type Options = {
    domains: Array<string>;
    maxSuggestions?: number;
};
export declare function suggestDomains(userInput: string, { domains, maxSuggestions }: Options): any[];
export declare function suggestFullEmails(userInput: string, { domains, maxSuggestions }: Options): string[];
export {};
