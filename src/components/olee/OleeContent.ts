// Static content for Olee's dreams + daily gifts
export const OLEE_DREAMS = [
  "Olee dreamed about flying on a giant book last night!",
  "Olee dreamed about having tea with a talking frog!",
  "Olee dreamed about a library that floats in the clouds!",
  "Olee dreamed about riding a friendly dragon who loved poetry!",
  "Olee dreamed about a garden where the flowers tell stories!",
  "Olee dreamed about finding a treasure map inside a storybook!",
  "Olee dreamed about dancing with butterflies at midnight!",
  "Olee dreamed about a cat who could read upside down!",
  "Olee dreamed about swimming in a sea of alphabet letters!",
  "Olee dreamed about meeting a wise old owl in a treehouse library!",
  "Olee dreamed about building a castle out of storybooks!",
  "Olee dreamed about a rainbow that was actually made of bookmarks!",
  "Olee dreamed about befriending a cloud shaped like a dinosaur!",
  "Olee dreamed about a secret garden door hidden behind a bookshelf!",
  "Olee dreamed about eating pancakes with a bear who loves poems!",
  "Olee dreamed about a train that runs on imagination!",
  "Olee dreamed about painting the sky with words!",
  "Olee dreamed about finding a tiny door inside a sunflower!",
  "Olee dreamed about a penguin who runs a bookshop on an iceberg!",
  "Olee dreamed about a magic seed that grows into a story tree!",
];

export type GiftKind = "fact" | "riddle" | "joke" | "twister";
export type Gift = { kind: GiftKind; text: string; answer?: string };

export const OLEE_GIFTS: Gift[] = [
  { kind: "fact", text: "Did you know octopuses have 3 hearts? That's 3x the love!" },
  { kind: "fact", text: "A group of flamingos is called a 'flamboyance'!" },
  { kind: "fact", text: "Honey never goes bad. They found 3000-year-old honey in Egyptian tombs!" },
  { kind: "fact", text: "Butterflies taste with their feet!" },
  { kind: "fact", text: "A snail can sleep for 3 years!" },
  { kind: "riddle", text: "I have pages but I'm not a tree. What am I?", answer: "A book!" },
  { kind: "riddle", text: "I have hands but can't clap. What am I?", answer: "A clock!" },
  { kind: "riddle", text: "The more you take, the more you leave behind. What am I?", answer: "Footsteps!" },
  { kind: "joke", text: "Why did the book go to the doctor? Because it had too many problems!" },
  { kind: "joke", text: "What do you call a sleeping dinosaur? A dino-snore!" },
  { kind: "joke", text: "Why can't you give Elsa a balloon? Because she'll let it go!" },
  { kind: "twister", text: "She sells seashells by the seashore!" },
  { kind: "twister", text: "Red lorry, yellow lorry, red lorry, yellow lorry!" },
  { kind: "twister", text: "How much wood would a woodchuck chuck?" },
];

export const GIFT_LABEL: Record<GiftKind, string> = {
  fact: "FUN FACT",
  riddle: "RIDDLE",
  joke: "JOKE",
  twister: "TONGUE TWISTER",
};

export type OleeMood =
  | "sleepy" | "hopeful" | "cozy" | "night"
  | "subdued" | "glowing" | "thinking" | "laughing" | "surprised";

export const moodForTime = (hour: number, hasRead: boolean): OleeMood => {
  if (hasRead) return "glowing";
  if (hour < 12) return "sleepy";
  if (hour < 16) return "hopeful";
  if (hour < 20) return "cozy";
  return "night";
};
