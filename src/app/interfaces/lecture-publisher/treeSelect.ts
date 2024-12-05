export interface jobClass {
  fJobClassId: number
  fJobClass: string
  // fJobClassSort: null
  children?: job[]
}
export interface job {
  fJobId: number
  fJob: string
  fJobClassId: number
  // fJobSort: null
  children?: jobItem[]
}
export interface jobItem {
  fJobItemId: number
  fJobItem: string
  fJobId: number
  // fJobItemSort: null
}
