export interface Course {
  id: string;
  name: string;
  institution: string;
  year: string;
  certificateUrl: string;
}

export const courses: Record<"pt" | "en", Course[]> = {
  pt: [
    {
      id: "design-engineer",
      name: "Design Engineer",
      institution: "UX Unicórnio",
      year: "2026",
      certificateUrl:
        "https://drive.google.com/file/d/1OQpGPPt7ms-tvnWRmmUjc_ih6FD1S4Xg/view",
    },
    {
      id: "pro-figma-web",
      name: "PRO FIGMA WEB | UI DESIGN",
      institution: "Udemy",
      year: "2024",
      certificateUrl:
        "https://www.udemy.com/certificate/UC-9febb7e0-bf84-4947-9993-78ebef3ef49e/",
    },
    {
      id: "ux-design-do-zero",
      name: "UX design do zero",
      institution: "Mentorama",
      year: "2022",
      certificateUrl:
        "https://drive.google.com/file/d/1CsNHtFQhZs5dktGgzvAYyIULNtyFI-DN/view",
    },
  ],
  en: [
    {
      id: "design-engineer",
      name: "Design Engineer",
      institution: "UX Unicórnio",
      year: "2026",
      certificateUrl:
        "https://drive.google.com/file/d/1OQpGPPt7ms-tvnWRmmUjc_ih6FD1S4Xg/view",
    },
    {
      id: "pro-figma-web",
      name: "PRO FIGMA WEB | UI DESIGN",
      institution: "Udemy",
      year: "2024",
      certificateUrl:
        "https://www.udemy.com/certificate/UC-9febb7e0-bf84-4947-9993-78ebef3ef49e/",
    },
    {
      id: "ux-design-do-zero",
      name: "UX Design from Scratch",
      institution: "Mentorama",
      year: "2022",
      certificateUrl:
        "https://drive.google.com/file/d/1CsNHtFQhZs5dktGgzvAYyIULNtyFI-DN/view",
    },
  ],
};
