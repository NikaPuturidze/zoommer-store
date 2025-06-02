import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'uniqueArray' })
export class UniqueArrayPipe implements PipeTransform {
  transform<T>(value: T[], key: keyof T): T[] {
    const seen = new Set()
    return value.filter((item) => {
      const value = item[key]
      if (seen.has(value)) return false
      seen.add(value)
      return true
    })
  }
}
