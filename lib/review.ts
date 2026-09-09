export type Category = "like" | "concern" | "question";
export type PersonaId = "maya" | "leo" | "priya" | "sam" | "alex";
export type Persona = {
  id: PersonaId;
  name: string;
  label: string;
  need: string;
  color: string;
  quote: string;
};
export type Finding = {
  id: string;
  personaId: PersonaId;
  category: Category;
  element: string;
  text: string;
  nextStep: string;
};
export type ReviewBrief = { audience: string; task: string };
export type Review = {
  brief: ReviewBrief;
  findings: Finding[];
  createdAt: string;
};
export const personas: Persona[] = [
  {
    id: "maya",
    name: "Maya",
    label: "The first-timer",
    need: "Needs to understand the offer and know where to begin.",
    color: "#D5C5FF",
    quote: "Wait, what can I do here?",
  },
  {
    id: "leo",
    name: "Leo",
    label: "The busy one",
    need: "Wants to finish the main task with less reading and fewer steps.",
    color: "#FFE45C",
    quote: "I have about 30 seconds.",
  },
  {
    id: "priya",
    name: "Priya",
    label: "The careful chooser",
    need: "Wants clear costs, commitments, and explanations of data use.",
    color: "#FFB3A3",
    quote: "What am I signing up for?",
  },
  {
    id: "sam",
    name: "Sam",
    label: "The clarity seeker",
    need: "Depends on readable text, clear hierarchy, and distinct controls.",
    color: "#9DE8CE",
    quote: "Make it easy to see, please.",
  },
  {
    id: "alex",
    name: "Alex",
    label: "The regular",
    need: "Cares about quick repeat tasks and consistent actions.",
    color: "#A8D6FF",
    quote: "Let me get to my usual.",
  },
];
export const sampleBrief: ReviewBrief = {
  audience: "People looking for a creative workshop in their city",
  task: "Find a pottery workshop and book a first class",
};
const fixture: Finding[] = [
  {
    id: "maya-like",
    personaId: "maya",
    category: "like",
    element: "“Make something real” headline",
    text: "“Pottery, painting, and a little happy mess” tells me what this is about. I can picture myself trying it.",
    nextStep: "Keep the concrete examples near the main headline.",
  },
  {
    id: "maya-concern",
    personaId: "maya",
    category: "concern",
    element: "Workshop cards",
    text: "I can see what the classes cost, but I’m not sure whether they’re suitable for a complete beginner like me.",
    nextStep: "Consider a beginner-friendly label and skill-level details.",
  },
  {
    id: "maya-question",
    personaId: "maya",
    category: "question",
    element: "“Find your workshop” action",
    text: "Will I choose a date next, or does this button book something straight away?",
    nextStep: "Test whether first-time visitors can predict the next step.",
  },
  {
    id: "leo-like",
    personaId: "leo",
    category: "like",
    element: "Prices on workshop cards",
    text: "The prices are right next to the workshop names. That helps me narrow things down quickly.",
    nextStep: "Keep prices visible while browsing.",
  },
  {
    id: "leo-concern",
    personaId: "leo",
    category: "concern",
    element: "Workshop browsing",
    text: "I don’t see a date filter. I only have Saturday free, so I might have to open every class.",
    nextStep: "Explore a date filter if availability drives the choice.",
  },
  {
    id: "leo-question",
    personaId: "leo",
    category: "question",
    element: "Workshop cards",
    text: "How long is each session? I need to know if it fits between my other plans.",
    nextStep: "Ask whether duration belongs directly on each card.",
  },
  {
    id: "priya-like",
    personaId: "priya",
    category: "like",
    element: "“Small groups. Big ideas.” introduction",
    text: "Knowing these are small group workshops makes the experience feel more personal.",
    nextStep: "Support the promise with a specific group size when available.",
  },
  {
    id: "priya-concern",
    personaId: "priya",
    category: "concern",
    element: "€45 pottery class price",
    text: "Does that price include clay and firing? I’d hesitate if there might be extras later.",
    nextStep: "Clarify included materials before the booking decision.",
  },
  {
    id: "priya-question",
    personaId: "priya",
    category: "question",
    element: "Booking action",
    text: "If my plans change, can I cancel? And what personal details will you need?",
    nextStep:
      "Make cancellation and data-use information available before payment.",
  },
  {
    id: "sam-like",
    personaId: "sam",
    category: "like",
    element: "Main heading and primary action",
    text: "The large headline and solid purple button give me clear places to start looking.",
    nextStep: "Preserve a clear hierarchy as more information is added.",
  },
  {
    id: "sam-concern",
    personaId: "sam",
    category: "concern",
    element: "Small workshop metadata",
    text: "The smaller location text might be hard for me to read. I’d want to try this at my usual zoom level.",
    nextStep:
      "Check text sizes, contrast, and zoom in the implemented page; this is not an accessibility audit.",
  },
  {
    id: "sam-question",
    personaId: "sam",
    category: "question",
    element: "Workshop cards and buttons",
    text: "Could I browse these classes and book one using only my keyboard?",
    nextStep:
      "Verify keyboard focus and interaction in a working prototype; a screenshot cannot establish this.",
  },
  {
    id: "alex-like",
    personaId: "alex",
    category: "like",
    element: "Repeated workshop card layout",
    text: "Names and prices stay in the same places. Once I’ve browsed one class, I know where to look.",
    nextStep: "Keep the card pattern consistent across categories.",
  },
  {
    id: "alex-concern",
    personaId: "alex",
    category: "concern",
    element: "Top navigation",
    text: "I don’t see a shortcut to previous bookings. Finding my usual class could take a few extra steps.",
    nextStep:
      "Investigate whether returning customers need a bookings shortcut.",
  },
  {
    id: "alex-question",
    personaId: "alex",
    category: "question",
    element: "“Explore” navigation",
    text: "Can I save a workshop or follow a teacher so I can find them again?",
    nextStep: "Validate demand for saved workshops before adding accounts.",
  },
];
export async function generateReview(
  brief: ReviewBrief,
  simulateFailure = false,
): Promise<Review> {
  await new Promise((resolve) => setTimeout(resolve, 650));
  if (simulateFailure)
    throw new Error(
      "This is a simulated demo error. Your design and brief are still here. Please try again.",
    );
  return {
    brief: { ...brief },
    findings: fixture.map((f) => ({ ...f })),
    createdAt: new Date().toISOString(),
  };
}
