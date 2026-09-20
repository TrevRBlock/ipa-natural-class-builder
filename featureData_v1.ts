export type SoundCategory =
  | "consonant"
  | "vowel";

export type UnaryFeature =
  | "LABIAL"
  | "CORONAL"
  | "DORSAL";

export type BinaryFeature =
  | "consonantal"
  | "syllabic"
  | "sonorant"
  | "voice"
  | "continuant"
  | "nasal"
  | "D.R."
  | "lateral"
  | "round"
  | "anterior"
  | "strident"
  | "high"
  | "low"
  | "back"
  | "tense";

export type FeatureValue =
  | "+"
  | "-";

export type ConsonantPlace =
  | "Bilabial"
  | "Labiodental"
  | "Dental"
  | "Alveolar"
  | "Postalveolar"
  | "Palatal"
  | "Velar"
  | "Labial-velar"
  | "Glottal";

export type ConsonantManner =
  | "Stop"
  | "Nasal"
  | "Fricative"
  | "Affricate"
  | "Approximant"
  | "Lateral approximant";

export type VowelHeight =
  | "High"
  | "Mid"
  | "Low";

export type VowelBackness =
  | "Front"
  | "Central"
  | "Back";

export interface Sound {
  symbol: string;
  category: SoundCategory;
  nodes: UnaryFeature[];
  features: Partial<
    Record<
      BinaryFeature,
      FeatureValue
    >
  >;
  consonant?: {
    place: ConsonantPlace;
    manner: ConsonantManner;
    voiceOrder:
      | "voiceless"
      | "voiced"
      | "single";
  };
  vowel?: {
    height: VowelHeight;
    backness: VowelBackness;
    order: number;
  };
}

export const unaryFeatures:
  UnaryFeature[] = [
    "LABIAL",
    "CORONAL",
    "DORSAL",
  ];

export const binaryFeatures:
  BinaryFeature[] = [
    "consonantal",
    "syllabic",
    "sonorant",
    "voice",
    "continuant",
    "nasal",
    "D.R.",
    "lateral",
    "round",
    "anterior",
    "strident",
    "high",
    "low",
    "back",
    "tense",
  ];

export const consonantPlaces:
  ConsonantPlace[] = [
    "Bilabial",
    "Labiodental",
    "Dental",
    "Alveolar",
    "Postalveolar",
    "Palatal",
    "Velar",
    "Labial-velar",
    "Glottal",
  ];

export const consonantManners:
  ConsonantManner[] = [
    "Stop",
    "Nasal",
    "Fricative",
    "Affricate",
    "Approximant",
    "Lateral approximant",
  ];

export const vowelHeights:
  VowelHeight[] = [
    "High",
    "Mid",
    "Low",
  ];

export const vowelBacknesses:
  VowelBackness[] = [
    "Front",
    "Central",
    "Back",
  ];

function consonant(
  symbol: string,
  place: ConsonantPlace,
  manner: ConsonantManner,
  voiceOrder:
    | "voiceless"
    | "voiced"
    | "single",
  nodes: UnaryFeature[],
  features: Partial<
    Record<
      BinaryFeature,
      FeatureValue
    >
  >,
): Sound {
  return {
    symbol,
    category: "consonant",
    nodes,
    features,
    consonant: {
      place,
      manner,
      voiceOrder,
    },
  };
}

function vowel(
  symbol: string,
  height: VowelHeight,
  backness: VowelBackness,
  order: number,
  nodes: UnaryFeature[],
  features: Partial<
    Record<
      BinaryFeature,
      FeatureValue
    >
  >,
): Sound {
  return {
    symbol,
    category: "vowel",
    nodes,
    features,
    vowel: {
      height,
      backness,
      order,
    },
  };
}

const C_MINUS = {
  syllabic: "-",
} as const;

export const sounds: Sound[] = [
  consonant(
    "p",
    "Bilabial",
    "Stop",
    "voiceless",
    ["LABIAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "-",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      round: "-",
    },
  ),
  consonant(
    "b",
    "Bilabial",
    "Stop",
    "voiced",
    ["LABIAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "-",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      round: "-",
    },
  ),
  consonant(
    "m",
    "Bilabial",
    "Nasal",
    "single",
    ["LABIAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "+",
      voice: "+",
      continuant: "-",
      nasal: "+",
      "D.R.": "-",
      lateral: "-",
      round: "-",
    },
  ),
  consonant(
    "w",
    "Labial-velar",
    "Approximant",
    "single",
    [
      "LABIAL",
      "DORSAL",
    ],
    {
      consonantal: "-",
      ...C_MINUS,
      sonorant: "+",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      round: "+",
      high: "+",
      low: "-",
      back: "+",
    },
  ),
  consonant(
    "f",
    "Labiodental",
    "Fricative",
    "voiceless",
    ["LABIAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
    },
  ),
  consonant(
    "v",
    "Labiodental",
    "Fricative",
    "voiced",
    ["LABIAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
    },
  ),
  consonant(
    "θ",
    "Dental",
    "Fricative",
    "voiceless",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "-",
    },
  ),
  consonant(
    "ð",
    "Dental",
    "Fricative",
    "voiced",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "-",
    },
  ),
  consonant(
    "t",
    "Alveolar",
    "Stop",
    "voiceless",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "-",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "-",
    },
  ),
  consonant(
    "d",
    "Alveolar",
    "Stop",
    "voiced",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "-",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "-",
    },
  ),
  consonant(
    "s",
    "Alveolar",
    "Fricative",
    "voiceless",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "+",
    },
  ),
  consonant(
    "z",
    "Alveolar",
    "Fricative",
    "voiced",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "+",
    },
  ),
  consonant(
    "n",
    "Alveolar",
    "Nasal",
    "single",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "+",
      voice: "+",
      continuant: "-",
      nasal: "+",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "-",
    },
  ),
  consonant(
    "l",
    "Alveolar",
    "Lateral approximant",
    "single",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "+",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "+",
      anterior: "+",
      strident: "-",
    },
  ),
  consonant(
    "ɹ",
    "Alveolar",
    "Approximant",
    "single",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "+",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "+",
      strident: "-",
    },
  ),
  consonant(
    "ʃ",
    "Postalveolar",
    "Fricative",
    "voiceless",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "-",
      strident: "+",
    },
  ),
  consonant(
    "ʒ",
    "Postalveolar",
    "Fricative",
    "voiced",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      anterior: "-",
      strident: "+",
    },
  ),
  consonant(
    "tʃ",
    "Postalveolar",
    "Affricate",
    "voiceless",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "-",
      nasal: "-",
      "D.R.": "+",
      lateral: "-",
      anterior: "-",
      strident: "+",
    },
  ),
  consonant(
    "dʒ",
    "Postalveolar",
    "Affricate",
    "voiced",
    ["CORONAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "-",
      nasal: "-",
      "D.R.": "+",
      lateral: "-",
      anterior: "-",
      strident: "+",
    },
  ),
  consonant(
    "j",
    "Palatal",
    "Approximant",
    "single",
    ["DORSAL"],
    {
      consonantal: "-",
      ...C_MINUS,
      sonorant: "+",
      voice: "+",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      high: "+",
      low: "-",
      back: "-",
    },
  ),
  consonant(
    "k",
    "Velar",
    "Stop",
    "voiceless",
    ["DORSAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "-",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      high: "+",
      low: "-",
      back: "+",
    },
  ),
  consonant(
    "g",
    "Velar",
    "Stop",
    "voiced",
    ["DORSAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "-",
      voice: "+",
      continuant: "-",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
      high: "+",
      low: "-",
      back: "+",
    },
  ),
  consonant(
    "ŋ",
    "Velar",
    "Nasal",
    "single",
    ["DORSAL"],
    {
      consonantal: "+",
      ...C_MINUS,
      sonorant: "+",
      voice: "+",
      continuant: "-",
      nasal: "+",
      "D.R.": "-",
      lateral: "-",
      high: "+",
      low: "-",
      back: "+",
    },
  ),
  consonant(
    "h",
    "Glottal",
    "Fricative",
    "single",
    [],
    {
      consonantal: "-",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "+",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
    },
  ),
  consonant(
    "ʔ",
    "Glottal",
    "Stop",
    "single",
    [],
    {
      consonantal: "-",
      ...C_MINUS,
      sonorant: "-",
      voice: "-",
      continuant: "-",
      nasal: "-",
      "D.R.": "-",
      lateral: "-",
    },
  ),

  vowel(
    "i",
    "High",
    "Front",
    1,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "+",
      low: "-",
      back: "-",
      tense: "+",
    },
  ),
  vowel(
    "ɪ",
    "High",
    "Front",
    2,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "+",
      low: "-",
      back: "-",
      tense: "-",
    },
  ),
  vowel(
    "e",
    "Mid",
    "Front",
    1,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "-",
      low: "-",
      back: "-",
      tense: "+",
    },
  ),
  vowel(
    "ɛ",
    "Mid",
    "Front",
    2,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "-",
      low: "-",
      back: "-",
      tense: "-",
    },
  ),
  vowel(
    "æ",
    "Low",
    "Front",
    1,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "-",
      low: "+",
      back: "-",
      tense: "-",
    },
  ),
  vowel(
    "u",
    "High",
    "Back",
    1,
    [
      "LABIAL",
      "DORSAL",
    ],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "+",
      high: "+",
      low: "-",
      back: "+",
      tense: "+",
    },
  ),
  vowel(
    "ʊ",
    "High",
    "Back",
    2,
    [
      "LABIAL",
      "DORSAL",
    ],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "+",
      high: "+",
      low: "-",
      back: "+",
      tense: "-",
    },
  ),
  vowel(
    "o",
    "Mid",
    "Back",
    1,
    [
      "LABIAL",
      "DORSAL",
    ],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "+",
      high: "-",
      low: "-",
      back: "+",
      tense: "+",
    },
  ),
  vowel(
    "ɑ",
    "Low",
    "Back",
    1,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "-",
      low: "+",
      back: "+",
      tense: "-",
    },
  ),
  vowel(
    "ʌ",
    "Mid",
    "Back",
    2,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "-",
      low: "-",
      back: "+",
      tense: "-",
    },
  ),
  vowel(
    "ə",
    "Mid",
    "Central",
    1,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "-",
      low: "-",
      back: "+",
      tense: "-",
    },
  ),
  vowel(
    "a",
    "Low",
    "Front",
    2,
    ["DORSAL"],
    {
      consonantal: "-",
      syllabic: "+",
      sonorant: "+",
      voice: "+",
      continuant: "+",
      round: "-",
      high: "-",
      low: "+",
      back: "-",
      tense: "-",
    },
  ),
];
