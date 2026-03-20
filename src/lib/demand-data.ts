/**
 * Customer Demand data — from survey (113 responses) + HubSpot feature requests
 * Sources: "Help Shape the Future of the Skimmer Mobile App" survey (March 2026)
 *          HubSpot Feature Requests pipeline (795493733)
 */

export const SURVEY_STATS = {
  totalResponses: 113,
  surveyName: "Help Shape the Future of the Skimmer Mobile App",
};

export const KEY_FINDINGS = [
  {
    stat: "57%",
    label: "want camera → auto-fill equipment details",
    sub: "\"Pointing their camera at an equipment label and having the details auto-fill\"",
    votes: 64,
    color: "border-t-sk-blue",
  },
  {
    stat: "56%",
    label: "already take a photo of the label and move on",
    sub: "The dominant behavior today — photograph the dataplate, walk away. The data sits unread.",
    votes: 63,
    color: "border-t-sk-sunrise",
  },
  {
    stat: "34%",
    label: "want gauge photo → auto-log reading",
    sub: "\"Snapping a photo of a gauge and having the reading logged automatically\"",
    votes: 38,
    color: "border-t-sk-moss",
  },
];

export const EQUIPMENT_RECORDING_METHODS = [
  { method: "Take a photo of the label and move on", count: 63, pct: 56 },
  { method: "Don't usually track equipment details", count: 16, pct: 14 },
  { method: "Type it manually into the app", count: 13, pct: 12 },
  { method: "Combo — photo + manual entry", count: 5, pct: 4 },
  { method: "Write on paper, enter later", count: 2, pct: 2 },
];

export const TIME_SAVING_FEATURES = [
  { feature: "Video walkthrough → auto service report", votes: 77, pct: 68 },
  { feature: "Camera at label → auto-fill details", votes: 64, pct: 57, highlight: true },
  { feature: "Voice → auto written notes", votes: 57, pct: 50 },
  { feature: "Photo of gauge → auto-log reading", votes: 38, pct: 34, highlight: true },
  { feature: "Fine with how things are today", votes: 9, pct: 8 },
];

export const PAIN_POINTS = [
  {
    pain: "Documenting problems photos alone can't capture",
    rating3to5: 81,
    rating4to5: 58,
    rating5: 27,
    note: "Highest-rated pain point in the survey",
  },
  {
    pain: "Manually typing equipment serial numbers",
    rating3to5: 58,
    rating4to5: 27,
    rating5: 11,
    note: "Directly solved by OCR auto-fill",
  },
  {
    pain: "Knowing when equipment should be replaced",
    rating3to5: 57,
    rating4to5: 30,
    rating5: 10,
    note: "Requires structured equipment records with age data",
  },
];

export const PRO_QUOTES = [
  {
    quote: "Instant equipment ID by pointing the phone at the label.",
    context: "Magic wand question — what feature do you wish Skimmer had?",
  },
  {
    quote: "I'd love to be able to take pictures of an equipment pad and have a list of what is there, added bonus if I could take a pic of serial number and know how old that is.",
    context: "Magic wand question",
  },
  {
    quote: "Being able to take video/photo & have a simple diagnostic — even better would be for Skimmer to see the labels on the motor or pump & be able to help with the item's needed for that repair.",
    context: "Magic wand question",
  },
  {
    quote: "Taking a photo of the test strip reading and automatically recording the chemical levels and then giving a recommended dosage based on the pool size.",
    context: "Magic wand question",
  },
  {
    quote: "Being able to take a picture of a piece of equipment — either the piece itself or its product label — and have it be added to the client's equipment profile.",
    context: "Magic wand question",
  },
  {
    quote: "They take picture in location photos and we have to manually add here in the office. It is a pain.",
    context: "How techs currently record equipment details",
  },
];

export const HUBSPOT_STATS = {
  photoTickets: 191,
  videoTickets: 37,
  relevantExamples: [
    "AI Test Strip Image Analysis for Reading Verification",
    "More versatile equipment adding — add photos to equipment",
    "Customer photo library with automatic storage from mobile app",
    "Increase photo limit — massive properties with 20+ pumps and heaters",
  ],
};
