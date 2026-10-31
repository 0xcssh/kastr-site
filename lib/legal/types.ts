/**
 * Long-form documents (privacy, terms, support, credits) are plain data so both languages share
 * one renderer. Inline links use a tiny markdown subset: [label](https://...) or [label](mailto:...).
 */
export type Block = string | { list: string[] } | { note: string };

export type Section = {
  id: string;
  heading: string;
  blocks: Block[];
};

export type LegalDoc = {
  title: string;
  description: string;
  intro: string[];
  sections: Section[];
  /** Show the "last updated" date and the table of contents (legal texts only). */
  dated?: boolean;
};
