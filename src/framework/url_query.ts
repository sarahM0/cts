import { IEntry } from './listing.js';
import { ICase } from './test_group.js';

function encodeSelectively(s: string) {
    let ret = encodeURIComponent(s);
    ret = ret.replace(/%20/g, '+');
    ret = ret.replace(/%22/g, '"');
    ret = ret.replace(/%2C/g, ',');
    ret = ret.replace(/%2F/g, '/');
    ret = ret.replace(/%3A/g, ':');
    ret = ret.replace(/%7B/g, '{');
    ret = ret.replace(/%7D/g, '}');
    return ret;
}

export function makeQueryString(entry: IEntry, testcase: ICase): string {
    let s = entry.suite + ':';
    s += entry.path + ':';
    s += testcase.name + ':';
    if (testcase.params) {
        s += JSON.stringify(testcase.params);
    }
    return '?q=' + encodeSelectively(s);
}

export function parseQueryString(query: string): string[] {
    return new URLSearchParams(query).getAll('q');
}