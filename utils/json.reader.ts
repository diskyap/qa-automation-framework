import { readFileSync } from 'fs'

export function readJSON<T>(filePath: string): T {
    return JSON.parse(readFileSync(filePath, 'utf-8'))
}
