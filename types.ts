export interface DocSection {
  id: string;
  title: string;
  content: string;
  raw: string;
}

export interface ParsedDoc {
  fileName: string;
  sections: DocSection[];
}
