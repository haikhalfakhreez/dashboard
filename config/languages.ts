export const languageCodes = ["en", "id", "th", "vn"] as const
export const languages = {
  en: {
    name: "English",
    code: "en",
    label: "English (EN)",
    required: true,
  },
  id: {
    name: "Indonesian",
    code: "id",
    label: "Indonesian (ID)",
    required: false,
  },
  th: {
    name: "Thai",
    code: "th",
    label: "Thai (TH)",
    required: false,
  },
  vi: {
    name: "Vietnamese",
    code: "vn",
    label: "Vietnamese (VN)",
    required: false,
  },
}
