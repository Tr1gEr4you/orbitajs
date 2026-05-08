export class UrlParser {
    private readonly URL_SPLITTER = "?"
    private readonly QUERY_SPLITTER = '&';
    private  readonly KEY_VALUE_SPLITTER = '=';

    public parse(url: string) {
        const { path, queryString } = this.split(url)
        const query = this.parseQuery(queryString)
        return { path, query }
    }

    public split(url: string) {
        const [path, queryString] = url.split(this.URL_SPLITTER)
        return {path, queryString}
    }

    public parseQuery(string: string) {
        const query: Record<string, string> = {}

        if (!string) return query

        const pairs = string.split(this.QUERY_SPLITTER)

        for (const pair of pairs) {
            if (!pair) continue

            const [key, value] = pair.split(this.KEY_VALUE_SPLITTER)
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
