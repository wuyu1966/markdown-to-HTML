import { DocSection } from '../types';

/**
 * Splits raw markdown text into sections based on H1 (#) headers.
 */
export const parseMarkdownByH1 = (text: string): DocSection[] => {
  const lines = text.split('\n');
  const sections: DocSection[] = [];
  
  let currentTitle = "Introduction";
  let currentContentLines: string[] = [];
  let sectionIndex = 0;

  // Helper to push a section
  const pushSection = () => {
    if (currentContentLines.length > 0 || currentTitle !== "Introduction") {
      // Trim empty lines from start/end
      const content = currentContentLines.join('\n').trim();
      const raw = `# ${currentTitle}\n\n${content}`;
      
      sections.push({
        id: `section-${sectionIndex++}`,
        title: currentTitle.replace(/^#\s*/, '').trim(), // Ensure hashes are removed if somehow present
        content: content,
        raw: raw
      });
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is a top-level header (H1)
    // Regex: Start of line, one #, followed by space, then text
    if (/^#\s+(.+)/.test(line)) {
      // If we have accumulated content for the previous section, push it
      if (sections.length > 0 || currentContentLines.length > 0) {
        pushSection();
      }
      
      // Start new section
      currentTitle = line.replace(/^#\s+/, '').trim();
      currentContentLines = [];
    } else {
      currentContentLines.push(line);
    }
  }

  // Push the final section
  pushSection();

  // If the first section is empty introduction (common if file starts with # Title), remove it if it duplicates
  if (sections.length > 1 && sections[0].title === "Introduction" && sections[0].content === "") {
    sections.shift();
  }

  return sections;
};