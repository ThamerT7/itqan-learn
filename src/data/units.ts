import { Unit } from "@/types";

export const UNITS: Unit[] = [
  {
    id: "unit-1",
    titleAr: "الوحدة الأولى: الحروف المفردة (١)",
    order: 1,
    type: "letters",
    letterIds: ["alif", "baa", "taa", "thaa", "jiim", "haa"],
  },
  {
    id: "unit-2",
    titleAr: "الوحدة الثانية: الحروف المفردة (٢)",
    order: 2,
    type: "letters",
    letterIds: ["khaa", "daal", "dhaal", "raa", "zaay", "siin"],
  },
  {
    id: "unit-3",
    titleAr: "الوحدة الثالثة: الحروف المفردة (٣)",
    order: 3,
    type: "letters",
    letterIds: ["shiin", "saad", "daad", "taa_m", "dhaa"],
  },
  {
    id: "unit-4",
    titleAr: "الوحدة الرابعة: الحروف المفردة (٤)",
    order: 4,
    type: "letters",
    letterIds: ["ayn", "ghayn", "faa", "qaaf", "kaaf"],
  },
  {
    id: "unit-5",
    titleAr: "الوحدة الخامسة: الحروف المفردة (٥)",
    order: 5,
    type: "letters",
    letterIds: ["laam", "miim", "nuun", "haa_light", "waaw", "yaa"],
  },
];

export function getUnitById(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id);
}
