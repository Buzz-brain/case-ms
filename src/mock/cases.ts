export interface Case {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  tags: string[];
  primaryImage: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  status: 'open' | 'in-progress' | 'closed';
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Comment {
  id: string;
  caseId: string;
  username: string;
  email: string;
  comment: string;
  parentCommentId: string | null;
  replies: Comment[];
  createdAt: string;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Criminal Law',
    description: 'Cases related to criminal offenses and defense'
  },
  {
    id: '2',
    name: 'Civil Rights',
    description: 'Cases involving civil liberties and human rights'
  },
  {
    id: '3',
    name: 'Corporate Law',
    description: 'Business and corporate legal matters'
  },
  {
    id: '4',
    name: 'Family Law',
    description: 'Divorce, custody, and family-related cases'
  },
  {
    id: '5',
    name: 'Intellectual Property',
    description: 'Patents, trademarks, and copyright cases'
  }
];

export const mockCases: Case[] = [
  {
    id: '1',
    title: 'State vs. Morrison: Corporate Fraud Investigation',
    category: 'Corporate Law',
    description: 'A comprehensive investigation into alleged financial misconduct involving multiple executives and complex offshore transactions.',
    content: `<h2>Case Overview</h2>
    <p>This high-profile case involves allegations of systematic financial fraud spanning over five years. The investigation uncovered complex schemes involving shell companies, offshore accounts, and fraudulent reporting practices.</p>
    
    <h3>Key Facts</h3>
    <ul>
      <li>Total alleged fraud amount: $47 million</li>
      <li>Number of executives involved: 8</li>
      <li>Duration of fraudulent activities: 2018-2023</li>
      <li>Jurisdictions involved: 3 countries</li>
    </ul>

    <h3>Legal Arguments</h3>
    <p>The prosecution presents evidence of deliberate misrepresentation of company finances, manipulation of stock prices, and breach of fiduciary duty. Defense argues lack of criminal intent and claims all actions were within regulatory guidelines at the time.</p>

    <h3>Current Status</h3>
    <p>The case is currently in the discovery phase, with both parties submitting extensive documentation. Trial is expected to begin in Q3 2024.</p>`,
    tags: ['fraud', 'corporate', 'finance', 'investigation'],
    primaryImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    images: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800'
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Johnson v. Tech Corp: Data Privacy Violation',
    category: 'Civil Rights',
    description: 'A landmark case examining the boundaries of corporate data collection and individual privacy rights in the digital age.',
    content: `<h2>Case Overview</h2>
    <p>This case addresses the unauthorized collection and sale of personal data affecting over 2 million users. The plaintiff alleges systematic violations of privacy laws and deceptive business practices.</p>
    
    <h3>Key Issues</h3>
    <ul>
      <li>Unauthorized data collection methods</li>
      <li>Sale of personal information to third parties</li>
      <li>Inadequate user consent mechanisms</li>
      <li>Failure to comply with data protection regulations</li>
    </ul>

    <h3>Legal Framework</h3>
    <p>The case invokes multiple data protection statutes including GDPR provisions, state privacy laws, and federal computer fraud regulations. This case may set important precedents for digital privacy rights.</p>`,
    tags: ['privacy', 'technology', 'civil-rights', 'data-protection'],
    primaryImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800',
    images: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    ],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
    status: 'open'
  },
  {
    id: '3',
    title: 'Martinez Family Custody Agreement',
    category: 'Family Law',
    description: 'A sensitive family law case involving custody arrangements and parental rights across international borders.',
    content: `<h2>Case Overview</h2>
    <p>This case involves complex custody arrangements following an international relocation. The court must balance parental rights with the best interests of three minor children.</p>
    
    <h3>Circumstances</h3>
    <ul>
      <li>Children ages: 6, 9, and 12</li>
      <li>Parents residing in different countries</li>
      <li>Proposed shared custody arrangement</li>
      <li>International travel considerations</li>
    </ul>

    <h3>Legal Considerations</h3>
    <p>The case requires analysis of international family law, the Hague Convention provisions, and coordination between multiple jurisdictions to ensure enforceability of any custody agreement.</p>`,
    tags: ['custody', 'family', 'international', 'children'],
    primaryImage: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800',
    images: [
      'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800'
    ],
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Innovate Inc. Patent Infringement Dispute',
    category: 'Intellectual Property',
    description: 'A complex patent litigation case involving cutting-edge AI technology and claims of stolen intellectual property.',
    content: `<h2>Case Overview</h2>
    <p>Innovate Inc. alleges that a competitor has infringed on three of its patents related to machine learning algorithms. The case involves highly technical expert testimony and significant financial implications.</p>
    
    <h3>Patents in Question</h3>
    <ul>
      <li>US Patent #10,234,567: Neural Network Architecture</li>
      <li>US Patent #10,345,678: Data Processing Method</li>
      <li>US Patent #10,456,789: AI Training System</li>
    </ul>

    <h3>Claims and Counterclaims</h3>
    <p>The plaintiff seeks $85 million in damages and an injunction. The defendant argues the patents are invalid due to prior art and has filed counterclaims alleging anticompetitive behavior.</p>`,
    tags: ['patent', 'intellectual-property', 'AI', 'technology'],
    primaryImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    ],
    createdAt: '2023-12-20T08:00:00Z',
    updatedAt: '2024-01-12T15:00:00Z',
    status: 'open'
  },
  {
    id: '5',
    title: 'State vs. Anderson: Assault and Battery',
    category: 'Criminal Law',
    description: 'A criminal prosecution case involving charges of aggravated assault with witness testimony disputes.',
    content: `<h2>Case Overview</h2>
    <p>The defendant faces charges of aggravated assault stemming from an incident at a public venue. The case hinges on conflicting witness testimonies and forensic evidence analysis.</p>
    
    <h3>Charges</h3>
    <ul>
      <li>Aggravated Assault (1st Degree)</li>
      <li>Reckless Endangerment</li>
      <li>Disorderly Conduct</li>
    </ul>

    <h3>Evidence</h3>
    <p>The prosecution presents video footage, medical reports, and eyewitness accounts. The defense challenges the reliability of witnesses and presents alternative explanations for the events.</p>

    <h3>Proceedings</h3>
    <p>Pre-trial motions are underway, with both sides filing motions to exclude certain evidence. A plea bargain has been discussed but not yet agreed upon.</p>`,
    tags: ['criminal', 'assault', 'trial', 'prosecution'],
    primaryImage: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800',
    images: [
      'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800'
    ],
    createdAt: '2023-12-15T13:00:00Z',
    updatedAt: '2024-01-08T11:00:00Z',
    status: 'in-progress'
  },
  {
    id: '6',
    title: 'Williams Trademark Dispute Resolution',
    category: 'Intellectual Property',
    description: 'A trademark opposition case involving brand confusion and market competition in the fashion industry.',
    content: `<h2>Case Overview</h2>
    <p>Williams Fashion Co. opposes the trademark registration of a similar brand name by a new entrant in the luxury fashion market. The case examines likelihood of confusion and dilution of established brand value.</p>
    
    <h3>Trademarks at Issue</h3>
    <ul>
      <li>Registered mark: WILLIAMS LUXURY (2015)</li>
      <li>Applied mark: WILLIAM'S LUXE (2023)</li>
      <li>Classes: 25 (Clothing), 35 (Retail services)</li>
    </ul>

    <h3>Arguments</h3>
    <p>The opposer argues phonetic and visual similarity creates consumer confusion. The applicant contends the marks are sufficiently distinct and target different market segments.</p>`,
    tags: ['trademark', 'brand', 'fashion', 'opposition'],
    primaryImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
    ],
    createdAt: '2023-12-01T09:00:00Z',
    updatedAt: '2024-01-05T14:00:00Z',
    status: 'closed'
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    caseId: '1',
    username: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    comment: 'This case has significant implications for corporate governance standards. The systematic nature of the fraud suggests institutional failures beyond individual misconduct.',
    parentCommentId: null,
    replies: [
      {
        id: 'c1-r1',
        caseId: '1',
        username: 'David Chen',
        email: 'dchen@email.com',
        comment: 'Absolutely agree. The board\'s oversight mechanisms clearly failed. This will likely lead to stricter regulations.',
        parentCommentId: 'c1',
        replies: [],
        createdAt: '2024-01-16T11:30:00Z'
      }
    ],
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'c2',
    caseId: '1',
    username: 'Michael Rodriguez',
    email: 'mrodriguez@email.com',
    comment: 'Has anyone analyzed the impact on shareholders? The stock price implications alone are staggering.',
    parentCommentId: null,
    replies: [],
    createdAt: '2024-01-17T14:20:00Z'
  },
  {
    id: 'c3',
    caseId: '2',
    username: 'Emily Watson',
    email: 'ewatson@email.com',
    comment: 'This could be a landmark case for digital privacy rights. The precedent set here will affect millions of users.',
    parentCommentId: null,
    replies: [
      {
        id: 'c3-r1',
        caseId: '2',
        username: 'James Park',
        email: 'jpark@email.com',
        comment: 'Indeed. Tech companies need to be held accountable for how they handle user data. This case might finally push for comprehensive federal privacy legislation.',
        parentCommentId: 'c3',
        replies: [],
        createdAt: '2024-01-11T16:00:00Z'
      },
      {
        id: 'c3-r2',
        caseId: '2',
        username: 'Lisa Thompson',
        email: 'lthompson@email.com',
        comment: 'The challenge will be proving actual harm. Data breaches are serious, but quantifying damages is complex.',
        parentCommentId: 'c3',
        replies: [],
        createdAt: '2024-01-12T09:15:00Z'
      }
    ],
    createdAt: '2024-01-11T15:00:00Z'
  }
];
