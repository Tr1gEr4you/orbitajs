export class UrlParser {
    private static readonly URL_SPLITTER = "?"
    private static readonly QUERY_SPLITTER = '&';
    private static readonly KEY_VALUE_SPLITTER = '=';

    public parse(url: string) {
        const { path, queryString } = this.split(url)
        const query = this.parseQuery(queryString)
        return { path, query }
    }

    public split(url: string) {
        const [path, queryString] = url.split(UrlParser.URL_SPLITTER)
        return {path, queryString}
    }

    public parseQuery(string: string) {
        const query: Record<string, string> = {}
        const pairs = string.split(UrlParser.QUERY_SPLITTER)

        for (const pair of pairs) {
            if (!pair) continue

            const [key, value] = pair.split(UrlParser.KEY_VALUE_SPLITTER)
            if (key) {
                try {
                    query[decodeURIComponent(key)] = value ? decodeURIComponent(value) : ""
                } catch {
                    query[key] = value || ""
                }
            }
        }

        return query
    }
}
