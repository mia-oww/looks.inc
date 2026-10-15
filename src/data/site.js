// Site copy, taken from looksteal.com. Synced content (the shoppable feed,
// journal articles and legal documents) lives in the JSON files next to this.

export const EMAIL = 'hello@looksteal.com'

// Main menu, in the order shown in the header and mobile menu.
export const NAV = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Follow', path: '/follow' },
  { label: 'Company', path: '/company' },
  { label: 'Careers', path: '/careers' },
  { label: 'Legal', path: '/legal' },
]

export const ABOUT = {
  intro:
    'Welcome to Look Steal, your #1 source for K-pop fashion! Our innovative Toronto-based marketing agency is dedicated to bringing the vibrant and dynamic styles of K-pop girl groups to fashion enthusiasts around the globe.',
  offers: [
    {
      title: 'Personalized Outfit Finder',
      text: 'Send us your celeb outfit inspirations, and our experts will find the exact clothing piece for you.',
    },
    {
      title: 'Exclusive K-pop Focus',
      text: 'Stay ahead of the trends with fashion worn by popular K-pop idols.',
    },
    {
      title: 'Seamless Shopping Experience',
      text: 'Navigate our user-friendly platform to find and shop the clothing you love.',
    },
  ],
  team: [{ name: 'Tim Fujio', role: 'Founder', email: 'timfujio@looksteal.com' }],
}

export const SOCIALS = [
  { name: 'Instagram', handle: '@look.steal.inc', url: 'https://www.instagram.com/look.steal.inc/' },
  { name: 'YouTube', handle: 'Look Steal Inc', url: 'https://www.youtube.com/channel/UC_exH70MbTGbJLnN5tPNiIQ' },
  { name: 'Reddit', handle: 'u/Look-Steal', url: 'https://www.reddit.com/user/Look-Steal/' },
  { name: 'Pinterest', handle: 'LookSteal', url: 'https://www.pinterest.ca/LookSteal/' },
  { name: 'Threads', handle: '@look.steal.inc', url: 'https://www.threads.net/@look.steal.inc' },
  { name: 'LinkedIn', handle: 'Look Steal Inc', url: 'https://www.linkedin.com/company/look-steal-inc/' },
  { name: 'Twitter', handle: '@Look_Steal_Inc', url: 'https://twitter.com/Look_Steal_Inc' },
]

export const COMPANY = {
  parent: { name: 'Setting Mind Media', url: 'https://settingmind.com/about-page-setting-mind-media/' },
  summary:
    'Launched in 2024, Look Steal Inc. is a Toronto-based affiliate marketing company specializing in K-pop women’s fashion. The company’s mission is to democratize affiliate marketing for small creators and bridge the gap between brands and customers.',
  facts: [
    { label: 'Founded', value: '2024' },
    { label: 'Headquarters', value: 'Toronto, Canada' },
    { label: 'Focus', value: 'K-pop women’s fashion' },
  ],
}

export const REVIEWS_URL = 'https://www.trustpilot.com/review/looksteal.com'

export const JOBS = [
  {
    id: 'photo-editor',
    title: 'Photo Editor',
    location: 'Remote',
    type: 'Contract · Freelance',
    summary:
      'If you can confidently pitch, research, and edit original K-pop fashion content, please consider applying for this role at Look Steal Inc.!',
    description:
      'The ideal candidate should have familiarity with the K-pop fashion industry, ability to independently and accurately source specific clothing brands using various methods and tools, and be an expert in Photoshop and or other editing programs. This is a contract-based, freelance role with negotiated compensation per photo.',
    duties: [
      'Keeping up to date with current fashion trends and the K-pop industry.',
      'Double-checking to ensure no info errors.',
      'Converting various foreign currencies into USD.',
      'Curating photos for editorial use.',
      'Meeting deadlines in a timely manner.',
      'Ensuring photo edits comply with fair use laws.',
    ],
    notes: [
      'Payments are made via PayPal after project delivery and publishing.',
      'Rejected edits will not be compensated.',
      'Use of AI is banned.',
    ],
    perks: [
      'Be part of an exciting and industry-leading marketing agency in its early startup phase.',
      'Work closely with the founder.',
      'Get paid to obsess about K-pop fashion.',
      'Potential for promotion as the company grows.',
    ],
    apply:
      'Submit a portfolio and or social media links to hello@looksteal.com. Applications without a portfolio will, unfortunately, not be considered.',
  },
]

export const EEO =
  'Look Steal Inc. is an equal opportunity employer. We prohibit discrimination based on race, colour, religion, sex, national origin, age, disability, genetics, or any other protected characteristic. All hiring decisions are based on qualifications and merit.'
