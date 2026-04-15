// ─── ECOSYSTEM MAP DATA ──────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  identity:     '#a371f7',
  security:     '#f85149',
  productivity: '#58a6ff',
  compliance:   '#3fb950',
  device:       '#d29922',
  management:   '#8b949e',
};

// x, y = top-left of node rect; w = width; h = height
const NODES = [
  // ── Management ──
  {
    id: 'admin', label: 'M365 Admin Center', icon: '⚙️', category: 'management',
    x: 460, y: 20, w: 170, h: 54,
    fullName: 'Microsoft 365 Admin Center',
    description: 'The top-level portal for managing your entire M365 tenant. Users, licences, domains, service health, billing — all start here.',
    licence: 'Included with any M365 subscription',
    portal: 'admin.microsoft.com',
    examFacts: [
      'Global Administrator is the only role with full access to all admin centers',
      'Service Health Dashboard shows real-time incident status',
      'Message Center shows upcoming changes before they roll out',
      'Country/region CANNOT be changed — must create a new tenant',
    ],
    connects: ['entra', 'exchange', 'sharepoint', 'teams', 'intune', 'purview'],
  },

  // ── Identity cluster ──
  {
    id: 'entra', label: 'Microsoft Entra ID', icon: '🔐', category: 'identity',
    x: 240, y: 140, w: 160, h: 54,
    fullName: 'Microsoft Entra ID (formerly Azure AD)',
    description: 'The identity and access management backbone. Every authentication for every M365 service passes through Entra ID. It\'s the trust layer for the entire stack.',
    licence: 'Free tier included. P1 = Conditional Access, SSPR. P2 = PIM, Identity Protection',
    portal: 'entra.microsoft.com',
    examFacts: [
      'Formerly Azure Active Directory (Azure AD) — same thing, new name',
      'P1 licence required for Conditional Access and SSPR',
      'P2 licence required for PIM and Identity Protection',
      'Soft delete: deleted users are recoverable for 30 days',
      'Max 900 custom domains per single tenant',
    ],
    connects: ['admin', 'adconnect', 'condaccess', 'pim', 'b2b', 'exchange', 'sharepoint', 'teams', 'intune', 'purview', 'defxdr'],
  },
  {
    id: 'adconnect', label: 'Entra Connect', icon: '🔄', category: 'identity',
    x: 20, y: 140, w: 130, h: 54,
    fullName: 'Microsoft Entra Connect (AD Connect)',
    description: 'Syncs on-premises Active Directory users, groups, and contacts up to Entra ID. Bridges your on-prem AD with the cloud.',
    licence: 'Free (requires on-prem AD DS)',
    portal: 'On-prem server + Entra admin center',
    examFacts: [
      'Default sync cycle: every 30 minutes',
      'IdFix tool: use BEFORE deploying Entra Connect to fix AD errors',
      'Staging mode: read-only sync for testing before going live',
      'Supports filtering by domain, OU, or attribute',
      'Entra Connect Health monitors sync status and alerts on issues',
    ],
    connects: ['entra', 'defidentity'],
  },
  {
    id: 'condaccess', label: 'Conditional Access', icon: '🚦', category: 'identity',
    x: 90, y: 260, w: 150, h: 54,
    fullName: 'Conditional Access',
    description: 'If [signal] → Then [decision]. Policies that enforce access controls based on user, location, device, app, and risk. The zero-trust gatekeeper.',
    licence: 'Entra ID P1 (minimum). Risk-based CA requires P2',
    portal: 'entra.microsoft.com > Protection > Conditional Access',
    examFacts: [
      'Signals: user/group, named location, device compliance, app, sign-in risk',
      'Grant controls: require MFA, compliant device, domain-joined device',
      'Session controls: app-enforced restrictions, sign-in frequency',
      'Report-only mode: test policies without blocking users — use this first',
      'Named Locations: trusted IPs or countries/regions you define',
    ],
    connects: ['entra', 'intune'],
  },
  {
    id: 'pim', label: 'PIM', icon: '👑', category: 'identity',
    x: 20, y: 380, w: 100, h: 54,
    fullName: 'Privileged Identity Management (PIM)',
    description: 'Just-in-time (JIT) privileged access. Admins request elevated roles for a time-limited window rather than having them permanently assigned.',
    licence: 'Entra ID P2 — hard requirement',
    portal: 'entra.microsoft.com > Identity Governance > PIM',
    examFacts: [
      'REQUIRES Entra ID P2 — no P2, no PIM',
      'Eligible assignment: user can activate the role when needed',
      'Active assignment: role is always on (avoid where possible)',
      'Activation requires approval, MFA, or justification — configurable',
      'PIM automatically removes access when the time window expires',
      'Provides audit trail for all privileged role activations',
    ],
    connects: ['entra'],
  },
  {
    id: 'b2b', label: 'B2B / Guest', icon: '👥', category: 'identity',
    x: 175, y: 380, w: 120, h: 54,
    fullName: 'Entra B2B Collaboration',
    description: 'Invite external partners as guest users. They authenticate with their own credentials (their org\'s IdP or personal account) — no extra accounts needed.',
    licence: 'Included in Entra ID (5:1 free guest ratio)',
    portal: 'entra.microsoft.com > External Identities',
    examFacts: [
      'Guest user UPN always contains #EXT# — e.g. user_contoso.com#EXT#@yourtenant.onmicrosoft.com',
      'External user state: PendingAcceptance → Accepted (after redeeming invite)',
      'Guest users authenticated by their own IdP (BYOI = Bring Your Own Identity)',
      'You can restrict what guests can see/access via External collaboration settings',
      'Access packages (Entitlement Management) automate B2B lifecycle — needs P2',
    ],
    connects: ['entra'],
  },

  // ── Security cluster ──
  {
    id: 'eop', label: 'EOP', icon: '📧', category: 'security',
    x: 500, y: 140, w: 100, h: 54,
    fullName: 'Exchange Online Protection (EOP)',
    description: 'The base email security layer. Every email to/from Exchange Online passes through EOP for anti-spam, anti-malware, and anti-phishing filtering. Always on, no extra licence.',
    licence: 'Included with all Exchange Online / M365 plans',
    portal: 'security.microsoft.com > Email & Collaboration > Policies',
    examFacts: [
      'Scans: inbound, outbound, AND internal email (sender + recipient in same org)',
      'SCL -1 = bypass spam filter (safe sender/IP override)',
      'SCL 0–4 = not spam, SCL 5–6 = deliver to Junk, SCL ≥7 = spam action taken',
      'BCL (Bulk Complaint Level) 0–9: higher = more likely marketing/bulk mail',
      'ZAP (Zero-hour Auto Purge) retroactively moves threats after delivery',
      'Works on Exchange Online mailboxes ONLY — NOT on-prem Exchange',
    ],
    connects: ['entra', 'exchange', 'defxdr', 'defoffice'],
  },
  {
    id: 'defxdr', label: 'Defender XDR', icon: '🛡️', category: 'security',
    x: 730, y: 140, w: 140, h: 54,
    fullName: 'Microsoft Defender XDR',
    description: 'Extended Detection and Response portal. Correlates signals from all Defender products into unified incidents. One console for the full security picture.',
    licence: 'Varies per product. Portal access = M365 E3/E5 or standalone Defender licences',
    portal: 'security.microsoft.com',
    examFacts: [
      'Defender XDR = the unified portal (security.microsoft.com)',
      'Automatically correlates alerts from Office 365, Identity, Endpoint, Cloud Apps',
      'Advanced Hunting uses KQL (Kusto Query Language) to hunt across all signals',
      'AIR = Automated Investigation & Response — auto-investigates and can auto-remediate',
      'Threat Analytics: Microsoft-curated threat intelligence reports',
    ],
    connects: ['entra', 'eop', 'defoffice', 'defidentity', 'defendpoint', 'defcloudapps'],
  },
  {
    id: 'defoffice', label: 'Def. Office 365', icon: '🎯', category: 'security',
    x: 690, y: 270, w: 145, h: 54,
    fullName: 'Microsoft Defender for Office 365',
    description: 'Adds advanced protection on top of EOP. Safe Links rewrites URLs, Safe Attachments sandboxes files. Protects email, Teams, SharePoint, and OneDrive.',
    licence: 'Plan 1 = M365 Business Premium / E3 add-on. Plan 2 = M365 E5',
    portal: 'security.microsoft.com > Email & Collaboration',
    examFacts: [
      'Plan 1: Safe Links, Safe Attachments, anti-phishing (spoof + impersonation)',
      'Plan 2 (Plan 1 PLUS): Threat Explorer, AIR, Attack Simulator, Campaign views',
      'Safe Attachments — Dynamic Delivery: sends email instantly with placeholder, replaces attachment after scan',
      'Safe Links: URL rewrite + time-of-click verification (blocks even if safe at delivery but bad later)',
      'Threat Explorer: 30-day searchable email metadata (real-time detections for 7 days)',
      'Zero-Hour Auto Purge (ZAP) is part of EOP but Defender P2 enhances it',
    ],
    connects: ['eop', 'defxdr'],
  },
  {
    id: 'defidentity', label: 'Def. Identity', icon: '🕵️', category: 'security',
    x: 900, y: 270, w: 140, h: 54,
    fullName: 'Microsoft Defender for Identity',
    description: 'Monitors on-premises Active Directory for suspicious behaviour, lateral movement, and compromised identities. Installs a sensor on domain controllers.',
    licence: 'M365 E5 / Defender for Identity standalone',
    portal: 'security.microsoft.com > Identities',
    examFacts: [
      'Monitors on-prem AD DS domain controllers via lightweight sensor',
      'Detects: pass-the-hash, pass-the-ticket, golden ticket attacks, lateral movement',
      'Integrates with Entra ID for holistic identity threat view',
      'Correlates on-prem identity signals in Defender XDR incidents',
    ],
    connects: ['defxdr', 'adconnect'],
  },
  {
    id: 'defendpoint', label: 'Def. Endpoint', icon: '💻', category: 'security',
    x: 790, y: 390, w: 140, h: 54,
    fullName: 'Microsoft Defender for Endpoint',
    description: 'Enterprise endpoint protection — EDR (Endpoint Detection & Response), vulnerability management, and threat response for Windows, macOS, Linux, iOS, Android.',
    licence: 'Plan 1 = M365 E3. Plan 2 = M365 E5',
    portal: 'security.microsoft.com > Endpoints',
    examFacts: [
      'Plan 1: Core antivirus, firewall, ASR rules, network protection',
      'Plan 2 (P1 PLUS): EDR, threat hunting, automated investigation, device timeline',
      'Onboarding: via Intune, Group Policy, Config Manager, or script',
      'ASR (Attack Surface Reduction) rules block common attack techniques (e.g. Office macros spawning processes)',
      'Integrates with Intune for device compliance signals → Conditional Access',
    ],
    connects: ['defxdr', 'intune'],
  },
  {
    id: 'defcloudapps', label: 'Def. Cloud Apps', icon: '☁️', category: 'security',
    x: 950, y: 140, w: 150, h: 54,
    fullName: 'Microsoft Defender for Cloud Apps',
    description: 'Cloud Access Security Broker (CASB). Discovers shadow IT, enforces policies on cloud apps, monitors for anomalous behaviour in SaaS apps including M365 itself.',
    licence: 'M365 E5 / standalone licence',
    portal: 'security.microsoft.com > Cloud Apps',
    examFacts: [
      'CASB = Cloud Access Security Broker — sits between users and cloud apps',
      'Discovers shadow IT: identifies unsanctioned apps in use via log analysis or proxy',
      'App governance: approve/block specific cloud apps',
      'Activity policies: alert/block on anomalous user activity (e.g. mass download at 3am)',
      'Integrates with Conditional Access for session-level controls',
    ],
    connects: ['defxdr', 'entra'],
  },

  // ── Productivity ──
  {
    id: 'exchange', label: 'Exchange Online', icon: '📮', category: 'productivity',
    x: 20, y: 510, w: 150, h: 54,
    fullName: 'Exchange Online',
    description: 'Cloud-hosted email and calendar service. All email passes through EOP before landing in Exchange Online mailboxes.',
    licence: 'Exchange Online Plan 1/2, or included in M365 plans',
    portal: 'admin.exchange.microsoft.com',
    examFacts: [
      'Shared mailbox: up to 50 GB without a licence (needs licence above 50 GB)',
      'Litigation Hold: preserves mailbox content even if user deletes it',
      'Archive mailbox: expands storage, can auto-archive old items',
      'Mail flow rules (transport rules): apply actions based on message conditions',
      'Journaling: capture copies of messages for compliance',
      'Mailbox audit logging: enabled by default for E3/E5',
    ],
    connects: ['entra', 'eop', 'purview'],
  },
  {
    id: 'sharepoint', label: 'SharePoint Online', icon: '📁', category: 'productivity',
    x: 210, y: 510, w: 150, h: 54,
    fullName: 'SharePoint Online',
    description: 'Team sites, document libraries, and intranet. OneDrive for Business is built on SharePoint. Sensitivity labels, DLP, and retention policies all apply here.',
    licence: 'Included in M365 plans',
    portal: 'admin.microsoft.com > SharePoint',
    examFacts: [
      'SharePoint preferred language CANNOT be changed after tenant creation',
      'External sharing settings: Anyone / New & existing guests / Existing guests / Only org',
      'SharePoint admin sets org-wide sharing levels; site owners can tighten but not exceed',
      'OneDrive is built on SharePoint infrastructure',
      'Sensitivity labels can protect SharePoint site content (container label)',
      'Data Access Governance reports available in SharePoint Advanced Management',
    ],
    connects: ['entra', 'purview'],
  },
  {
    id: 'teams', label: 'Microsoft Teams', icon: '💬', category: 'productivity',
    x: 400, y: 510, w: 140, h: 54,
    fullName: 'Microsoft Teams',
    description: 'Unified communication: chat, meetings, calls, file sharing. Teams channels are backed by SharePoint. Safe Links and Safe Attachments protect Teams too.',
    licence: 'Included in M365 plans',
    portal: 'admin.teams.microsoft.com',
    examFacts: [
      'Meeting policies: control per-user or org-wide meeting features',
      'Meeting configurations: org-wide settings for all meetings (lobby, entry/exit tones)',
      'Teams Phone: requires separate calling licence for PSTN calling',
      'DLP policies can block sharing of sensitive info in Teams messages',
      'Safe Links (Defender for Office 365) rewrites URLs in Teams messages',
      'Guest access vs External access: different controls, different use cases',
    ],
    connects: ['entra', 'sharepoint'],
  },
  {
    id: 'onedrive', label: 'OneDrive', icon: '💾', category: 'productivity',
    x: 585, y: 510, w: 130, h: 54,
    fullName: 'OneDrive for Business',
    description: 'Personal cloud storage for each user, backed by SharePoint. Sync client enables offline access. Sharing settings controlled at org level.',
    licence: 'Included in M365 plans',
    portal: 'admin.microsoft.com > SharePoint (covers OneDrive admin)',
    examFacts: [
      'Each user gets storage based on their plan (1 TB standard, unlimited for E3/E5)',
      'OneDrive sharing: admin sets maximum sharing level (same as SharePoint levels)',
      'Known Folder Move: redirects Desktop, Documents, Pictures to OneDrive automatically',
      'Retention policies apply to OneDrive (Purview)',
      'DLP policies scan OneDrive content for sensitive data',
    ],
    connects: ['entra', 'sharepoint', 'purview'],
  },

  // ── Compliance ──
  {
    id: 'purview', label: 'Microsoft Purview', icon: '⚖️', category: 'compliance',
    x: 760, y: 510, w: 155, h: 54,
    fullName: 'Microsoft Purview',
    description: 'The compliance and data governance hub. Covers data classification, sensitivity labels, DLP, retention, eDiscovery, and Compliance Manager.',
    licence: 'Basic in E3. Most features require E5 or Microsoft 365 E5 Compliance add-on',
    portal: 'compliance.microsoft.com / purview.microsoft.com',
    examFacts: [
      'Formerly Microsoft 365 Compliance Center — now Microsoft Purview',
      'Auto-labeling (SharePoint/OneDrive) requires E5 or Compliance add-on',
      'Trainable classifiers: need minimum 50 positive samples to train',
      'Regulatory records: CANNOT be modified or deleted during retention period — immutable',
      'eDiscovery Premium requires E5 or add-on',
      'Compliance Manager score is a risk assessment — NOT a guarantee of compliance',
    ],
    connects: ['entra', 'exchange', 'sharepoint', 'teams', 'onedrive'],
  },

  // ── Device ──
  {
    id: 'intune', label: 'Intune', icon: '📱', category: 'device',
    x: 490, y: 380, w: 100, h: 54,
    fullName: 'Microsoft Intune',
    description: 'Mobile Device Management (MDM) and Mobile Application Management (MAM). Enrols and manages devices, enforces compliance policies that feed into Conditional Access.',
    licence: 'Included in M365 E3/E5, Business Premium, or standalone',
    portal: 'intune.microsoft.com',
    examFacts: [
      'MDM (Mobile Device Management): full device enrolment, control everything',
      'MAM (Mobile Application Management): manage apps only, no device enrolment needed (BYOD)',
      'Compliance policies: set requirements (PIN, encryption, OS version), mark device compliant/non-compliant',
      'Non-compliant devices → Conditional Access can block or limit access',
      'Configuration profiles: push settings (Wi-Fi, VPN, email, restrictions)',
      'Autopilot: zero-touch Windows device provisioning',
    ],
    connects: ['entra', 'condaccess', 'defendpoint'],
  },
];

// Edges: [sourceId, targetId]
const EDGES = [
  ['admin', 'entra'],
  ['entra', 'adconnect'],
  ['entra', 'condaccess'],
  ['entra', 'pim'],
  ['entra', 'b2b'],
  ['entra', 'exchange'],
  ['entra', 'sharepoint'],
  ['entra', 'teams'],
  ['entra', 'intune'],
  ['entra', 'purview'],
  ['entra', 'defxdr'],
  ['eop', 'exchange'],
  ['eop', 'defoffice'],
  ['eop', 'defxdr'],
  ['defxdr', 'defoffice'],
  ['defxdr', 'defidentity'],
  ['defxdr', 'defendpoint'],
  ['defxdr', 'defcloudapps'],
  ['defidentity', 'adconnect'],
  ['condaccess', 'intune'],
  ['intune', 'defendpoint'],
  ['purview', 'exchange'],
  ['purview', 'sharepoint'],
  ['purview', 'onedrive'],
];

// ─── EXAM GRENADES ───────────────────────────────────────────────────────────

const GRENADES = [
  // TENANT
  { category: 'tenant', icon: '💣', fact: 'Country/region CANNOT be changed', detail: 'You must create an entirely new tenant and purchase a new subscription. Determines datacentre location, available services, and billing currency.' },
  { category: 'tenant', icon: '💣', fact: '.onmicrosoft.com domain cannot be changed or deleted', detail: 'It is the initial/default domain and is permanent. You can add custom domains but the .onmicrosoft.com stays forever.' },
  { category: 'tenant', icon: '💣', fact: 'SharePoint preferred language cannot be changed after creation', detail: 'Choose carefully at setup. Microsoft sends future communications in the most recently selected language, but SharePoint stays in the original language.' },
  { category: 'tenant', icon: '💣', fact: 'Max 900 custom domains per tenant', detail: 'Each domain can be used to create email addresses for users in that domain.' },
  { category: 'tenant', icon: '💣', fact: '1 default theme + up to 4 custom group themes = 5 total', detail: 'Custom themes apply to Microsoft 365 Groups ONLY — not Security groups or Distribution groups.' },
  { category: 'tenant', icon: '💣', fact: 'Default theme cannot be renamed', detail: 'To delete the default theme you must first delete all other custom themes.' },
  { category: 'tenant', icon: '💣', fact: 'Purchasing extra licences changes monthly billing date', detail: 'E.g. main sub bought May 14, extra licences bought May 15 → two different billing due dates.' },
  { category: 'tenant', icon: '💣', fact: 'Shared mailbox: up to 50 GB without a licence', detail: 'Exceeding 50 GB requires assigning an Exchange Online Plan 2 or equivalent licence to the shared mailbox.' },

  // IDENTITY
  { category: 'identity', icon: '💣', fact: 'Soft delete: deleted users recoverable for 30 days', detail: 'After 30 days the deletion is permanent. The Microsoft 365 admin center or PowerShell can restore within this window.' },
  { category: 'identity', icon: '💣', fact: 'PIM requires Entra ID P2 — hard requirement', detail: 'No P2 licence = no PIM. This is a very common exam trap.' },
  { category: 'identity', icon: '💣', fact: 'Conditional Access requires Entra ID P1 minimum', detail: 'Risk-based Conditional Access policies (using Identity Protection signals) require P2.' },
  { category: 'identity', icon: '💣', fact: 'Identity Protection requires Entra ID P2', detail: 'Provides user risk and sign-in risk scores for risk-based Conditional Access.' },
  { category: 'identity', icon: '💣', fact: 'SSPR (Self-Service Password Reset) requires Entra ID P1', detail: 'Security defaults include a limited form of SSPR for free, but full SSPR policy control needs P1.' },
  { category: 'identity', icon: '💣', fact: 'AD Connect default sync cycle: 30 minutes', detail: 'Full sync on first run; then delta syncs every 30 minutes. Can trigger manually with Start-ADSyncSyncCycle.' },
  { category: 'identity', icon: '💣', fact: 'IdFix must be run BEFORE deploying Entra Connect', detail: 'Identifies and fixes UPN conflicts, duplicate attributes, and format errors in on-prem AD before sync.' },
  { category: 'identity', icon: '💣', fact: 'Seamless SSO works with PHS and PTA — NOT with AD FS', detail: 'AD FS handles SSO itself using its own federation. Seamless SSO is the cloud alternative for PHS/PTA.' },
  { category: 'identity', icon: '💣', fact: 'PHS never stores the actual password in the cloud', detail: 'It stores a hash of a hash. The original password cannot be derived from what is stored in Entra ID.' },
  { category: 'identity', icon: '💣', fact: 'B2B guest UPN contains #EXT#', detail: 'Format: externaluser_externalcompany.com#EXT#@yourtenant.onmicrosoft.com' },
  { category: 'identity', icon: '💣', fact: 'WAP replaced federation server proxy from Windows Server 2012 R2', detail: 'Web Application Proxy (WAP) is the external-facing component for AD FS from WS2012 R2 onward.' },

  // SECURITY / EOP
  { category: 'security', icon: '💣', fact: 'ZAP works on Exchange Online ONLY — not on-prem Exchange', detail: 'Zero-hour Auto Purge retroactively removes threats post-delivery. Standalone EOP for on-prem Exchange does NOT get ZAP.' },
  { category: 'security', icon: '💣', fact: 'ZAP for malware removes the attachment even if the email was already read', detail: 'Malware ZAP is aggressive — it removes the attachment regardless of read status. Spam ZAP only acts on unread messages.' },
  { category: 'security', icon: '💣', fact: 'SCL -1 = bypass all spam filtering', detail: 'Messages with SCL -1 are whitelisted (e.g. from a trusted IP range or safe sender list) and skip all spam filtering.' },
  { category: 'security', icon: '💣', fact: 'Defender for Office 365 Plan 1 vs Plan 2', detail: 'P1: Safe Links, Safe Attachments, Anti-phishing. P2 adds: Threat Explorer, AIR, Attack Simulator, Campaign views.' },
  { category: 'security', icon: '💣', fact: 'Safe Attachments Dynamic Delivery: email arrives immediately, attachment replaced after scan', detail: 'Users don\'t wait for scanning. A placeholder attachment is used during the sandboxing process.' },
  { category: 'security', icon: '💣', fact: 'Threat Explorer data retention: 30 days', detail: 'Real-time Detections (Plan 1) shows 7 days. Threat Explorer (Plan 2) shows 30 days of email metadata.' },

  // SECURITY / EMAIL AUTH
  { category: 'security', icon: '💣', fact: 'SPF = TXT record listing authorised sending IPs', detail: 'Format: v=spf1 include:spf.protection.outlook.com -all. Only validates the 5321.MailFrom (envelope sender), NOT the visible From: header.' },
  { category: 'security', icon: '💣', fact: 'DKIM requires exactly 2 CNAME records', detail: 'selector1._domainkey.domain.com and selector2._domainkey.domain.com. Microsoft rotates between them automatically.' },
  { category: 'security', icon: '💣', fact: 'DMARC = TXT record at _dmarc.yourdomain.com', detail: 'Uses SPF and DKIM results to validate the visible From: header. Policy options: none (monitor), quarantine, reject.' },
  { category: 'security', icon: '💣', fact: 'SPF protects envelope sender; DMARC protects the visible From: header', detail: 'Attackers exploit this gap: SPF passes on the envelope address, but the user sees a spoofed From: header. DMARC closes this gap.' },
  { category: 'security', icon: '💣', fact: 'Email auth order: SPF → DKIM → DMARC', detail: 'DMARC acts on the RESULTS of SPF and DKIM checks. Set up SPF and DKIM first, then add DMARC.' },

  // DNS
  { category: 'dns', icon: '💣', fact: 'MX record = email routing to Exchange Online', detail: 'Points to yourdomain-com.mail.protection.outlook.com. Without this, email won\'t flow to Exchange Online.' },
  { category: 'dns', icon: '💣', fact: 'CNAME records required for M365', detail: 'autodiscover (Exchange), msoid (authentication), sip + lyncdiscover (Teams), mdm + enterpriseenrollment (Intune)' },
  { category: 'dns', icon: '💣', fact: 'SRV records = Teams/Skype federation', detail: '_sip._tls and _sipfederationtls._tcp records enable federation with external Teams/Skype organisations.' },
  { category: 'dns', icon: '💣', fact: 'TXT record used for BOTH domain ownership verification AND SPF', detail: 'When you add a custom domain to M365, you prove ownership via a TXT record. SPF is also a TXT record — different values, same record type.' },

  // COMPLIANCE
  { category: 'compliance', icon: '💣', fact: 'Trainable classifiers need minimum 50 positive samples', detail: 'Seed content: 50–500 examples of what you want to classify. Microsoft then uses ML to identify similar content.' },
  { category: 'compliance', icon: '💣', fact: 'Regulatory records CANNOT be modified or deleted — ever', detail: 'More restrictive than standard records. Once declared, the item is immutable for the full retention period.' },
  { category: 'compliance', icon: '💣', fact: 'Endpoint DLP monitors device activities: USB copy, print, cloud upload', detail: 'Requires Windows 10/11 with Defender for Endpoint onboarded. Monitors file activities at the OS level.' },
  { category: 'compliance', icon: '💣', fact: 'eDiscovery Premium requires E5 or add-on', detail: 'Standard eDiscovery is included in E3. Premium (custodian management, advanced analytics) needs E5 or Microsoft 365 E5 Compliance.' },
  { category: 'compliance', icon: '💣', fact: 'Compliance Manager score ≠ proof of compliance with any regulation', detail: 'It is a risk-based score to guide improvement actions. A score of 100% does not mean you are certified compliant.' },
  { category: 'compliance', icon: '💣', fact: 'Content Explorer requires specific Purview roles', detail: 'Content Explorer Content Viewer (see actual content) or Content Explorer List Viewer (see file names only). Not available to all admins.' },
  { category: 'compliance', icon: '💣', fact: 'Sensitivity labels can encrypt content AND restrict permissions', detail: 'Encryption follows the file — opening a protected Word doc on any device still enforces the permissions even outside M365.' },
  { category: 'compliance', icon: '💣', fact: 'Auto-labeling for SharePoint/OneDrive requires E5 or Compliance add-on', detail: 'Manual and recommended labels are available at lower tiers. Automatic (server-side) labeling needs E5.' },
];

// ─── ADMIN PLAYBOOK DATA ─────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: 'admin-center',
    name: 'M365 Admin Center',
    icon: '⚙️',
    category: 'management',
    portal: 'admin.microsoft.com',
    metaphorIcon: '🏢',
    metaphor: 'The Reception Desk',
    desc: 'Your first stop for almost everything. It\'s the front desk that handles the basics — who has an account, what licences they have, billing, domains, and service health. It routes you to every other admin portal.',
    when: [
      '<strong>Create or delete a user</strong>',
      '<strong>Assign or remove licences</strong>',
      '<strong>Add a custom domain</strong>',
      '<strong>Check if a Microsoft service is down</strong> (Service Health)',
      '<strong>See what\'s changing next month</strong> (Message Center)',
      '<strong>Purchase new subscriptions</strong>',
    ]
  },
  {
    id: 'entra',
    name: 'Microsoft Entra ID',
    icon: '🔐',
    category: 'identity',
    portal: 'entra.microsoft.com',
    metaphorIcon: '🚪',
    metaphor: 'The Front Door with a Bouncer',
    desc: 'Every single login to every single M365 service passes through here. It\'s not just a directory of users — it\'s the gatekeeper. No one gets into Exchange, Teams, SharePoint, or anything else without Entra ID saying yes first.',
    when: [
      '<strong>User can\'t log in</strong> — check sign-in logs here',
      '<strong>Reset MFA methods</strong> for a user',
      '<strong>Set up Conditional Access</strong> policies',
      '<strong>Manage PIM</strong> (just-in-time admin access)',
      '<strong>Configure password policies</strong> and SSPR',
      '<strong>Review risky sign-ins</strong> (Identity Protection)',
      '<strong>Invite guest users</strong> (B2B)',
    ]
  },
  {
    id: 'conditional-access',
    name: 'Conditional Access',
    icon: '🚦',
    category: 'identity',
    portal: 'entra.microsoft.com → Protection → Conditional Access',
    metaphorIcon: '📋',
    metaphor: 'The Bouncer\'s Rulebook',
    desc: 'Lives inside Entra ID. It\'s the set of rules that the bouncer follows. "If you\'re logging in from an unknown country — require MFA." "If your device isn\'t compliant — block access." You don\'t create a user here. You just define the conditions for letting them in.',
    when: [
      '<strong>Block access from specific countries</strong>',
      '<strong>Require MFA for all admins</strong>',
      '<strong>Require compliant device</strong> to access company email',
      '<strong>Investigate why a user was blocked</strong> — sign-in log shows which CA policy fired',
      '<strong>Test a new policy safely</strong> with Report-Only mode first',
    ]
  },
  {
    id: 'pim',
    name: 'Privileged Identity Management',
    icon: '👑',
    category: 'identity',
    portal: 'entra.microsoft.com → Identity Governance → PIM',
    metaphorIcon: '🗝️',
    metaphor: 'The Key Cabinet with a Sign-Out Sheet',
    desc: 'You don\'t leave master keys lying around. When someone needs Global Admin for 2 hours to do a task, they sign it out from PIM, it gets approved, and it auto-expires. No permanent standing access. Every use is logged. Requires P2.',
    when: [
      '<strong>Admin needs elevated access</strong> for a specific task',
      '<strong>Set up approval workflows</strong> for sensitive roles',
      '<strong>Audit who used what admin role and when</strong>',
      '<strong>Reduce standing privileged access</strong> across the org',
    ]
  },
  {
    id: 'entra-connect',
    name: 'Entra Connect (AD Connect)',
    icon: '🔄',
    category: 'identity',
    portal: 'Installed on-prem server',
    metaphorIcon: '🌉',
    metaphor: 'The Bridge Between Old and New',
    desc: 'Your org has been using on-premises Active Directory for years. Entra Connect is the bridge that carries those user accounts across into the cloud. Accounts created in the old system automatically appear in M365. Changes sync every 30 minutes. Without this bridge, cloud and on-prem are two separate islands.',
    when: [
      '<strong>Set up hybrid identity</strong> (on-prem AD + cloud)',
      '<strong>User exists on-prem but not in M365</strong> — check sync status',
      '<strong>Attribute changes not appearing in cloud</strong> — trigger a sync',
      '<strong>Run IdFix first</strong> to clean up AD errors before deploying',
    ]
  },
  {
    id: 'exchange',
    name: 'Exchange Online',
    icon: '📮',
    category: 'productivity',
    portal: 'admin.exchange.microsoft.com',
    metaphorIcon: '🏤',
    metaphor: 'The Post Office',
    desc: 'Every email your organisation sends or receives flows through Exchange Online. The Exchange Admin controls the sorting rules (mail flow rules), the shared PO boxes (shared mailboxes), distribution lists, and how the postmaster handles delivery. Nothing about email bypasses this.',
    when: [
      '<strong>User not receiving email</strong> — trace message delivery',
      '<strong>Create a shared mailbox</strong> (e.g. support@company.com)',
      '<strong>Create a distribution list</strong> (emails to a group)',
      '<strong>Set up mail flow rules</strong> (e.g. add disclaimer, redirect certain mail)',
      '<strong>Put a mailbox on Litigation Hold</strong>',
      '<strong>Configure journaling</strong> for compliance',
    ]
  },
  {
    id: 'eop',
    name: 'Exchange Online Protection',
    icon: '🔍',
    category: 'security',
    portal: 'security.microsoft.com → Email & Collaboration → Policies',
    metaphorIcon: '🛃',
    metaphor: 'Customs at the Airport',
    desc: 'Sits in front of Exchange Online. Every single email — in, out, and internal — passes through EOP first. It scans for spam, malware, and phishing before anything reaches a mailbox. It\'s always on, always running, included free with every Exchange Online plan. Defender for Office 365 is the specialist team you call in after EOP flags something hard.',
    when: [
      '<strong>Adjust spam filter settings</strong>',
      '<strong>Review quarantined emails</strong>',
      '<strong>Add a sender to the safe/block list</strong>',
      '<strong>Understand why a legitimate email was flagged</strong> (check SCL score)',
      '<strong>Configure anti-malware policies</strong>',
    ]
  },
  {
    id: 'defender-office',
    name: 'Defender for Office 365',
    icon: '🎯',
    category: 'security',
    portal: 'security.microsoft.com → Email & Collaboration',
    metaphorIcon: '💣',
    metaphor: 'The Bomb Disposal Unit',
    desc: 'EOP handles the obvious threats. Defender for Office 365 handles the sophisticated ones. Safe Attachments detonates suspicious files in an isolated sandbox before delivering them. Safe Links rewrites every URL and checks it again at the moment you click — even if it was safe when it arrived. This is the layer that catches targeted attacks, not just bulk spam.',
    when: [
      '<strong>Investigate a phishing email</strong> that got through — Threat Explorer',
      '<strong>Run phishing simulation training</strong> — Attack Simulator (Plan 2)',
      '<strong>Check if Safe Links is protecting Teams</strong> as well as email',
      '<strong>Review automated investigations</strong> — AIR (Plan 2)',
      '<strong>See all emails in a malicious campaign</strong> — Campaign views (Plan 2)',
    ]
  },
  {
    id: 'sharepoint',
    name: 'SharePoint Online',
    icon: '📁',
    category: 'productivity',
    portal: 'admin.microsoft.com → SharePoint',
    metaphorIcon: '🏛️',
    metaphor: 'The Company\'s Filing Rooms',
    desc: 'SharePoint is where documents live when they belong to a team, not a person. Every Microsoft 365 Group, every Teams channel, every department site has a SharePoint site behind it with file storage. The SharePoint admin controls the master keys — who can share externally, how much storage each site gets, who owns which rooms.',
    when: [
      '<strong>Control external sharing</strong> org-wide',
      '<strong>User says they can\'t access a team\'s files</strong> — check site permissions',
      '<strong>Site storage is full</strong> — increase quota',
      '<strong>Someone shared files outside the org</strong> — run sharing reports',
      '<strong>Configure sensitivity labels on sites</strong>',
    ]
  },
  {
    id: 'onedrive',
    name: 'OneDrive for Business',
    icon: '💾',
    category: 'productivity',
    portal: 'admin.microsoft.com → SharePoint (covers OneDrive)',
    metaphorIcon: '🗄️',
    metaphor: 'Your Personal Desk Drawer',
    desc: 'SharePoint is for the team. OneDrive is for you. Private by default — only you can see it unless you choose to share something. It syncs to your device so you can work offline. It\'s built on SharePoint infrastructure but the mental model is completely different: this is your stuff, not the team\'s stuff.',
    when: [
      '<strong>User\'s files aren\'t syncing</strong> — check OneDrive sync client on device',
      '<strong>User accidentally shared something externally</strong> — revoke access',
      '<strong>Set up Known Folder Move</strong> (Desktop, Documents → OneDrive automatically)',
      '<strong>User left the org, need to access their files</strong> — admin can grant access for 30 days',
    ]
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: '💬',
    category: 'productivity',
    portal: 'admin.teams.microsoft.com',
    metaphorIcon: '🏢',
    metaphor: 'The Open-Plan Office',
    desc: 'Teams is where people actually work day-to-day — chat, meetings, calls, collaboration. But here\'s the thing most people don\'t realise: Teams is built on top of everything else. Files in a Teams channel live in SharePoint. Meetings use Exchange calendars. Identity is Entra ID. Teams is the interface — the other services are the infrastructure underneath.',
    when: [
      '<strong>Meeting feature not available for a user</strong> — check their meeting policy',
      '<strong>Configure who can invite external users</strong> to meetings',
      '<strong>Set up calling policies</strong> (if using Teams Phone)',
      '<strong>Guest access not working</strong> — check external access settings',
      '<strong>Block certain Teams apps</strong> from the app store',
    ]
  },
  {
    id: 'intune',
    name: 'Microsoft Intune',
    icon: '📱',
    category: 'device',
    portal: 'intune.microsoft.com',
    metaphorIcon: '🔧',
    metaphor: 'The IT Hardware Desk',
    desc: 'Intune manages the physical devices. It decides: does this device have a PIN? Is it encrypted? What OS version is required? Is the company portal app installed? If a device doesn\'t meet the rules (compliance policy), Intune marks it non-compliant — and Conditional Access can then block it from company resources. Intune + Conditional Access is the "zero trust for devices" combination.',
    when: [
      '<strong>User\'s device can\'t access company email or apps</strong> — check compliance status in Intune',
      '<strong>Enrol a new device</strong> into management',
      '<strong>Push software to all company laptops</strong>',
      '<strong>Remotely wipe a lost or stolen device</strong>',
      '<strong>Configure what the device can and can\'t do</strong> (configuration profiles)',
      '<strong>Set up Windows Autopilot</strong> for zero-touch device setup',
    ]
  },
  {
    id: 'defender-xdr',
    name: 'Microsoft Defender XDR',
    icon: '🛡️',
    category: 'security',
    portal: 'security.microsoft.com',
    metaphorIcon: '🚨',
    metaphor: 'The Security Operations Centre',
    desc: 'This is where your security team lives. All alerts from all Defender products — email, identity, devices, cloud apps — flow here and get correlated into a single incident. Instead of getting five separate alerts about the same attacker, you get one incident that shows the full attack chain. This is also where you hunt threats using KQL (Advanced Hunting).',
    when: [
      '<strong>Active security incident</strong> — investigate here, see the full picture',
      '<strong>Hunt for threats</strong> across email, device, identity data — Advanced Hunting',
      '<strong>Review automated investigation results</strong> — AIR</strong>',
      '<strong>Check threat intelligence reports</strong> — Threat Analytics',
      '<strong>Manage quarantine</strong> for email and files',
    ]
  },
  {
    id: 'defender-identity',
    name: 'Defender for Identity',
    icon: '🕵️',
    category: 'security',
    portal: 'security.microsoft.com → Identities',
    metaphorIcon: '📹',
    metaphor: 'CCTV for Your Server Room',
    desc: 'Your domain controllers — the crown jewels of on-prem AD — are invisible to most cloud security tools. Defender for Identity puts a lightweight sensor directly on each domain controller and watches every authentication, every privilege escalation, every lateral movement attempt. It detects the attacks that happen after someone is already inside your network.',
    when: [
      '<strong>Investigate a potentially compromised on-prem account</strong>',
      '<strong>Detect lateral movement attacks</strong> (pass-the-hash, pass-the-ticket)',
      '<strong>Get alerts about suspicious AD activity</strong>',
      '<strong>See a full identity timeline</strong> for a suspected attacker',
    ]
  },
  {
    id: 'defender-cloudapps',
    name: 'Defender for Cloud Apps',
    icon: '☁️',
    category: 'security',
    portal: 'security.microsoft.com → Cloud Apps',
    metaphorIcon: '🔭',
    metaphor: 'The Shadow IT Detector',
    desc: 'Your users are using Dropbox, personal Gmail, WhatsApp — apps you didn\'t approve and can\'t see. Defender for Cloud Apps analyses network traffic to discover what cloud apps are in use (shadow IT), lets you sanction or block them, and monitors for anomalous behaviour in the apps you do allow. It\'s the view of what your org is actually doing in the cloud.',
    when: [
      '<strong>Find out what unsanctioned apps employees are using</strong>',
      '<strong>Block access to specific cloud apps</strong>',
      '<strong>Alert on unusual activity</strong> (e.g. someone downloading 10,000 files at 2am)',
      '<strong>Enforce session-level controls</strong> on cloud app usage',
    ]
  },
  {
    id: 'purview',
    name: 'Microsoft Purview',
    icon: '⚖️',
    category: 'compliance',
    portal: 'purview.microsoft.com',
    metaphorIcon: '🗂️',
    metaphor: 'The Compliance Officer\'s Office',
    desc: 'Purview answers the questions legal and compliance teams ask: Where is our sensitive data? Who accessed it? How long do we keep emails? If we get subpoenaed, how do we find everything? It\'s not a security tool — it\'s a governance tool. It classifies your data, enforces handling rules (DLP), manages what gets kept and deleted (retention), and helps you find things for legal holds (eDiscovery).',
    when: [
      '<strong>Sensitive data was accidentally shared</strong> — Activity Explorer, then DLP policy',
      '<strong>Legal hold required</strong> — eDiscovery, place custodian on hold',
      '<strong>Set up sensitivity labels</strong> on emails and files',
      '<strong>Create a DLP policy</strong> to block credit card numbers leaving via email',
      '<strong>Configure retention</strong> — keep emails 7 years, then auto-delete',
      '<strong>Find all emails from a specific person</strong> — Content Search',
    ]
  },
];

const _LEGACY_TS = [
  {
    id: 'login',
    icon: '🔐',
    symptom: 'User can\'t log in',
    branches: [
      {
        question: 'Is the account locked, disabled, or doesn\'t exist yet?',
        category: 'management',
        portal: 'M365 Admin Center',
        action: 'Check Active users → is account there and enabled?',
        how: 'admin.microsoft.com → Users → Active users. Look for a "Blocked from sign-in" banner.',
      },
      {
        question: 'MFA is failing or they lost their authenticator app?',
        category: 'identity',
        portal: 'Entra ID',
        action: 'Reset their MFA methods so they can re-register',
        how: 'entra.microsoft.com → Users → find user → Authentication methods → Require re-register MFA',
      },
      {
        question: 'Sign-in log shows "Conditional Access policy" as the failure reason?',
        category: 'identity',
        portal: 'Entra ID → Sign-in logs',
        action: 'Find which CA policy fired, understand why, fix or exempt if legitimate',
        how: 'entra.microsoft.com → Sign-in logs → find the failed attempt → Conditional Access tab → see which policy blocked it',
      },
      {
        question: 'They\'re getting in but can\'t access a specific app — and they\'re on a personal device?',
        category: 'device',
        portal: 'Intune',
        action: 'Device is probably non-compliant — check what\'s failing in the compliance policy',
        how: 'intune.microsoft.com → Devices → find device → Device compliance → see which requirements failed',
      },
      {
        question: 'User exists on-prem AD but not showing in M365?',
        category: 'identity',
        portal: 'Entra Connect (on-prem server)',
        action: 'Check sync status — maybe sync failed or the user is in a filtered OU',
        how: 'On the Entra Connect server: Synchronization Service Manager → check for errors. Or: Start-ADSyncSyncCycle -PolicyType Delta in PowerShell',
      },
    ]
  },
  {
    id: 'email',
    icon: '📧',
    symptom: 'User not receiving email',
    branches: [
      {
        question: 'Email is arriving but going to Junk or Quarantine?',
        category: 'security',
        portal: 'Defender / security.microsoft.com',
        action: 'Review quarantine, release the message, add sender to safe senders',
        how: 'security.microsoft.com → Email & Collaboration → Review → Quarantine. Search by recipient.',
      },
      {
        question: 'Specific sender\'s emails never arrive and they\'re external?',
        category: 'security',
        portal: 'Exchange + Defender',
        action: 'Trace the message to find where it stopped. Check if EOP blocked it.',
        how: 'admin.exchange.microsoft.com → Mail flow → Message trace. Or security.microsoft.com → Threat Explorer → search that sender.',
      },
      {
        question: 'Emails from ALL senders aren\'t arriving?',
        category: 'management',
        portal: 'M365 Admin Center → Domains',
        action: 'Check the MX record — if it\'s wrong, email is going somewhere else entirely',
        how: 'admin.microsoft.com → Settings → Domains → check MX record is pointing to mail.protection.outlook.com',
      },
      {
        question: 'Email is arriving but a mail flow rule is redirecting or deleting it?',
        category: 'productivity',
        portal: 'Exchange Admin Center',
        action: 'Review transport rules — one may be matching unexpectedly',
        how: 'admin.exchange.microsoft.com → Mail flow → Rules. Check each rule for broad conditions.',
      },
    ]
  },
  {
    id: 'phishing',
    icon: '🎣',
    symptom: 'Suspicious email / phishing reported',
    branches: [
      {
        question: 'User got a phish — need to find it and similar ones across the org?',
        category: 'security',
        portal: 'Defender XDR → Threat Explorer',
        action: 'Search by sender, subject, or URL. Select all matches and take bulk action.',
        how: 'security.microsoft.com → Email & Collaboration → Explorer. Filter by sender. Select all → Soft delete or Move to junk.',
      },
      {
        question: 'Need to block the sender or domain org-wide immediately?',
        category: 'security',
        portal: 'Defender XDR → Tenant Allow/Block List',
        action: 'Add the sender domain or email address to the block list',
        how: 'security.microsoft.com → Policies & Rules → Threat Policies → Tenant Allow/Block Lists → add block entry',
      },
      {
        question: 'Did ZAP already act? Need to confirm what happened post-delivery?',
        category: 'security',
        portal: 'Defender XDR → Threat Explorer',
        action: 'Check "Latest delivery location" vs "Original delivery location" — if different, ZAP moved it',
        how: 'In Threat Explorer, the delivery action column shows: Delivered → Junk or Quarantine if ZAP acted after delivery.',
      },
      {
        question: 'Want to train users so they spot phishing next time?',
        category: 'security',
        portal: 'Defender → Attack Simulator',
        action: 'Run a simulated phishing campaign, assign training to users who fell for it',
        how: 'security.microsoft.com → Email & Collaboration → Attack Simulation Training → Launch a simulation. Requires Defender for Office 365 Plan 2.',
      },
    ]
  },
  {
    id: 'device',
    icon: '💻',
    symptom: 'User\'s device can\'t access company apps',
    branches: [
      {
        question: 'Sign-in log shows "Device is not compliant" as the block reason?',
        category: 'device',
        portal: 'Intune',
        action: 'Find the device, check which compliance requirement is failing (PIN, encryption, OS version)',
        how: 'intune.microsoft.com → Devices → All devices → find device → Device compliance → see failed checks',
      },
      {
        question: 'The device isn\'t enrolled in Intune at all?',
        category: 'device',
        portal: 'Intune',
        action: 'Enrol the device — user needs to go through Company Portal app or enrolment URL',
        how: 'Send user to aka.ms/windowsenrollment (Windows) or install Company Portal app (iOS/Android)',
      },
      {
        question: 'Device IS compliant but still getting blocked?',
        category: 'identity',
        portal: 'Entra ID → Sign-in logs',
        action: 'Check which CA policy is firing — maybe it requires domain-joined device not just compliant',
        how: 'entra.microsoft.com → Sign-in logs → find failed attempt → Conditional Access tab. Read the exact requirement that failed.',
      },
      {
        question: 'Lost or stolen device — need to wipe it now?',
        category: 'device',
        portal: 'Intune',
        action: 'Remote wipe (full wipe) or Retire (removes company data only, keeps personal)',
        how: 'intune.microsoft.com → Devices → find device → Wipe (factory reset) or Retire (remove company data). Use Retire for BYOD.',
      },
    ]
  },
  {
    id: 'data',
    icon: '🔓',
    symptom: 'Sensitive data was shared outside the org',
    branches: [
      {
        question: 'Need to see exactly who shared what and when?',
        category: 'compliance',
        portal: 'Microsoft Purview → Activity Explorer',
        action: 'Filter by activity type "Shared" or "Sent" to see exactly what happened',
        how: 'purview.microsoft.com → Data classification → Activity explorer. Filter by date, user, activity type.',
      },
      {
        question: 'It was a file shared via SharePoint/OneDrive link?',
        category: 'productivity',
        portal: 'SharePoint Admin Center',
        action: 'Find the file, revoke the sharing link or change permissions immediately',
        how: 'admin.microsoft.com → SharePoint → find site → Site contents → find file → Manage access → remove external access',
      },
      {
        question: 'It was sent as an email attachment to an external address?',
        category: 'productivity',
        portal: 'Exchange Admin Center + Purview',
        action: 'Trace the message to confirm delivery. Create a DLP rule to prevent this happening again.',
        how: 'admin.exchange.microsoft.com → Message trace to confirm. Then purview.microsoft.com → DLP → create policy to block sensitive info going externally.',
      },
      {
        question: 'Want to prevent this happening again automatically?',
        category: 'compliance',
        portal: 'Microsoft Purview → DLP',
        action: 'Create a DLP policy that detects sensitive content type and blocks or alerts on external sharing',
        how: 'purview.microsoft.com → Data loss prevention → Policies → Create policy. Choose sensitive info type (e.g. credit card, SSN), set location (Exchange + SharePoint + Teams), set action (block or notify).',
      },
    ]
  },
  {
    id: 'legal',
    icon: '⚖️',
    symptom: 'Legal needs all comms from a specific person',
    branches: [
      {
        question: 'First step — preserve everything so nothing gets deleted during investigation?',
        category: 'compliance',
        portal: 'Microsoft Purview → eDiscovery',
        action: 'Create a Legal Hold on the custodian\'s mailbox and OneDrive immediately',
        how: 'purview.microsoft.com → eDiscovery → Cases → create case → add custodian → place on hold. This preserves content even if the user deletes it.',
      },
      {
        question: 'Now search for all relevant content across email, Teams, SharePoint?',
        category: 'compliance',
        portal: 'Microsoft Purview → Content Search or eDiscovery',
        action: 'Run a content search scoped to that person, date range, and keywords',
        how: 'purview.microsoft.com → Content search → New search → define custodian, locations, date range, keywords → run → review results.',
      },
      {
        question: 'Need to export the results for legal review?',
        category: 'compliance',
        portal: 'Microsoft Purview → eDiscovery',
        action: 'Export results — PST (email), files, and reports. Requires eDiscovery Manager role.',
        how: 'In the eDiscovery case → review set → Export. Choose format. Download using eDiscovery Export Tool.',
      },
    ]
  },
];

// ─── EXAM SCENARIOS (exhaustive) ─────────────────────────────────────────────
// Each scenario = an exam-style situation. Branches = specific causes → portal → exact action → exam note.

const EXAM_SCENARIOS = [

  // ══════════════════════════════════════════════
  // TENANT & ADMIN ROLES
  // ══════════════════════════════════════════════
  {
    id: 'country-change', domain: 'tenant', icon: '🌍',
    situation: 'Contoso recently moved its HQ from France to the USA. The M365 admin needs to update the country/region in the tenant.',
    examTrap: 'You CANNOT edit the country/region field — it\'s locked forever.',
    branches: [
      { trigger: 'Try to edit the country/region field in Org settings', correct: false, verdict: '❌ Impossible', portal: '—', action: 'Country/region field is read-only and cannot be changed', examNote: 'This field determines datacenter location, available services, and billing currency. It is permanently locked after creation.' },
      { trigger: 'Create a brand new M365 tenant in the correct country', correct: true, verdict: '✓ Only option', portal: 'portal.microsoft.com → new account', action: 'Sign up for a new subscription, select USA as country, purchase new licences, migrate users', examNote: 'The ONLY way to change country/region is to create a completely new tenant and subscription.' },
    ]
  },
  {
    id: 'sharepoint-language', domain: 'tenant', icon: '🗣️',
    situation: 'Tailwind Traders originally set their SharePoint preferred language to French. They\'ve now moved to New York. Admin changed the "Preferred language" setting to English — but SharePoint is still in French.',
    examTrap: 'Changing preferred language does NOT change SharePoint\'s language.',
    branches: [
      { trigger: 'Change Preferred language in Org settings again', correct: false, verdict: '❌ Won\'t fix it', portal: 'admin.microsoft.com → Settings → Org settings', action: 'Microsoft will send future communications in the new language, but SharePoint language is already baked in', examNote: 'SharePoint Online language is set at tenant creation and CANNOT be changed. Future comms change — SharePoint does not.' },
      { trigger: 'Accept it — SharePoint language is permanent', correct: true, verdict: '✓ That\'s correct', portal: '—', action: 'The SharePoint language at tenant creation cannot be changed. This is a known limitation.', examNote: 'A favourite exam trick: preferred language and SharePoint language are separate. Only the preferred language changes on update.' },
    ]
  },
  {
    id: 'least-privilege-role', domain: 'tenant', icon: '🔑',
    situation: 'Holly assigned Global Admin to a user who only needs to manage Microsoft 365 Apps cloud settings and cloud policies. Microsoft flagged this as a security violation.',
    examTrap: 'Global Admin for a specific task = violates least privilege principle.',
    branches: [
      { trigger: 'User manages M365 Apps cloud settings, cloud policies, self-service downloads only', correct: true, verdict: '✓ Assign: Office Apps Admin', portal: 'entra.microsoft.com → Roles and administrators', action: 'Remove Global Admin, assign Office Apps Administrator role instead', examNote: 'Microsoft\'s security guideline: assign the least permissive role. Global Admin for apps management is over-privileged.' },
      { trigger: 'User needs all access to Entra ID features + services that use Entra identities', correct: true, verdict: '✓ Assign: Global Admin', portal: 'entra.microsoft.com → Roles and administrators', action: 'Global Admin is appropriate here — full access to all admin features including Entra', examNote: 'Global Admin is correct when full Entra ID access + all M365 services is genuinely required.' },
      { trigger: 'User only needs to reset passwords for non-admin users', correct: true, verdict: '✓ Assign: Password Admin or Helpdesk Admin', portal: 'entra.microsoft.com → Roles and administrators', action: 'Password Admin for just password resets; Helpdesk Admin if they also need to manage service requests', examNote: 'Never give User Admin or Global Admin for a role that just needs password resets.' },
      { trigger: 'User manages SharePoint sites and OneDrive policies', correct: true, verdict: '✓ Assign: SharePoint Admin', portal: 'entra.microsoft.com → Roles and administrators', action: 'SharePoint Administrator role scoped to SharePoint + OneDrive only', examNote: 'Always scope to the service. SharePoint Admin cannot touch Exchange or Teams — that\'s correct.' },
    ]
  },
  {
    id: 'service-health', domain: 'tenant', icon: '📊',
    situation: 'Multiple users are reporting they can\'t access Teams. The admin needs to know if this is a Microsoft outage or an internal problem — and track upcoming changes.',
    branches: [
      { trigger: 'Is Microsoft Teams itself having an outage right now?', correct: true, verdict: '✓ Check Service Health', portal: 'admin.microsoft.com → Health → Service health', action: 'Shows real-time status of every M365 service. Look for active incidents on Teams.', examNote: 'Service Health Dashboard = real-time incidents. If Microsoft lists an active advisory, that\'s your answer — not a config issue.' },
      { trigger: 'Is there a Teams update or change rolling out that could cause this?', correct: true, verdict: '✓ Check Message Center', portal: 'admin.microsoft.com → Health → Message center', action: 'Shows planned changes, feature rollouts, and important announcements before they happen', examNote: 'Message Center ≠ Service Health. Message Center = upcoming changes. Service Health = current incidents.' },
      { trigger: 'Need to get email alerts when a service goes down in future', correct: true, verdict: '✓ Configure health notifications', portal: 'admin.microsoft.com → Health → Service health → Preferences', action: 'Set email notification preferences — choose which services and which admins receive alerts', examNote: 'Each admin can configure their own notification preferences per service.' },
    ]
  },
  {
    id: 'partner-access', domain: 'tenant', icon: '🤝',
    situation: 'Tailspin Toys outsourced IT admin to a Microsoft partner. The partner sent an email requesting permission to act as admin on Tailspin\'s behalf. What should Tailspin do?',
    branches: [
      { trigger: 'What is the correct way to grant a partner delegated admin access?', correct: true, verdict: '✓ Accept the partner\'s request in Admin Center', portal: 'admin.microsoft.com → Settings → Partner relationships', action: 'Review and approve the Delegated Admin relationship request sent by the partner', examNote: 'Partners request GDAP (Granular Delegated Admin Privileges). The admin must explicitly approve it — it\'s not automatic from just receiving an email.' },
      { trigger: 'Partner asks for Global Admin credentials directly via email', correct: false, verdict: '❌ Never do this', portal: '—', action: 'Sharing admin credentials = security violation. Legitimate partners never ask for your password.', examNote: 'Exam trap: legitimate partners use delegated admin relationships, never shared credentials.' },
    ]
  },

  // ══════════════════════════════════════════════
  // IDENTITY, SYNC & AUTH
  // ══════════════════════════════════════════════
  {
    id: 'cant-sign-in-comprehensive', domain: 'identity', icon: '🚪',
    situation: 'A user reports they cannot sign in to Microsoft 365. Diagnose and fix.',
    branches: [
      { trigger: 'Account is locked, disabled, or doesn\'t show in Active Users', correct: true, verdict: '✓ Check account status', portal: 'admin.microsoft.com → Users → Active users', action: 'Search for the user. If blocked: click their name → Unblock sign-in. If deleted: go to Deleted users → Restore (within 30 days)', examNote: 'Deleted users are soft-deleted for 30 days and can be restored. After 30 days = permanently gone.' },
      { trigger: 'Sign-in log shows failure reason: "MFA required" or they lost their authenticator', correct: true, verdict: '✓ Reset MFA registration', portal: 'entra.microsoft.com → Users → [user] → Authentication methods', action: 'Click "Require re-register MFA" — user gets prompted to set up MFA fresh on next sign-in', examNote: 'Never disable MFA to fix this — reset registration instead. Disabling MFA = security violation.' },
      { trigger: 'Sign-in log shows failure: "Conditional Access policy" blocked sign-in', correct: true, verdict: '✓ Read the CA sign-in log', portal: 'entra.microsoft.com → Sign-in logs → [failed attempt] → Conditional Access tab', action: 'Find exactly which policy fired and why. Either fix the root cause (enrol device, add MFA) or create a named location/exclusion if legitimate', examNote: 'Always check WHICH policy fired. Report-only mode shows what WOULD fire without actually blocking — use it for testing new policies.' },
      { trigger: 'User is on a personal device and "compliant device required" is the CA failure', correct: true, verdict: '✓ Enrol or check device in Intune', portal: 'intune.microsoft.com → Devices → [device] → Device compliance', action: 'Device must be enrolled in Intune and pass compliance policies (PIN, encryption, OS version). Non-compliant = CA blocks access', examNote: 'CA + Intune integration: Intune marks device compliant/non-compliant → CA reads that status. Fix compliance in Intune, access restores automatically.' },
      { trigger: 'User exists in on-prem AD but is not showing in M365 at all', correct: true, verdict: '✓ Check Entra Connect sync', portal: 'Entra Connect server → Synchronization Service Manager', action: 'Check for sync errors. Force delta sync: Start-ADSyncSyncCycle -PolicyType Delta. Verify user is in a synced OU.', examNote: 'If a user is in a filtered OU or has AD errors, they won\'t sync. Run IdFix to find attribute errors.' },
      { trigger: 'User password expired on-prem (hybrid environment)', correct: true, verdict: '✓ Reset in on-prem AD', portal: 'On-prem: Active Directory Users & Computers', action: 'Reset the password in on-prem AD. With PHS, the hash syncs to cloud within minutes. With PTA, the cloud validates against on-prem in real time.', examNote: 'In hybrid: password changes made in cloud sync back to on-prem (if password writeback is enabled). Without writeback, change must happen on-prem.' },
    ]
  },
  {
    id: 'setup-hybrid-identity', domain: 'identity', icon: '🌉',
    situation: 'Contoso wants to implement a hybrid identity model and maintain the directory sync tool themselves. Which tool should they use, and what must they run first?',
    branches: [
      { trigger: 'Which tool for hybrid identity sync (org manages it themselves)?', correct: true, verdict: '✓ Microsoft Entra Connect Sync', portal: 'Download from Microsoft + install on-prem', action: 'Entra Connect Sync (full install on-prem server). Choose auth method: PHS (recommended), PTA, or AD FS.', examNote: 'Entra Cloud Sync is the lightweight alternative — Microsoft manages it. Entra Connect Sync = org manages it on their own server.' },
      { trigger: 'What must be done BEFORE deploying Entra Connect?', correct: true, verdict: '✓ Run IdFix first', portal: 'Download IdFix tool from Microsoft', action: 'Run IdFix to scan on-prem AD for duplicate UPNs, invalid characters, format errors. Fix ALL errors before deploying.', examNote: 'IdFix is the pre-migration cleanup tool. Skipping it = sync errors when Connect runs for the first time.' },
      { trigger: 'Which auth method if the org wants simplest setup with no on-prem dependency?', correct: true, verdict: '✓ Password Hash Sync (PHS)', portal: 'Entra Connect wizard → Authentication method selection', action: 'Select PHS. Enable Seamless SSO option. Password hashes sync to cloud — works even if on-prem is down.', examNote: 'PHS = Microsoft recommended. Works offline. Supports Identity Protection (leaked credential detection). Easiest to maintain.' },
      { trigger: 'Which auth method if org policy requires passwords NEVER stored in cloud?', correct: true, verdict: '✓ Pass-Through Authentication (PTA)', portal: 'Entra Connect wizard → Authentication method selection', action: 'Select PTA. Deploy at least 2 PTA agents for redundancy. Enable Seamless SSO.', examNote: 'PTA validates passwords against on-prem AD in real-time — no hash stored in cloud. BUT if on-prem goes down, users can\'t sign in.' },
      { trigger: 'Which auth method if org needs SAML, smart cards, or 3rd-party MFA?', correct: true, verdict: '✓ AD FS Federation', portal: 'Deploy AD FS servers + Web Application Proxy (WAP)', action: 'Most complex. Requires AD FS farm + WAP servers for external access. WAP replaced federation server proxy from WS2012 R2', examNote: 'AD FS = highest maintenance. Choose only when federation features are genuinely needed (SAML, smart cards). Most orgs should use PHS instead.' },
    ]
  },
  {
    id: 'guest-access', domain: 'identity', icon: '👥',
    situation: 'An external partner has been invited to collaborate but can\'t access shared resources. Diagnose guest/B2B access issues.',
    branches: [
      { trigger: 'Guest was invited but hasn\'t accepted yet — can\'t access anything', correct: true, verdict: '✓ Check invitation status', portal: 'entra.microsoft.com → External Identities → All users (filter: Guest)', action: 'Look for External user state = PendingAcceptance. Resend invitation if needed.', examNote: 'Guest UPN format: firstname_guestdomain.com#EXT#@yourtenant.onmicrosoft.com. The #EXT# is exam-critical identification.' },
      { trigger: 'Guest accepted but can see too much (or too little)', correct: true, verdict: '✓ Adjust External collaboration settings', portal: 'entra.microsoft.com → External Identities → External collaboration settings', action: 'Control: can guests see directory? Can they invite others? Guest access restrictions per resource.', examNote: 'Guest users by default can\'t see other guests in the directory. This is intentional — less enumeration.' },
      { trigger: 'Guest can\'t access a specific Teams team or SharePoint site', correct: true, verdict: '✓ Check resource-level permissions', portal: 'SharePoint site → Settings → Site permissions OR Teams admin center → guest settings', action: 'Guest must be added as a member of the specific resource. Being a guest in the tenant doesn\'t auto-grant access everywhere.', examNote: 'Being a guest in the tenant ≠ access to all resources. Each resource requires explicit permission grant.' },
    ]
  },
  {
    id: 'mfa-sspr-setup', domain: 'identity', icon: '📱',
    situation: 'The org wants to enforce MFA for all users and allow users to reset their own passwords without calling the helpdesk.',
    branches: [
      { trigger: 'Enforce MFA for all users — simplest approach, no Entra P1 available', correct: true, verdict: '✓ Enable Security Defaults', portal: 'entra.microsoft.com → Properties → Manage Security defaults', action: 'Enable Security Defaults — requires MFA for all users via Authenticator app, free with any Entra ID tier', examNote: 'Security Defaults = free MFA enforcement. CANNOT be combined with Conditional Access — choose one or the other.' },
      { trigger: 'Enforce MFA with granular control — different rules for different users/locations', correct: true, verdict: '✓ Use Conditional Access (requires P1)', portal: 'entra.microsoft.com → Protection → Conditional Access', action: 'Create CA policy: All users → Grant access → Require MFA. Or scope to specific apps, locations, risk levels.', examNote: 'CA gives you control: require MFA only from untrusted locations, only for specific apps, etc. Requires disabling Security Defaults first.' },
      { trigger: 'Set up Self-Service Password Reset (SSPR) so users can reset their own password', correct: true, verdict: '✓ Configure SSPR (requires P1)', portal: 'entra.microsoft.com → Protection → Password reset', action: 'Enable for All users or a pilot group. Set required auth methods (email, phone, authenticator app, security questions).', examNote: 'SSPR requires Entra ID P1. Free tier includes it for cloud-only accounts but with limited management. Hybrid needs password writeback configured in Entra Connect.' },
      { trigger: 'Admin needs to force a user to re-register their MFA', correct: true, verdict: '✓ Require re-register in authentication methods', portal: 'entra.microsoft.com → Users → [user] → Authentication methods', action: '"Require re-register multifactor authentication" — user is prompted to set up MFA fresh on next sign-in', examNote: 'Use this when user gets a new phone. Do NOT disable MFA entirely — that removes the protection.' },
    ]
  },
  {
    id: 'pim-activation', domain: 'identity', icon: '👑',
    situation: 'Contoso wants to ensure admin roles are only active when needed, with full audit trails and approval workflows.',
    branches: [
      { trigger: 'Which feature provides just-in-time admin access with time limits?', correct: true, verdict: '✓ PIM — Privileged Identity Management', portal: 'entra.microsoft.com → Identity Governance → Privileged Identity Management', action: 'Assign roles as Eligible (not Active). Users activate when needed, role expires automatically.', examNote: 'PIM requires Entra ID P2. Eligible ≠ Active. Eligible means can activate. Active means always on.' },
      { trigger: 'What role can assign other admin roles in Entra ID?', correct: true, verdict: '✓ Privileged Role Administrator', portal: 'entra.microsoft.com → Roles and administrators', action: 'The Privileged Role Administrator role manages role assignments and PIM settings. Global Admin can also do it.', examNote: 'Exam question: "Which role assigns other admin roles?" = Privileged Role Administrator. Not Global Admin (though Global Admin can also do it).' },
      { trigger: 'Eligible admin needs to activate their role — what\'s the process?', correct: true, verdict: '✓ Activate via PIM portal', portal: 'entra.microsoft.com → PIM → My roles → Eligible assignments', action: '1. Click Activate next to the eligible role. 2. Specify duration (e.g. 8 hours). 3. Provide justification. 4. Complete MFA if required. 5. Wait for approval if configured.', examNote: 'After time window expires, access is automatically removed. No manual deactivation needed.' },
    ]
  },
  {
    id: 'conditional-access-setup', domain: 'identity', icon: '🚦',
    situation: 'Contoso wants to block sign-ins from outside Australia and require MFA for all admin accounts accessing Azure portal.',
    branches: [
      { trigger: 'Block sign-ins from all countries except Australia', correct: true, verdict: '✓ Named Location + Conditional Access', portal: 'entra.microsoft.com → Protection → Conditional Access → Named locations', action: '1. Create Named Location: Countries/regions → select Australia → mark as trusted. 2. Create CA policy: Location NOT Australia → Block access.', examNote: 'Named Locations can be defined by IP range OR countries/regions. IP-based = trusted network. Country-based = geographic restriction.' },
      { trigger: 'Require MFA for Global Admins accessing Azure portal specifically', correct: true, verdict: '✓ Targeted CA policy', portal: 'entra.microsoft.com → Protection → Conditional Access → New policy', action: 'Assign: Directory roles = Global Administrator. Cloud apps = Microsoft Azure Management. Grant: Require MFA.', examNote: 'Target CA policies to specific apps and roles for surgical control. Always exclude a break-glass account from all CA policies.' },
      { trigger: 'Test a new CA policy without accidentally locking users out', correct: true, verdict: '✓ Use Report-only mode first', portal: 'entra.microsoft.com → Conditional Access → [policy] → Enable policy: Report-only', action: 'Report-only mode logs what WOULD have happened without actually enforcing. Check sign-in logs to see who would be blocked before switching to Enabled.', examNote: 'ALWAYS test with Report-only mode. Use the "What If" tool to simulate a specific user scenario before going live.' },
    ]
  },
  {
    id: 'restore-deleted', domain: 'identity', icon: '🔄',
    situation: 'A user account was accidentally deleted by an admin. Users report they can\'t find the person\'s emails or files.',
    branches: [
      { trigger: 'Deleted less than 30 days ago — restore the account', correct: true, verdict: '✓ Restore from Deleted users', portal: 'admin.microsoft.com → Users → Deleted users', action: 'Find the account → Restore user. All licences, group memberships, and data are restored.', examNote: '30-day soft delete window. After 30 days = permanently deleted and unrecoverable without backup.' },
      { trigger: 'Deleted more than 30 days ago — account is permanently gone', correct: true, verdict: '✓ Check if mailbox was placed on hold', portal: 'admin.exchange.microsoft.com + purview.microsoft.com', action: 'If the mailbox was on Litigation Hold BEFORE deletion, the mailbox is preserved as an inactive mailbox in Exchange. Email data can still be retrieved via eDiscovery.', examNote: 'Litigation Hold preserves mailbox data even after account deletion. Without hold, data is gone after the 30-day window.' },
    ]
  },

  // ══════════════════════════════════════════════
  // EMAIL & SECURITY
  // ══════════════════════════════════════════════
  {
    id: 'email-not-arriving', domain: 'security', icon: '📭',
    situation: 'A user is not receiving external emails. Internal email works fine. Investigate.',
    branches: [
      { trigger: 'Is email going to their Junk folder or sitting in quarantine?', correct: true, verdict: '✓ Check quarantine first', portal: 'security.microsoft.com → Email & Collaboration → Review → Quarantine', action: 'Search by recipient. If found: Release to inbox + optionally report as not junk + add sender to safe senders list', examNote: 'EOP quarantines high-confidence phish, malware, and spam. Quarantine is the first place to look for missing external email.' },
      { trigger: 'Email isn\'t in quarantine — trace where it stopped', correct: true, verdict: '✓ Run Message Trace', portal: 'admin.exchange.microsoft.com → Mail flow → Message trace', action: 'Enter sender + recipient + date range. The trace shows every hop: received → EOP → delivered OR the exact point it was dropped/rejected + reason.', examNote: 'Message Trace is the definitive diagnostic tool for email delivery issues. It shows exactly where in the pipeline email stopped.' },
      { trigger: 'Message trace shows email never reached EOP at all', correct: true, verdict: '✓ Check MX record', portal: 'admin.microsoft.com → Settings → Domains → [domain]', action: 'Verify MX record points to [yourdomain].mail.protection.outlook.com with priority 0. If it points elsewhere, email is going to a different mail server.', examNote: 'If MX record is wrong, email is being delivered to a completely different server — EOP never sees it. This is a DNS problem, not an EOP problem.' },
      { trigger: 'A specific sender\'s email is consistently rejected by EOP', correct: true, verdict: '✓ Check Tenant Allow/Block List', portal: 'security.microsoft.com → Policies & Rules → Threat Policies → Tenant Allow/Block Lists', action: 'Check if the sender\'s email address, domain, or IP is on the block list. If a mail flow rule is blocking it, check Exchange Admin → Mail flow → Rules.', examNote: 'A sender on the block list will always be rejected. A mail flow rule with "Delete the message" action leaves no trace in the user\'s inbox.' },
    ]
  },
  {
    id: 'phishing-investigation', domain: 'security', icon: '🎣',
    situation: 'A user reports receiving a phishing email that appears to have come from a legitimate colleague. Need to investigate and contain.',
    branches: [
      { trigger: 'Find the email and see if others got it too', correct: true, verdict: '✓ Threat Explorer', portal: 'security.microsoft.com → Email & Collaboration → Explorer', action: 'Filter by: sender, subject line, or URL in the email. See all recipients. Select all matching → Soft delete (removes from inboxes without notifying users)', examNote: 'Threat Explorer (Plan 2) = 30-day history. Real-time Detections (Plan 1) = 7 days. Both let you take bulk action on matching emails.' },
      { trigger: 'Did ZAP already act on this? How can I tell?', correct: true, verdict: '✓ Check delivery actions in Threat Explorer', portal: 'security.microsoft.com → Explorer → [email entry]', action: 'Look at: Original delivery location vs Latest delivery location. If different, ZAP moved it. Delivery action shows: Delivered, Junked, Blocked, or Replaced.', examNote: 'ZAP acts silently post-delivery. If original=Inbox and latest=Junk/Quarantine, ZAP already acted — no further action needed on that email.' },
      { trigger: 'Block the sender domain so no more emails from them can arrive', correct: true, verdict: '✓ Tenant Allow/Block List', portal: 'security.microsoft.com → Policies & Rules → Threat Policies → Tenant Allow/Block Lists', action: 'Add the sender\'s domain to block list → select expiry → submit. All emails from that domain will be quarantined or rejected.', examNote: 'Block entries expire unless set to "Never expire". For phishing domains, set Never expire.' },
      { trigger: 'Train users to recognise this type of attack in future', correct: true, verdict: '✓ Attack Simulator', portal: 'security.microsoft.com → Email & Collaboration → Attack Simulation Training', action: 'Launch a simulated phishing campaign using the same payload type. Assign targeted training to users who clicked.', examNote: 'Attack Simulator requires Defender for Office 365 Plan 2. It\'s built into the Defender portal — not a separate product.' },
      { trigger: 'The email passed SPF/DKIM but is still phishing — how?', correct: true, verdict: '✓ Display name spoofing — DMARC gap', portal: 'security.microsoft.com → Threat Explorer → email headers', action: 'Check if the visible From: name ≠ actual From: email address. Display name impersonation doesn\'t fail SPF/DKIM — it\'s a social engineering trick. Enable impersonation protection in anti-phishing policies.', examNote: 'SPF validates the sending IP. DKIM validates message integrity. Neither validates that the display name matches who it claims to be. DMARC + anti-phishing impersonation policies address this.' },
    ]
  },
  {
    id: 'domain-spoofing', domain: 'security', icon: '🎭',
    situation: 'Contoso\'s domain (contoso.com) is being spoofed. External senders are impersonating Contoso employees in emails to partners. Set up email authentication.',
    branches: [
      { trigger: 'Step 1: Prove which servers are authorised to send email as contoso.com', correct: true, verdict: '✓ Configure SPF', portal: 'Your DNS registrar → add TXT record', action: 'TXT record at contoso.com: v=spf1 include:spf.protection.outlook.com -all\nThe -all means "reject everything not listed"', examNote: 'SPF protects the 5321.MailFrom (envelope from). Maximum 10 DNS lookups in an SPF record. One SPF record per domain only — cannot have multiple.' },
      { trigger: 'Step 2: Add a cryptographic signature so receivers can verify Contoso sent it', correct: true, verdict: '✓ Enable DKIM', portal: 'security.microsoft.com → Email & Collaboration → Policies & Rules → Threat Policies → DKIM', action: 'Enable DKIM for contoso.com. Create two CNAME records at your DNS registrar: selector1._domainkey.contoso.com and selector2._domainkey.contoso.com', examNote: 'DKIM requires EXACTLY 2 CNAME records. Microsoft rotates between selector1 and selector2 automatically. DKIM validates message wasn\'t tampered with in transit.' },
      { trigger: 'Step 3: Tell receivers what to do if SPF or DKIM fails', correct: true, verdict: '✓ Configure DMARC', portal: 'Your DNS registrar → add TXT record at _dmarc.contoso.com', action: 'Start with: v=DMARC1; p=none; rua=mailto:dmarc@contoso.com\nMonitor reports → when ready escalate to p=quarantine → then p=reject', examNote: 'DMARC policy progression: none (monitor) → quarantine → reject. NEVER go straight to reject without monitoring phase — you risk blocking legitimate email.' },
      { trigger: 'DMARC is set to "none" — is that protecting the domain?', correct: false, verdict: '❌ Not yet', portal: '—', action: 'p=none = monitor only. Attackers can still spoof successfully. Only p=quarantine or p=reject provides actual protection.', examNote: 'p=none is a starting point for monitoring, not a protection measure. Exam will ask about which policy actually prevents spoofing.' },
    ]
  },
  {
    id: 'legit-email-blocked', domain: 'security', icon: '📬',
    situation: 'A vendor\'s emails are consistently being quarantined as spam even though they\'re legitimate business emails.',
    branches: [
      { trigger: 'Add this specific vendor to allow list permanently', correct: true, verdict: '✓ Tenant Allow/Block List — sender allow entry', portal: 'security.microsoft.com → Policies & Rules → Threat Policies → Tenant Allow/Block Lists → Senders tab', action: 'Add the vendor\'s email address or domain to allow. Their emails will bypass spam filtering.', examNote: 'Safe sender lists in anti-spam policies vs Tenant Allow/Block List: TABL is the more modern approach and works across more filtering layers.' },
      { trigger: 'The email is being flagged because of a URL inside it', correct: true, verdict: '✓ Add the URL to allow in TABL', portal: 'security.microsoft.com → Threat Policies → Tenant Allow/Block Lists → URLs tab', action: 'Add the specific URL to the allow list. Safe Links will still rewrite it but not block it.', examNote: 'Safe Links rewrites ALL URLs regardless of allow/block list — but TABL URL allow entries prevent the "blocked" verdict.' },
      { trigger: 'Check why EOP thinks it\'s spam — what\'s the SCL score?', correct: true, verdict: '✓ Inspect email headers', portal: 'Email client → View message source OR Defender Explorer → email details', action: 'Look for X-MS-Exchange-Organization-SCL header. SCL 5-6 = junk, SCL 7+ = spam. X-Forefront-Antispam-Report shows which filters triggered.', examNote: 'Understanding SCL values in email headers is an exam skill. SCL -1 = whitelisted/bypassed. SCL 0-4 = not spam. 5-6 = junk. 7-9 = spam action.' },
    ]
  },
  {
    id: 'eop-defender-which', domain: 'security', icon: '🛡️',
    situation: 'Contoso needs to choose the right level of email protection. Map the right tool to the right scenario.',
    branches: [
      { trigger: 'Basic spam and malware protection — what\'s already included?', correct: true, verdict: '✓ EOP — already running', portal: 'security.microsoft.com → Email & Collaboration policies', action: 'EOP is included in all Exchange Online plans. Anti-spam, anti-malware, basic anti-phishing (spoof intelligence), ZAP — all enabled by default.', examNote: 'You cannot "add" EOP — it\'s always there. You can tune policies but it\'s on by default.' },
      { trigger: 'Need URL scanning that checks links AFTER email is delivered (time-of-click)', correct: true, verdict: '✓ Defender for Office 365 Plan 1 — Safe Links', portal: 'security.microsoft.com → Threat Policies → Safe Links', action: 'Enable Safe Links policy. URLs are rewritten and re-checked at click time, even if the site was safe when delivered.', examNote: 'Safe Links is Plan 1. Time-of-click protection catches URLs weaponised AFTER delivery — EOP can\'t do this.' },
      { trigger: 'Need to detonate suspicious attachments in a sandbox before delivering', correct: true, verdict: '✓ Defender for Office 365 Plan 1 — Safe Attachments', portal: 'security.microsoft.com → Threat Policies → Safe Attachments', action: 'Enable Safe Attachments. Choose action: Block, Monitor, or Dynamic Delivery (recommended — sends email immediately, replaces attachment during scan)', examNote: 'Dynamic Delivery is the best user experience: email arrives instantly, attachment is a placeholder, replaced when scan completes. No waiting.' },
      { trigger: 'Need to investigate email threats across the last 30 days and hunt for compromised accounts', correct: true, verdict: '✓ Defender for Office 365 Plan 2 — Threat Explorer', portal: 'security.microsoft.com → Email & Collaboration → Explorer', action: 'Full 30-day searchable email metadata. Can take bulk actions: soft delete, move to junk, move to inbox.', examNote: 'Plan 1 = Real-time Detections (7 days, read-only). Plan 2 = Threat Explorer (30 days, take actions). Key exam distinction.' },
      { trigger: 'Need automated incident investigation that runs without human intervention', correct: true, verdict: '✓ Defender for Office 365 Plan 2 — AIR', portal: 'security.microsoft.com → Incidents & Alerts → Action Center', action: 'AIR (Automated Investigation & Response) triggers from alerts, auto-investigates scope, produces remediation actions for analyst approval.', examNote: 'AIR is triggered by an alert → creates an incident → automated investigation runs → produces verdict and remediation actions. Requires Plan 2.' },
    ]
  },
  {
    id: 'active-incident', domain: 'security', icon: '🚨',
    situation: 'The security team receives alerts about suspicious activity across multiple users and devices simultaneously. How do you investigate?',
    branches: [
      { trigger: 'Where do correlated alerts become a single incident to investigate?', correct: true, verdict: '✓ Defender XDR → Incidents', portal: 'security.microsoft.com → Incidents & Alerts → Incidents', action: 'All related alerts from Defender products are correlated into one incident. Shows attack chain, affected users, devices, mailboxes, and IPs.', examNote: 'Alert → Incident → Investigation. Alerts from multiple products are automatically correlated into one incident. This is the key value of XDR over separate products.' },
      { trigger: 'Need to hunt for threat indicators that didn\'t trigger an alert (proactive hunting)', correct: true, verdict: '✓ Advanced Hunting (KQL)', portal: 'security.microsoft.com → Hunting → Advanced Hunting', action: 'Write KQL queries across EmailEvents, DeviceEvents, IdentityLogonEvents, CloudAppEvents tables. Up to 30 days of raw data.', examNote: 'Advanced Hunting = 30 days of raw data. Proactive hunting = you search, no alert triggered yet. Reactive = investigating an existing alert.' },
      { trigger: 'Need to understand the current threat landscape and what\'s actively targeting your industry', correct: true, verdict: '✓ Threat Analytics', portal: 'security.microsoft.com → Threat Analytics', action: 'Microsoft\'s threat intelligence reports on active threat actors, campaigns, and attack techniques. Shows your exposure and mitigation status.', examNote: 'Threat Analytics ≠ your own data. It\'s Microsoft\'s research on external threats overlaid with your environment\'s exposure.' },
    ]
  },
  {
    id: 'secure-score', domain: 'security', icon: '📈',
    situation: 'After setting up a new M365 tenant, what\'s the first security thing an admin should check?',
    branches: [
      { trigger: 'What does Microsoft recommend as the first security step after M365 setup?', correct: true, verdict: '✓ Check Microsoft Secure Score', portal: 'security.microsoft.com → Secure Score', action: 'Note the baseline score. Review improvement actions sorted by points/impact. Implement recommended actions (enable MFA, configure CA policies, etc.)', examNote: 'Exam explicitly tests this: "What\'s the first thing after setup?" = Check Secure Score. Not check Service Health, not configure DLP.' },
    ]
  },

  // ══════════════════════════════════════════════
  // DEVICES & ENDPOINT
  // ══════════════════════════════════════════════
  {
    id: 'intune-compliance', domain: 'device', icon: '💻',
    situation: 'A user on a Windows laptop can\'t access company email or Teams. Sign-in log shows: "Device is not compliant."',
    branches: [
      { trigger: 'Find out what compliance requirement the device is failing', correct: true, verdict: '✓ Intune → Device compliance', portal: 'intune.microsoft.com → Devices → All devices → [device] → Device compliance', action: 'See exactly which compliance policies apply and which requirements are failing: OS version too old? No BitLocker? No PIN?', examNote: 'Compliance policy failure is evaluated per-policy per-device. The compliance state feeds directly into Conditional Access decisions.' },
      { trigger: 'Device is enrolled but showing non-compliant — force a compliance re-evaluation', correct: true, verdict: '✓ Sync device + re-evaluate', portal: 'intune.microsoft.com → Devices → [device] → Sync', action: 'Trigger a manual sync from Intune portal. Or user: Company Portal app → Sync. After sync, compliance state updates and CA re-evaluates access.', examNote: 'Compliance is not instant. After fixing the issue on the device (e.g. enabling BitLocker), a sync is needed before Intune marks it compliant.' },
      { trigger: 'Device isn\'t enrolled in Intune at all', correct: true, verdict: '✓ Enrol the device', portal: 'User action: Company Portal app or Settings → Access Work or School', action: 'Windows: Settings → Accounts → Access Work or School → Connect → follow enrollment. iOS/Android: Install Company Portal app → Sign in with corporate credentials.', examNote: 'MDM enrollment via Intune Company Portal. Autopilot = zero-touch enrollment for new Windows devices pre-configured by IT.' },
      { trigger: 'Lost or stolen corporate device — needs to be wiped remotely', correct: true, verdict: '✓ Wipe or Retire in Intune', portal: 'intune.microsoft.com → Devices → [device] → Wipe / Retire', action: 'Wipe = full factory reset (corporate-owned). Retire = removes company data and apps only, leaves personal data (BYOD).', examNote: 'Wipe vs Retire distinction is exam-tested. BYOD = always Retire. Corporate device = Wipe. Retire is less destructive.' },
    ]
  },
  {
    id: 'push-software', domain: 'device', icon: '📦',
    situation: 'IT needs to push a required application to all 500 company laptops without touching each one individually.',
    branches: [
      { trigger: 'Deploy software to all enrolled Windows devices at scale', correct: true, verdict: '✓ Intune → Apps → Deploy to group', portal: 'intune.microsoft.com → Apps → Windows → Add → assign to All Devices group', action: 'Add the app (MSI, MSIX, or Win32), assign as Required to All Devices or a device group. App installs automatically on next check-in.', examNote: 'Required assignment = automatically installed. Available = user can choose to install from Company Portal. Key distinction.' },
      { trigger: 'New Windows devices should arrive pre-configured without IT touching them', correct: true, verdict: '✓ Windows Autopilot', portal: 'intune.microsoft.com → Devices → Windows → Enrollment → Deployment profiles', action: 'Register device hardware IDs in Autopilot. Configure Autopilot profile (skip setup screens, auto-enrol in Intune, apply config). Device ships to user → user powers on → Autopilot runs automatically.', examNote: 'Autopilot = zero-touch provisioning. Device goes from factory to fully configured without IT ever touching it physically.' },
    ]
  },
  {
    id: 'endpoint-threat', domain: 'device', icon: '🦠',
    situation: 'Defender for Endpoint detects malware on a user\'s device. The device is still active on the network.',
    branches: [
      { trigger: 'Isolate the device immediately to stop lateral spread', correct: true, verdict: '✓ Isolate device in Defender XDR', portal: 'security.microsoft.com → Endpoints → Devices → [device] → Isolate device', action: 'Device isolation cuts off all network connections except the Defender management channel. The device can still be investigated and managed remotely.', examNote: 'Isolation doesn\'t disconnect the device from Defender — you can still collect investigation package, run antivirus scans, and apply remediation remotely.' },
      { trigger: 'Run a full antivirus scan on the device remotely', correct: true, verdict: '✓ Remote antivirus scan', portal: 'security.microsoft.com → Endpoints → Devices → [device] → Run antivirus scan', action: 'Triggers a full Microsoft Defender Antivirus scan remotely. Results appear in the device timeline.', examNote: 'All Defender for Endpoint remote actions: Isolate, Run AV scan, Collect investigation package, Restrict app execution, Live response.' },
    ]
  },

  // ══════════════════════════════════════════════
  // COMPLIANCE & PURVIEW
  // ══════════════════════════════════════════════
  {
    id: 'data-retention', domain: 'compliance', icon: '📅',
    situation: 'Legal requires that all employee emails be retained for 7 years, then automatically deleted. Finance documents must never be deleted.',
    branches: [
      { trigger: 'Retain all Exchange email for 7 years then auto-delete', correct: true, verdict: '✓ Retention policy in Purview', portal: 'purview.microsoft.com → Data lifecycle management → Retention policies', action: 'Create retention policy: Location = Exchange email, Action = Retain for 7 years then delete. Assign to all users or specific mailboxes.', examNote: 'Retention policies are org-wide or scoped. Retain-then-delete is the most common configuration. Policies take precedence over user deletion.' },
      { trigger: 'Finance documents must be preserved forever and cannot be deleted by anyone', correct: true, verdict: '✓ Retention label: Regulatory record', portal: 'purview.microsoft.com → Data lifecycle management → Retention labels', action: 'Create retention label → Mark items as regulatory records. Publish label to SharePoint/OneDrive finance sites. Users apply label to documents.', examNote: 'Regulatory record = immutable. Cannot be modified or deleted for the retention period. Even admins cannot delete it. Standard record is less restrictive.' },
      { trigger: 'What takes priority if a retention policy says delete but a label says retain?', correct: true, verdict: '✓ Retention wins over deletion', portal: '—', action: 'Purview retention principles: Retain beats delete. Longer beats shorter. Explicit label beats implicit policy.', examNote: 'Retention principle hierarchy: 1) Retain > Delete. 2) Longer retention > shorter. 3) Explicit (label) > Implicit (policy). Exam tests these rules.' },
    ]
  },
  {
    id: 'sensitivity-labels', domain: 'compliance', icon: '🏷️',
    situation: 'Contoso wants to classify documents as Confidential and automatically apply encryption so only internal staff can open them, even outside M365.',
    branches: [
      { trigger: 'Create the classification and protection settings', correct: true, verdict: '✓ Create sensitivity label in Purview', portal: 'purview.microsoft.com → Information protection → Labels → Create a label', action: 'Define label: name "Confidential", encryption settings (encrypt, specify who can read/edit), content markings (watermark, header). Publish to all users.', examNote: 'Sensitivity labels = tag that travels with the file. Encryption follows the file wherever it goes — even if emailed externally or opened on a personal device.' },
      { trigger: 'Automatically apply the label when certain sensitive keywords are detected in documents', correct: true, verdict: '✓ Auto-labeling policy', portal: 'purview.microsoft.com → Information protection → Auto-labeling policies', action: 'Create auto-labeling policy: apply "Confidential" label when document contains specific sensitive info types or keywords. Set to run on SharePoint/OneDrive.', examNote: 'Auto-labeling (server-side, for SharePoint/OneDrive) requires E5 or Compliance add-on. Client-side auto-labeling (in Office apps) requires P2.' },
      { trigger: 'Which sensitivity label should apply to the container (SharePoint site) rather than individual files?', correct: true, verdict: '✓ Container label', portal: 'purview.microsoft.com → Information protection → Labels → [label] → Scope: Groups & Sites', action: 'Enable the label for Groups & Sites scope. Apply to SharePoint site → controls external sharing, device access, and Teams settings for the whole site.', examNote: 'Container labels control the site settings, not individual file content. File labels protect individual documents. Both can coexist.' },
    ]
  },
  {
    id: 'dlp-policy', domain: 'compliance', icon: '🚫',
    situation: 'An employee accidentally emailed a spreadsheet containing 500 customer credit card numbers to an external address. Prevent this from happening again.',
    branches: [
      { trigger: 'Find out what was shared, when, and to whom', correct: true, verdict: '✓ Activity Explorer in Purview', portal: 'purview.microsoft.com → Data classification → Activity explorer', action: 'Filter by activity: "Shared externally" or "Email sent". Shows who shared what classified content, to where, and when.', examNote: 'Activity Explorer tracks actions ON labelled or classified content. Content Explorer shows WHERE classified content exists.' },
      { trigger: 'Create a rule to prevent credit card numbers being emailed externally in future', correct: true, verdict: '✓ DLP Policy targeting Exchange', portal: 'purview.microsoft.com → Data loss prevention → Policies → Create policy', action: '1. Choose template: Financial → Credit Card Number. 2. Location: Exchange email. 3. Action when 1+ card numbers detected going externally: Block with override or Block outright. 4. User notification: show policy tip.', examNote: 'DLP uses Sensitive Information Types (SITs) to detect content. Credit card number is a built-in SIT — no custom training needed.' },
      { trigger: 'Also block copying credit card data to USB drives on Windows devices', correct: true, verdict: '✓ Endpoint DLP', portal: 'purview.microsoft.com → DLP Policy → Locations → Devices', action: 'Add Devices as a location in the DLP policy. Requires Windows 10+ with Defender for Endpoint onboarded.', examNote: 'Endpoint DLP extends DLP to device-level activities: copy to USB, print, upload to browser, copy to clipboard. Not available without Defender for Endpoint onboarding.' },
    ]
  },
  {
    id: 'ediscovery-legal', domain: 'compliance', icon: '⚖️',
    situation: 'Contoso receives a legal subpoena requiring all communications to/from a specific employee over the past 2 years. The employee must not know about this yet.',
    branches: [
      { trigger: 'FIRST: Preserve everything so the user can\'t delete evidence', correct: true, verdict: '✓ Legal Hold — do this FIRST', portal: 'purview.microsoft.com → eDiscovery → Cases → New case → Add custodian → Hold', action: 'Place the user\'s mailbox AND OneDrive on Litigation Hold (or eDiscovery hold). Content is preserved even if the user deletes messages.', examNote: 'Always place hold BEFORE searching. If you search first without a hold, the user could delete evidence during the investigation.' },
      { trigger: 'Search for all relevant content (email, Teams, files) for that employee', correct: true, verdict: '✓ Content Search or eDiscovery Case', portal: 'purview.microsoft.com → eDiscovery → [case] → Searches → New search', action: 'Define custodian (the employee), locations (Exchange, Teams, OneDrive, SharePoint), date range, keywords. Run search → review results.', examNote: 'Content Search is standalone. eDiscovery Premium (E5) adds: custodian management, review sets, advanced analytics, legal hold notification workflow.' },
      { trigger: 'Which role is needed to run eDiscovery searches?', correct: true, verdict: '✓ eDiscovery Manager role', portal: 'purview.microsoft.com → Roles → eDiscovery Manager', action: 'Assign eDiscovery Manager role (can manage their own cases) or eDiscovery Administrator (can see all cases). Global Admin alone is not enough.', examNote: 'Global Admin ≠ automatic eDiscovery access. Must be explicitly assigned eDiscovery Manager or Administrator role.' },
      { trigger: 'Export all results for legal counsel to review', correct: true, verdict: '✓ Export from eDiscovery Review Set', portal: 'purview.microsoft.com → eDiscovery → [case] → Review sets → Export', action: 'Export as PST (email) and native files. Download with eDiscovery Export Tool. Results include a summary report.', examNote: 'Exports must be downloaded — they\'re not emailed. Requires eDiscovery Export Tool (Windows only). Large exports can take hours.' },
    ]
  },
  {
    id: 'compliance-manager', domain: 'compliance', icon: '📊',
    situation: 'A new compliance officer asks: "How do we know if we\'re meeting GDPR requirements? Where do we start?"',
    branches: [
      { trigger: 'Get an overall picture of compliance posture and see what to fix first', correct: true, verdict: '✓ Compliance Manager', portal: 'purview.microsoft.com → Compliance Manager', action: 'Check Compliance Score. Review the GDPR assessment. Work through improvement actions sorted by impact on score.', examNote: 'When an org first opens Compliance Manager, the initial score is based on Microsoft 365 data protection baseline — not GDPR or any specific regulation.' },
      { trigger: 'What does the Compliance Score actually measure?', correct: false, verdict: '⚠️ Common misconception', portal: '—', action: 'Compliance Score measures progress on improvement actions — it does NOT certify compliance with any regulation.', examNote: 'Exam trap: "A score of 100% in Compliance Manager means we\'re GDPR compliant" = FALSE. It means you\'ve completed all the recommended improvement actions Microsoft tracks.' },
      { trigger: 'First-time setup: what\'s the initial Compliance Score based on?', correct: true, verdict: '✓ Microsoft 365 data protection baseline', portal: 'purview.microsoft.com → Compliance Manager', action: 'Initial score = based on Microsoft 365 data protection baseline (a set of common industry regulations and standards). Then add specific assessments (GDPR, ISO 27001, etc.)', examNote: 'Exam question exact wording: "When an organization first uses Compliance Manager, the initial score is based on the Microsoft 365 data protection baseline." This is a direct exam question.' },
    ]
  },
  {
    id: 'data-classification', domain: 'compliance', icon: '🔍',
    situation: 'Contoso wants to understand what sensitive data exists across their M365 environment before creating any policies.',
    branches: [
      { trigger: 'See WHERE sensitive data exists across SharePoint, Exchange, Teams', correct: true, verdict: '✓ Content Explorer', portal: 'purview.microsoft.com → Data classification → Content Explorer', action: 'View all content that matches sensitive info types or has sensitivity/retention labels applied. Browse by location, label, or SIT.', examNote: 'Content Explorer = read-only view of WHERE classified content exists. Requires Content Explorer Content Viewer role (or List Viewer for file names only). Not available to all admins.' },
      { trigger: 'See WHAT ACTIONS users are taking on sensitive content', correct: true, verdict: '✓ Activity Explorer', portal: 'purview.microsoft.com → Data classification → Activity Explorer', action: 'Shows events: label applied, label changed, file shared, email sent with sensitive content. Filter by user, activity, date, label.', examNote: 'Content Explorer = WHERE data is. Activity Explorer = WHAT is happening to it. Both are in Data classification.' },
      { trigger: 'Detect sensitive content using pattern matching (SSN, credit card, passport number)', correct: true, verdict: '✓ Sensitive Information Types (SITs)', portal: 'purview.microsoft.com → Data classification → Sensitive info types', action: '300+ built-in SITs. Or create custom SIT with keyword/regex/document fingerprint. Used in DLP policies and auto-labeling.', examNote: 'Built-in SITs use pattern + keyword + checksum validation (e.g. credit card numbers are validated by Luhn algorithm). No training needed — rule-based.' },
      { trigger: 'Detect content by category/type without knowing exact patterns (e.g. "legal contracts")', correct: true, verdict: '✓ Trainable Classifiers', portal: 'purview.microsoft.com → Data classification → Trainable classifiers', action: 'Use built-in classifiers OR train a custom one: provide 50–500 seed content examples, test with positive and negative samples, publish when precision is acceptable.', examNote: 'Minimum 50 positive samples to create a custom trainable classifier. SITs = pattern-based. Classifiers = ML-based. Very different technologies.' },
    ]
  },

];

function renderPlaybook() {
  const platformsHTML = PLATFORMS.map(p => {
    const whenItems = p.when.map(w => `<li>${w}</li>`).join('');
    return `
<div class="platform-card ${p.category}">
  <div class="platform-card-header">
    <div class="platform-icon-wrap">${p.icon}</div>
    <div>
      <div class="platform-name">${p.name}</div>
      <div class="platform-portal">${p.portal}</div>
    </div>
  </div>
  <div class="platform-metaphor">
    <span class="metaphor-icon">${p.metaphorIcon}</span>
    <div>
      <span class="metaphor-label">Think of it as</span>
      <span class="metaphor-text">${p.metaphor}</span>
    </div>
  </div>
  <div class="platform-desc">${p.desc}</div>
  <div class="platform-when">
    <h5>You go here when...</h5>
    <ul>${whenItems}</ul>
  </div>
</div>`;
  }).join('');

  const domainFilters = [
    { id: 'all',        label: '🔎 All Scenarios',   count: EXAM_SCENARIOS.length },
    { id: 'tenant',     label: '🏢 Tenant & Admin',   count: EXAM_SCENARIOS.filter(s => s.domain === 'tenant').length },
    { id: 'identity',   label: '🔐 Identity',         count: EXAM_SCENARIOS.filter(s => s.domain === 'identity').length },
    { id: 'security',   label: '🛡️ Email & Security', count: EXAM_SCENARIOS.filter(s => s.domain === 'security').length },
    { id: 'device',     label: '💻 Devices',          count: EXAM_SCENARIOS.filter(s => s.domain === 'device').length },
    { id: 'compliance', label: '⚖️ Compliance',       count: EXAM_SCENARIOS.filter(s => s.domain === 'compliance').length },
  ];

  const filterTabsHTML = domainFilters.map((f, i) =>
    `<button class="exam-filter-tab ${i === 0 ? 'active' : ''}" onclick="filterExamScenarios('${f.id}')" data-domain="${f.id}">${f.label} <span style="opacity:0.5;font-size:0.68em">${f.count}</span></button>`
  ).join('');

  const scenariosHTML = EXAM_SCENARIOS.map(s => {
    const trapHTML = s.examTrap
      ? `<div class="exam-trap">${s.examTrap}</div>`
      : '';

    const branchesHTML = s.branches.map(b => {
      const v = b.verdict || '';
      const cls = v.startsWith('✓') ? 'correct' : v.startsWith('⚠') ? 'warn' : 'incorrect';
      return `
<div class="exam-branch ${cls}">
  <div class="exam-branch-trigger">▸ ${b.trigger}</div>
  <div class="exam-branch-verdict">${v}</div>
  <div class="exam-branch-portal"><strong>Portal:</strong> ${b.portal}</div>
  <div class="exam-branch-action"><strong>Action:</strong> ${b.action}</div>
  <div class="exam-branch-note">${b.examNote}</div>
</div>`;
    }).join('');

    const title = s.id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return `
<div class="exam-scenario-card" data-domain="${s.domain}">
  <div class="exam-scenario-header">
    <span class="exam-scenario-icon">${s.icon}</span>
    <div class="exam-scenario-meta">
      <div class="exam-scenario-title">${title}</div>
      <div class="exam-scenario-situation">${s.situation}</div>
    </div>
    <span class="exam-domain-badge ${s.domain}">${s.domain}</span>
  </div>
  ${trapHTML}
  <div class="exam-branches">${branchesHTML}</div>
</div>`;
  }).join('');

  document.getElementById('playbook-content').innerHTML = `
<div class="domain-room">
  <div class="section-header">
    <div class="section-header-left">
      <h2>🧠 Admin Mental Model</h2>
      <p>What each platform actually is, what it's for, and when an admin reaches for it</p>
    </div>
  </div>

  <div>
    <div class="visual-label">Every platform — plain English</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px">
      ${platformsHTML}
    </div>
  </div>

  <div class="exam-scenarios-section">
    <div class="visual-label">Exam scenario drills — ${EXAM_SCENARIOS.length} scenarios across all domains</div>
    <div class="exam-filter-tabs">${filterTabsHTML}</div>
    <div class="exam-scenarios-grid">${scenariosHTML}</div>
  </div>
</div>`;
}

function filterExamScenarios(domain) {
  document.querySelectorAll('.exam-filter-tab').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.exam-filter-tab[data-domain="${domain}"]`);
  if (activeTab) activeTab.classList.add('active');
  document.querySelectorAll('.exam-scenario-card').forEach(card => {
    card.style.display = (domain === 'all' || card.dataset.domain === domain) ? '' : 'none';
  });
}

// ─── DOMAIN ROOM CONTENT ─────────────────────────────────────────────────────

function renderTenant() {
  return `
<div class="domain-room">
  <div class="section-header">
    <div class="section-header-left">
      <h2>Deploy &amp; Manage Microsoft 365 Tenant</h2>
      <p>Setting up the foundation — tenant, domains, admin roles, users, groups</p>
    </div>
    <div class="domain-weight">
      <span class="pct" style="color:var(--blue-bright)">25–30%</span>
      <span class="pct-label">of exam</span>
    </div>
  </div>

  <div>
    <div class="visual-label">How DNS domain setup works</div>
    <div class="flow-wrap">
      <div class="flow">
        <div class="flow-step">
          <span class="step-icon">🌐</span>
          <span class="step-name">Buy domain</span>
          <span class="step-desc">e.g. contoso.com at your registrar</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step highlight">
          <span class="step-icon">📝</span>
          <span class="step-name">Add to M365</span>
          <span class="step-desc">Admin center → Settings → Domains</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="step-icon">✅</span>
          <span class="step-name">Verify ownership</span>
          <span class="step-desc">Add TXT or MX record at registrar</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="step-icon">⚙️</span>
          <span class="step-name">Configure records</span>
          <span class="step-desc">MX, CNAME, TXT, SRV</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step success">
          <span class="step-icon">📮</span>
          <span class="step-name">Email flows</span>
          <span class="step-desc">user@contoso.com works</span>
        </div>
      </div>
      <div class="compare-table" style="margin-top:16px">
        <table>
          <thead><tr><th>DNS Record</th><th>Purpose in M365</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td>MX</td><td>Routes email to Exchange Online</td><td>contoso-com.mail.protection.outlook.com</td></tr>
            <tr><td>TXT</td><td>Domain ownership proof + SPF</td><td>MS=ms12345678 / v=spf1 include:spf.protection.outlook.com -all</td></tr>
            <tr><td>CNAME</td><td>Autodiscover, authentication, Teams, Intune</td><td>autodiscover, msoid, sip, lyncdiscover, mdm</td></tr>
            <tr><td>SRV</td><td>Teams/Skype federation</td><td>_sip._tls, _sipfederationtls._tcp</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">Admin roles — who can do what</div>
    <div class="role-grid">
      <div class="role-card"><span class="role-icon">👑</span><div><div class="role-name">Global Administrator</div><div class="role-desc">Full access to all admin centers and features</div><div class="role-scope">Scope: entire tenant</div></div></div>
      <div class="role-card"><span class="role-icon">👁️</span><div><div class="role-name">Global Reader</div><div class="role-desc">Read-only version of Global Admin — can view but not change</div><div class="role-scope">Scope: entire tenant</div></div></div>
      <div class="role-card"><span class="role-icon">📧</span><div><div class="role-name">Exchange Administrator</div><div class="role-desc">Manage Exchange Online mailboxes, mail flow, connectors</div><div class="role-scope">Scope: Exchange Online</div></div></div>
      <div class="role-card"><span class="role-icon">📁</span><div><div class="role-name">SharePoint Administrator</div><div class="role-desc">Manage SharePoint sites, external sharing, and OneDrive settings</div><div class="role-scope">Scope: SharePoint + OneDrive</div></div></div>
      <div class="role-card"><span class="role-icon">💬</span><div><div class="role-name">Teams Administrator</div><div class="role-desc">Manage Teams policies, meetings, calling, and features</div><div class="role-scope">Scope: Teams</div></div></div>
      <div class="role-card"><span class="role-icon">🛡️</span><div><div class="role-name">Security Administrator</div><div class="role-desc">Manage security policies, Defender settings, view security reports</div><div class="role-scope">Scope: Defender, Entra security</div></div></div>
      <div class="role-card"><span class="role-icon">⚖️</span><div><div class="role-name">Compliance Administrator</div><div class="role-desc">Manage Purview, DLP policies, eDiscovery, retention</div><div class="role-scope">Scope: Microsoft Purview</div></div></div>
      <div class="role-card"><span class="role-icon">👤</span><div><div class="role-name">User Administrator</div><div class="role-desc">Create/manage users, reset passwords for non-admin users, manage most groups</div><div class="role-scope">Scope: Users &amp; groups</div></div></div>
      <div class="role-card"><span class="role-icon">💳</span><div><div class="role-name">Billing Administrator</div><div class="role-desc">Purchase services, manage subscriptions and licences</div><div class="role-scope">Scope: Billing</div></div></div>
      <div class="role-card"><span class="role-icon">🔑</span><div><div class="role-name">Password Administrator</div><div class="role-desc">Reset passwords for non-admin users. Subset of User Admin.</div><div class="role-scope">Scope: Non-admin users</div></div></div>
      <div class="role-card"><span class="role-icon">🏗️</span><div><div class="role-name">Privileged Role Administrator</div><div class="role-desc">Manage role assignments and PIM settings</div><div class="role-scope">Scope: Entra ID roles</div></div></div>
      <div class="role-card"><span class="role-icon">🔒</span><div><div class="role-name">Security Reader</div><div class="role-desc">View-only access to security features — can't make changes</div><div class="role-scope">Scope: Security portals</div></div></div>
    </div>
  </div>

  <div>
    <div class="visual-label">Group types — know the differences</div>
    <div class="compare-table">
      <table>
        <thead><tr><th>Group Type</th><th>Has Mailbox?</th><th>Has SharePoint Site?</th><th>Teams-connected?</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>Microsoft 365 Group</td><td class="yes">Yes</td><td class="yes">Yes</td><td class="yes">Yes</td><td>Collaboration — the modern group</td></tr>
          <tr><td>Security Group</td><td class="no">No</td><td class="no">No</td><td class="no">No</td><td>Assign licences and permissions</td></tr>
          <tr><td>Mail-enabled Security</td><td class="partial">Email only</td><td class="no">No</td><td class="no">No</td><td>Security group that can receive email</td></tr>
          <tr><td>Distribution List</td><td class="partial">Email only</td><td class="no">No</td><td class="no">No</td><td>Email distribution only, legacy</td></tr>
          <tr><td>Dynamic Group</td><td class="partial">If M365 type</td><td class="partial">If M365 type</td><td class="partial">If M365 type</td><td>Auto-membership via Entra ID attribute rules</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div>
    <div class="visual-label">Concept cards</div>
    <div class="cards-grid">
      <div class="concept-card management">
        <h4>🏢 Tenant Fundamentals</h4>
        <ul>
          <li>One tenant per subscription (but org can have multiple subscriptions)</li>
          <li>Tenant URL: <strong>yourorg.onmicrosoft.com</strong> (permanent)</li>
          <li>Country/region = datacenter location = <strong>cannot change</strong></li>
          <li>Up to <strong>900</strong> custom domains per tenant</li>
        </ul>
      </div>
      <div class="concept-card management">
        <h4>📊 Service Health Monitoring</h4>
        <ul>
          <li><strong>Service Health Dashboard</strong>: real-time incident status</li>
          <li><strong>Message Center</strong>: planned changes &amp; upcoming releases</li>
          <li>Configure email notifications for incidents per admin</li>
          <li>Service Health API: programmatic access for ticketing integration</li>
        </ul>
      </div>
      <div class="concept-card management">
        <h4>👤 User Lifecycle</h4>
        <ul>
          <li>Create → Assign licence → User can sign in</li>
          <li>Delete → <strong>30-day soft delete</strong> → Permanent</li>
          <li>Restore from Admin center → Active users → Deleted users</li>
          <li>Bulk ops: CSV import or PowerShell (MgGraph)</li>
        </ul>
      </div>
      <div class="concept-card management">
        <h4>🔄 Licence Management</h4>
        <ul>
          <li>Assign via: Admin center, PowerShell, or Group-based licensing</li>
          <li>Group-based licensing: assign licences to a group — members auto-get it (requires P1)</li>
          <li>Over-assignment creates provisioning errors</li>
          <li>Purchasing extra licences <strong>changes billing date</strong></li>
        </ul>
      </div>
      <div class="concept-card management">
        <h4>🛠️ Administrative Units</h4>
        <ul>
          <li>Scope admin roles to a <strong>subset</strong> of users/groups/devices</li>
          <li>E.g. Helpdesk Admin for only the London OU</li>
          <li>Useful in large orgs to delegate without over-privileging</li>
          <li>Requires Entra ID P1</li>
        </ul>
      </div>
      <div class="concept-card management">
        <h4>💾 Microsoft 365 Backup</h4>
        <ul>
          <li>Backs up: <strong>Exchange, SharePoint, OneDrive</strong></li>
          <li>Point-in-time restore within configurable retention period</li>
          <li>Separate from native retention — this is actual backup</li>
          <li>Configure in Microsoft 365 admin center</li>
        </ul>
        <div class="card-note">Not a substitute for retention policies — different purpose</div>
      </div>
    </div>
  </div>
</div>`;
}

function renderIdentity() {
  return `
<div class="domain-room">
  <div class="section-header">
    <div class="section-header-left">
      <h2>Implement &amp; Manage Entra Identity &amp; Access</h2>
      <p>Identity types, sync methods, Conditional Access, PIM — the trust architecture</p>
    </div>
    <div class="domain-weight">
      <span class="pct" style="color:var(--identity)">25–30%</span>
      <span class="pct-label">of exam</span>
    </div>
  </div>

  <div>
    <div class="visual-label">The three identity models</div>
    <div class="flow-wrap">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px">
        <div class="concept-card identity" style="border-left-width:3px">
          <h4>☁️ Cloud-Only Identity</h4>
          <ul>
            <li>Account exists <strong>only in Entra ID</strong></li>
            <li>No on-prem AD required</li>
            <li>Passwords managed entirely in the cloud</li>
            <li>Best for: new orgs, small businesses, cloud-native</li>
          </ul>
        </div>
        <div class="concept-card identity" style="border-left-width:3px">
          <h4>🔄 Synchronized Identity</h4>
          <ul>
            <li>On-prem AD + Entra ID via <strong>Entra Connect</strong></li>
            <li>Objects synced from on-prem to cloud</li>
            <li>Auth method: PHS, PTA, or AD FS</li>
            <li>Best for: orgs with existing AD infrastructure</li>
          </ul>
        </div>
        <div class="concept-card identity" style="border-left-width:3px">
          <h4>🏛️ Federated Identity</h4>
          <ul>
            <li>Auth handled by <strong>on-prem IdP (AD FS)</strong></li>
            <li>Entra ID trusts and redirects to the IdP</li>
            <li>SAML 2.0 protocol</li>
            <li>Most complex — requires AD FS servers + WAP</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">Which sync method? Decision tree</div>
    <div class="decision-tree">
      <div style="display:flex;flex-direction:column;align-items:center;gap:0">
        <div class="dtree-node question">Do you have on-premises Active Directory?</div>
        <div style="display:flex;gap:80px;padding-top:16px;position:relative">
          <div style="display:flex;flex-direction:column;align-items:center;gap:0">
            <div class="dtree-branch-label">NO</div>
            <div class="dtree-line"></div>
            <div class="dtree-node cloud">Cloud-Only ✓<br><small style="font-weight:400;font-size:0.68rem">Create users directly in Entra</small></div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:0">
            <div class="dtree-branch-label">YES → Deploy Entra Connect, then choose:</div>
            <div class="dtree-line"></div>
            <div style="display:flex;gap:20px">
              <div style="display:flex;flex-direction:column;align-items:center;gap:0">
                <div class="dtree-branch-label">Simplest / Recommended</div>
                <div class="dtree-line"></div>
                <div class="dtree-node phs">PHS + Seamless SSO 🏆<br><small style="font-weight:400;font-size:0.68rem">Password hash synced to cloud<br>Works offline, best resilience</small></div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;gap:0">
                <div class="dtree-branch-label">No cloud passwords</div>
                <div class="dtree-line"></div>
                <div class="dtree-node pta">PTA + Seamless SSO<br><small style="font-weight:400;font-size:0.68rem">Validates against on-prem AD<br>Needs PTA agents running</small></div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;gap:0">
                <div class="dtree-branch-label">Full federation needed</div>
                <div class="dtree-line"></div>
                <div class="dtree-node adfs">AD FS Federation<br><small style="font-weight:400;font-size:0.68rem">SAML, smart cards, 3rd-party MFA<br>Highest maintenance, WS2016+</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">PHS vs PTA vs AD FS — comparison</div>
    <div class="compare-table">
      <table>
        <thead><tr><th>Feature</th><th>PHS</th><th>PTA</th><th>AD FS</th></tr></thead>
        <tbody>
          <tr><td>Passwords stored in cloud</td><td class="partial">Hash only</td><td class="no">No</td><td class="no">No</td></tr>
          <tr><td>Works if on-prem is down</td><td class="yes">Yes</td><td class="no">No</td><td class="no">No</td></tr>
          <tr><td>Seamless SSO support</td><td class="yes">Yes</td><td class="yes">Yes</td><td class="partial">Own SSO</td></tr>
          <tr><td>Identity Protection / Smart Lockout</td><td class="yes">Yes</td><td class="yes">Yes</td><td class="no">Limited</td></tr>
          <tr><td>Leaked credential detection</td><td class="yes">Yes</td><td class="no">No</td><td class="no">No</td></tr>
          <tr><td>Infrastructure needed</td><td class="yes">Minimal</td><td class="partial">PTA agent(s)</td><td class="no">AD FS servers + WAP</td></tr>
          <tr><td>Smart card / cert auth</td><td class="no">No</td><td class="no">No</td><td class="yes">Yes</td></tr>
          <tr><td>Microsoft recommendation</td><td class="yes">✓ Recommended</td><td class="partial">Secondary</td><td class="no">Legacy/special use</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div>
    <div class="visual-label">Conditional Access — how a policy evaluates</div>
    <div class="flow-wrap">
      <div class="flow">
        <div class="flow-step">
          <span class="step-icon">👤</span>
          <span class="step-name">Signal</span>
          <span class="step-desc">User, location, device, app, risk</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step highlight">
          <span class="step-icon">📋</span>
          <span class="step-name">CA Policy</span>
          <span class="step-desc">If [conditions] match...</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="step-icon">⚖️</span>
          <span class="step-name">Verify</span>
          <span class="step-desc">Require MFA? Compliant device? Block?</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step success">
          <span class="step-icon">✅</span>
          <span class="step-name">Grant Access</span>
          <span class="step-desc">Conditions met</span>
        </div>
        <span class="flow-arrow" style="color:var(--text-subtle)">or</span>
        <div class="flow-step danger">
          <span class="step-icon">🚫</span>
          <span class="step-name">Block Access</span>
          <span class="step-desc">Conditions not met</span>
        </div>
      </div>
      <div class="cards-grid" style="margin-top:16px">
        <div class="concept-card identity">
          <h4>📡 Signals (Conditions)</h4>
          <ul>
            <li><strong>User / Group</strong>: specific users or roles</li>
            <li><strong>Named Location</strong>: trusted IPs or countries</li>
            <li><strong>Device</strong>: compliant, domain-joined</li>
            <li><strong>Application</strong>: specific cloud app</li>
            <li><strong>Risk</strong>: sign-in risk or user risk (P2)</li>
          </ul>
        </div>
        <div class="concept-card identity">
          <h4>🔓 Grant Controls</h4>
          <ul>
            <li>Require <strong>MFA</strong></li>
            <li>Require compliant device (Intune)</li>
            <li>Require domain-joined device</li>
            <li>Require approved client app</li>
            <li>Require app protection policy (MAM)</li>
          </ul>
          <div class="card-note">Controls can be AND (all required) or OR (any one)</div>
        </div>
        <div class="concept-card identity">
          <h4>🧪 Testing Best Practice</h4>
          <ul>
            <li>Always use <strong>Report-only mode first</strong></li>
            <li>See who WOULD be blocked before enforcing</li>
            <li>Use What If tool to simulate a specific user/condition</li>
            <li>Exclude at least one break-glass account from all policies</li>
          </ul>
          <div class="card-note">Never lock out Global Admins — keep a break-glass account</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">Licence tiers — what you get</div>
    <div class="tier-cards">
      <div class="tier-card free">
        <div class="tier-name">Free / Security Defaults</div>
        <div class="tier-sub">Entra ID Free</div>
        <ul>
          <li>MFA for admins (security defaults)</li>
          <li>Basic user management</li>
          <li>No CA policies</li>
        </ul>
      </div>
      <div class="tier-card p1">
        <div class="tier-name">Entra ID P1</div>
        <div class="tier-sub">Included in M365 E3, Business Premium</div>
        <ul>
          <li><strong>Conditional Access</strong></li>
          <li><strong>SSPR</strong> (Self-Service Password Reset)</li>
          <li>Group-based licensing</li>
          <li>Administrative Units</li>
          <li>Hybrid identity (Seamless SSO)</li>
        </ul>
      </div>
      <div class="tier-card p2">
        <div class="tier-name">Entra ID P2</div>
        <div class="tier-sub">Included in M365 E5</div>
        <ul>
          <li>Everything in P1</li>
          <li><strong>PIM</strong> (Privileged Identity Management)</li>
          <li><strong>Identity Protection</strong> (risk-based CA)</li>
          <li>Access Reviews</li>
          <li>Entitlement Management</li>
        </ul>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">PIM — just-in-time access flow</div>
    <div class="flow-wrap">
      <div class="flow">
        <div class="flow-step">
          <span class="step-icon">👤</span>
          <span class="step-name">Eligible Admin</span>
          <span class="step-desc">Has eligible assignment, not yet active</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step highlight">
          <span class="step-icon">🙋</span>
          <span class="step-name">Requests activation</span>
          <span class="step-desc">Specifies duration, reason</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step warn">
          <span class="step-icon">🔔</span>
          <span class="step-name">Approval / MFA</span>
          <span class="step-desc">If configured — approver notified</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step success">
          <span class="step-icon">✅</span>
          <span class="step-name">Active for window</span>
          <span class="step-desc">E.g. 8 hours then auto-expires</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="step-icon">🔒</span>
          <span class="step-name">Auto-deactivated</span>
          <span class="step-desc">Back to eligible, access removed</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function renderSecurity() {
  return `
<div class="domain-room">
  <div class="section-header">
    <div class="section-header-left">
      <h2>Manage Security &amp; Threats — Microsoft Defender XDR</h2>
      <p>EOP, Defender for Office 365, SPF/DKIM/DMARC, ZAP, Advanced Hunting</p>
    </div>
    <div class="domain-weight">
      <span class="pct" style="color:var(--security)">30–35%</span>
      <span class="pct-label">of exam — highest weight</span>
    </div>
  </div>

  <div>
    <div class="visual-label">The email security stack — every inbound email's journey</div>
    <div class="flow-wrap">
      <div class="flow">
        <div class="flow-step">
          <span class="step-icon">📤</span>
          <span class="step-name">Internet</span>
          <span class="step-desc">Sender's mail server</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step highlight">
          <span class="step-icon">📧</span>
          <span class="step-name">EOP Layer 1</span>
          <span class="step-desc">Anti-spam, anti-malware, connection filtering, SCL scoring</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step highlight" style="border-color:var(--security)">
          <span class="step-icon">🎯</span>
          <span class="step-name">Def. Office 365 Layer 2</span>
          <span class="step-desc">Safe Links rewrite, Safe Attachments sandbox, advanced anti-phishing</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="step-icon">📮</span>
          <span class="step-name">Exchange Online</span>
          <span class="step-desc">Mailbox delivery</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step warn">
          <span class="step-icon">👁️</span>
          <span class="step-name">ZAP watches</span>
          <span class="step-desc">Retroactively moves threats found post-delivery</span>
        </div>
      </div>
      <p style="font-size:0.75rem;color:var(--text-muted);margin-top:12px">⚠️ Defender for Office 365 is Layer 2 — it adds ON TOP of EOP. EOP is always present. MDO P1/P2 are optional upgrades.</p>
    </div>
  </div>

  <div>
    <div class="visual-label">SPF, DKIM, DMARC — the email authentication trio</div>
    <div class="shield-row">
      <div class="shield spf">
        <div class="shield-icon">🔵</div>
        <h4>SPF</h4>
        <span class="shield-record">TXT record</span>
        <p>Lists the IP addresses authorised to send email on behalf of your domain.</p>
        <p><code style="font-size:0.7rem;color:var(--teal)">v=spf1 include:spf.protection.outlook.com -all</code></p>
        <div class="shield-protects">✓ Protects: 5321.MailFrom (envelope sender)</div>
        <div class="shield-gap">⚠️ Gap: visible From: header is NOT validated</div>
      </div>
      <div class="shield dkim">
        <div class="shield-icon">🔑</div>
        <h4>DKIM</h4>
        <span class="shield-record">2× CNAME records</span>
        <p>Cryptographic signature. Private key signs outgoing mail. Public key in DNS for receivers to verify.</p>
        <p style="font-size:0.72rem;color:var(--text-muted)">selector1._domainkey.domain.com<br>selector2._domainkey.domain.com</p>
        <div class="shield-protects">✓ Protects: message integrity (wasn't tampered with)</div>
        <div class="shield-gap">⚠️ Doesn't prevent domain spoofing alone</div>
      </div>
      <div class="shield dmarc">
        <div class="shield-icon">🛡️</div>
        <h4>DMARC</h4>
        <span class="shield-record">TXT at _dmarc.domain</span>
        <p>Uses SPF + DKIM results to validate the visible From: header. Tells receivers what to do with failures.</p>
        <p style="font-size:0.72rem;color:var(--text-muted)">Policy: <strong>none</strong> (monitor) → <strong>quarantine</strong> → <strong>reject</strong></p>
        <div class="shield-protects">✓ Protects: 5322.From (what users actually see)</div>
        <div class="shield-gap">⚠️ Requires SPF and DKIM to be set up first</div>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px 16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);font-size:0.8rem;color:var(--text-muted)">
      💡 <strong style="color:var(--text)">Order matters:</strong> SPF validates sending IP → DKIM validates message integrity → DMARC uses both results to validate the visible From: header and enforces your policy. Set up in that order.
    </div>
  </div>

  <div>
    <div class="visual-label">ZAP — retroactive post-delivery protection</div>
    <div class="zap-wrap">
      <div class="zap-title">⚡ Zero-Hour Auto Purge — how it works</div>
      <div class="zap-row">
        <div class="zap-step">📧 Email delivered to inbox</div>
        <span class="zap-arrow">→</span>
        <div class="zap-step">⏱️ New threat sig released</div>
        <span class="zap-arrow">→</span>
        <div class="zap-step">👁️ ZAP detects match in mailbox</div>
        <span class="zap-arrow">→</span>
        <div class="zap-outcome spam">SPAM: → Junk folder (if unread)</div>
      </div>
      <div class="zap-row">
        <span style="width:220px"></span>
        <span class="zap-arrow" style="visibility:hidden">→</span>
        <span style="width:200px"></span>
        <span class="zap-arrow" style="visibility:hidden">→</span>
        <span style="width:200px"></span>
        <span class="zap-arrow">→</span>
        <div class="zap-outcome phish">PHISH: → Quarantine</div>
      </div>
      <div class="zap-row">
        <span style="width:220px"></span>
        <span class="zap-arrow" style="visibility:hidden">→</span>
        <span style="width:200px"></span>
        <span class="zap-arrow" style="visibility:hidden">→</span>
        <span style="width:200px"></span>
        <span class="zap-arrow">→</span>
        <div class="zap-outcome mal">MALWARE: → Removes attachment (even if read)</div>
      </div>
      <div style="margin-top:12px;font-size:0.75rem;color:var(--text-muted);display:flex;flex-direction:column;gap:4px">
        <span>💣 ZAP works on <strong style="color:var(--text)">Exchange Online mailboxes only</strong> — NOT standalone EOP for on-prem Exchange</span>
        <span>💣 Malware ZAP removes attachment <strong style="color:var(--text)">regardless of read status</strong></span>
        <span>💣 Spam ZAP only acts on <strong style="color:var(--text)">unread</strong> messages</span>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">Defender for Office 365 — Plan 1 vs Plan 2</div>
    <div class="tier-cards">
      <div class="tier-card" style="border-top:3px solid var(--text-muted)">
        <div class="tier-name" style="color:var(--text-muted)">EOP (Base — always included)</div>
        <div class="tier-sub">In all Exchange Online plans</div>
        <ul>
          <li>Anti-spam, anti-malware</li>
          <li>Basic anti-phishing (spoof)</li>
          <li>ZAP</li>
          <li>Quarantine</li>
          <li>Connection filtering</li>
        </ul>
      </div>
      <div class="tier-card p1" style="border-top-color:var(--blue)">
        <div class="tier-name" style="color:var(--blue-bright)">Defender for Office 365 Plan 1</div>
        <div class="tier-sub">EOP PLUS:</div>
        <ul>
          <li><strong>Safe Links</strong> — URL rewrite &amp; time-of-click check</li>
          <li><strong>Safe Attachments</strong> — sandbox detonation</li>
          <li>Advanced anti-phishing (impersonation + mailbox intelligence)</li>
          <li>Real-time detections (7-day)</li>
        </ul>
      </div>
      <div class="tier-card p2" style="border-top-color:var(--purple)">
        <div class="tier-name" style="color:var(--purple)">Defender for Office 365 Plan 2</div>
        <div class="tier-sub">Plan 1 PLUS:</div>
        <ul>
          <li><strong>Threat Explorer</strong> — 30-day email investigation</li>
          <li><strong>AIR</strong> — Automated Investigation &amp; Response</li>
          <li><strong>Attack Simulator</strong> — phishing simulation training</li>
          <li>Campaign views</li>
          <li>Threat Analytics</li>
          <li>Priority account protection</li>
        </ul>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">Defender XDR components — what each product protects</div>
    <div class="cards-grid">
      <div class="concept-card security">
        <h4>📧 Defender for Office 365</h4>
        <ul>
          <li>Protects: <strong>email, Teams, SharePoint, OneDrive</strong></li>
          <li>Safe Links, Safe Attachments, anti-phishing</li>
          <li>P2: Threat Explorer, AIR, Attack Simulator</li>
        </ul>
      </div>
      <div class="concept-card security">
        <h4>🕵️ Defender for Identity</h4>
        <ul>
          <li>Protects: <strong>on-premises Active Directory</strong></li>
          <li>Sensor on domain controllers — monitors AD activity</li>
          <li>Detects: pass-the-hash, lateral movement, golden ticket</li>
        </ul>
      </div>
      <div class="concept-card security">
        <h4>💻 Defender for Endpoint</h4>
        <ul>
          <li>Protects: <strong>Windows, macOS, Linux, iOS, Android</strong></li>
          <li>P1: core AV, firewall, ASR rules</li>
          <li>P2: EDR, threat hunting, device timeline, auto-remediation</li>
        </ul>
      </div>
      <div class="concept-card security">
        <h4>☁️ Defender for Cloud Apps</h4>
        <ul>
          <li>Protects: <strong>SaaS apps (CASB)</strong></li>
          <li>Discovers shadow IT from network logs</li>
          <li>Enforces policies on cloud app usage</li>
        </ul>
      </div>
      <div class="concept-card security">
        <h4>⚡ Advanced Hunting (KQL)</h4>
        <ul>
          <li>Query: <code style="color:var(--teal)">EmailEvents | where ThreatTypes has "Phish"</code></li>
          <li>Common tables: EmailEvents, DeviceEvents, IdentityLogonEvents</li>
          <li>Operators: <code style="color:var(--teal)">where, summarize, project, join, extend</code></li>
        </ul>
      </div>
      <div class="concept-card security">
        <h4>🤖 AIR — Automated Investigation</h4>
        <ul>
          <li>Triggered by alerts in Defender XDR</li>
          <li>Automatically investigates: scope, related entities</li>
          <li>Produces: remediation actions for analyst approval</li>
          <li>Requires: Defender for Office 365 Plan 2</li>
        </ul>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">SCL (Spam Confidence Level) — the scoring system</div>
    <div class="compare-table">
      <table>
        <thead><tr><th>SCL Value</th><th>Meaning</th><th>Default Action</th></tr></thead>
        <tbody>
          <tr><td>-1</td><td>Bypass filtering (safe sender / allowed IP)</td><td>Deliver to inbox</td></tr>
          <tr><td>0 – 4</td><td>Not spam</td><td>Deliver to inbox</td></tr>
          <tr><td>5 – 6</td><td>Spam</td><td>Deliver to Junk Email folder</td></tr>
          <tr><td>7 – 9</td><td>High confidence spam</td><td>Spam action in policy (quarantine or junk)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`;
}

function renderCompliance() {
  return `
<div class="domain-room">
  <div class="section-header">
    <div class="section-header-left">
      <h2>Manage Compliance — Microsoft Purview</h2>
      <p>Data classification, sensitivity labels, DLP, retention, eDiscovery, Compliance Manager</p>
    </div>
    <div class="domain-weight">
      <span class="pct" style="color:var(--compliance)">10–15%</span>
      <span class="pct-label">of exam</span>
    </div>
  </div>

  <div>
    <div class="visual-label">Purview — the five pillars</div>
    <div class="purview-pillars">
      <div class="purview-pillar">
        <h4>🔍 Data Classification</h4>
        <ul>
          <li><strong>Sensitive Information Types (SIT)</strong>: pattern/keyword based (SSN, credit card, etc.)</li>
          <li><strong>Trainable classifiers</strong>: ML-based, you provide samples</li>
          <li><strong>Content Explorer</strong>: view what's classified (read-only, needs specific role)</li>
          <li><strong>Activity Explorer</strong>: see what actions are taken on labelled content</li>
        </ul>
      </div>
      <div class="purview-pillar">
        <h4>🏷️ Information Protection</h4>
        <ul>
          <li><strong>Sensitivity labels</strong>: classify &amp; protect files, email, containers</li>
          <li>Can apply: encryption, watermarks, access restrictions</li>
          <li>Auto-labeling: recommend or auto-apply (E5 for server-side)</li>
          <li>Label follows the content — enforces everywhere, even outside M365</li>
        </ul>
      </div>
      <div class="purview-pillar">
        <h4>🚫 Data Loss Prevention</h4>
        <ul>
          <li>Policies scan for sensitive content across: Exchange, SharePoint, Teams, OneDrive, <strong>Devices</strong></li>
          <li>Actions: block, allow with override, notify, audit</li>
          <li>Endpoint DLP: USB copy, print, browser upload on Windows devices</li>
          <li>Uses SITs or sensitivity labels to identify content</li>
        </ul>
      </div>
      <div class="purview-pillar">
        <h4>📅 Data Lifecycle / Retention</h4>
        <ul>
          <li><strong>Retain</strong>: keep for period</li>
          <li><strong>Delete</strong>: delete after period</li>
          <li><strong>Retain then delete</strong>: keep then auto-delete</li>
          <li>Retention labels: more granular, can mark as records</li>
          <li>Regulatory records: immutable, cannot delete</li>
        </ul>
      </div>
      <div class="purview-pillar">
        <h4>🔎 eDiscovery</h4>
        <ul>
          <li><strong>Standard</strong>: search + export (E3)</li>
          <li><strong>Premium</strong>: custodians, analytics, hold management (E5)</li>
          <li>Content Search: search across all M365 services</li>
          <li>Hold: preserve content in place without moving it</li>
        </ul>
      </div>
      <div class="purview-pillar">
        <h4>📊 Compliance Manager</h4>
        <ul>
          <li>Risk-based compliance score (0–100%)</li>
          <li>Assessment templates: GDPR, ISO 27001, NIST CSF, etc.</li>
          <li>Improvement actions: steps to raise your score</li>
          <li>Controls: map to regulatory requirements</li>
          <li>Score ≠ certified compliant — it's a guide</li>
        </ul>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">Sensitivity label lifecycle</div>
    <div class="flow-wrap">
      <div class="flow">
        <div class="flow-step">
          <span class="step-icon">✏️</span>
          <span class="step-name">Create label</span>
          <span class="step-desc">Define: name, scope, protection settings</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step highlight">
          <span class="step-icon">📤</span>
          <span class="step-name">Publish</span>
          <span class="step-desc">Label policy: which users see this label</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="step-icon">👆</span>
          <span class="step-name">Apply</span>
          <span class="step-desc">Manual, recommended, or auto-applied</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step success">
          <span class="step-icon">🔒</span>
          <span class="step-name">Enforced</span>
          <span class="step-desc">Encryption, watermark, access restrictions apply everywhere</span>
        </div>
      </div>
      <div class="cards-grid" style="margin-top:16px">
        <div class="concept-card compliance">
          <h4>🔒 What a label can do</h4>
          <ul>
            <li><strong>Encryption</strong>: AIP-based, travels with the file</li>
            <li><strong>Content marking</strong>: watermarks, headers, footers</li>
            <li><strong>Access restrictions</strong>: who can edit, print, copy</li>
            <li><strong>Container labels</strong>: protect Teams/SharePoint sites</li>
          </ul>
        </div>
        <div class="concept-card compliance">
          <h4>🏷️ Where labels apply</h4>
          <ul>
            <li>Files (Office apps, PDF)</li>
            <li>Email (Outlook)</li>
            <li>Meetings</li>
            <li>Containers: Teams, SharePoint sites, M365 Groups</li>
          </ul>
          <div class="card-note">Auto-labeling in SharePoint/OneDrive requires E5 or Compliance add-on</div>
        </div>
        <div class="concept-card compliance">
          <h4>📜 Records Management</h4>
          <ul>
            <li><strong>Record</strong>: locked from editing, can be deleted after period</li>
            <li><strong>Regulatory record</strong>: CANNOT be deleted AT ALL during period</li>
            <li>Declare as record via retention label</li>
            <li>Disposition review: human approval before deletion</li>
          </ul>
          <div class="card-note">Regulatory record = most restrictive — immutable</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">DLP policy — how a match triggers action</div>
    <div class="flow-wrap">
      <div class="flow">
        <div class="flow-step">
          <span class="step-icon">📄</span>
          <span class="step-name">Content exists</span>
          <span class="step-desc">In Exchange, SharePoint, Teams, OneDrive, or Device</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step highlight">
          <span class="step-icon">🔍</span>
          <span class="step-name">DLP scans</span>
          <span class="step-desc">Checks for SITs or sensitivity labels in content</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step warn">
          <span class="step-icon">⚠️</span>
          <span class="step-name">Rule match</span>
          <span class="step-desc">Content matches policy conditions</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step danger">
          <span class="step-icon">🚫</span>
          <span class="step-name">Action taken</span>
          <span class="step-desc">Block / allow override / notify / audit</span>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="visual-label">Trainable classifiers — what you need to know</div>
    <div class="cards-grid">
      <div class="concept-card compliance">
        <h4>🎓 Built-in Classifiers (ready to use)</h4>
        <ul>
          <li>Resumes, source code, financial statements</li>
          <li>Offensive language, harassment</li>
          <li>Business conduct, IP, legal docs</li>
          <li>No training needed — Microsoft pre-built</li>
        </ul>
      </div>
      <div class="concept-card compliance">
        <h4>🛠️ Custom Trainable Classifiers</h4>
        <ul>
          <li><strong>Minimum 50 positive samples</strong> as seed content</li>
          <li>Add 200–500 samples for better accuracy</li>
          <li>Test phase: add positive AND negative examples</li>
          <li>Retrain: add more examples to improve precision</li>
        </ul>
        <div class="card-note">💣 50 minimum — exam loves this number</div>
      </div>
    </div>
  </div>
</div>`;
}

// ─── SVG MAP RENDERING ───────────────────────────────────────────────────────

function getNodeCenter(node) {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

function bezierPath(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const cx1 = x1 + dx * 0.5, cy1 = y1;
  const cx2 = x2 - dx * 0.5, cy2 = y2;
  return `M ${x1} ${y1} C ${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`;
}

function buildMap() {
  const svg = document.getElementById('ecosystem-svg');
  const nodeMap = {};
  NODES.forEach(n => { nodeMap[n.id] = n; });

  // Build adjacency for hover highlighting
  const adjacency = {};
  NODES.forEach(n => { adjacency[n.id] = new Set(); });
  EDGES.forEach(([a, b]) => {
    adjacency[a].add(b);
    adjacency[b].add(a);
  });

  // ── DEFS (gradient, glow) ──
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  `;
  svg.appendChild(defs);

  // ── EDGES GROUP ──
  const edgeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  edgeGroup.id = 'edge-group';
  const edgeEls = {};

  EDGES.forEach(([srcId, tgtId]) => {
    const src = nodeMap[srcId], tgt = nodeMap[tgtId];
    if (!src || !tgt) return;
    const sc = getNodeCenter(src), tc = getNodeCenter(tgt);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', bezierPath(sc.x, sc.y, tc.x, tc.y));
    path.setAttribute('stroke', '#30363d');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('opacity', '0.6');
    path.dataset.src = srcId;
    path.dataset.tgt = tgtId;
    const key = srcId + '|' + tgtId;
    edgeEls[key] = path;
    edgeEls[tgtId + '|' + srcId] = path; // bidirectional lookup
    edgeGroup.appendChild(path);
  });
  svg.appendChild(edgeGroup);

  // ── NODES GROUP ──
  const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  nodeGroup.id = 'node-group';

  NODES.forEach(node => {
    const color = CATEGORY_COLORS[node.category];
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('cursor', 'pointer');
    g.dataset.id = node.id;

    // Background rect
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', node.x);
    rect.setAttribute('y', node.y);
    rect.setAttribute('width', node.w);
    rect.setAttribute('height', node.h);
    rect.setAttribute('rx', '8');
    rect.setAttribute('fill', hexToRgba(color, 0.08));
    rect.setAttribute('stroke', color);
    rect.setAttribute('stroke-width', '1.5');
    rect.setAttribute('opacity', '0.85');

    // Icon
    const iconText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    iconText.setAttribute('x', node.x + node.w / 2);
    iconText.setAttribute('y', node.y + 18);
    iconText.setAttribute('text-anchor', 'middle');
    iconText.setAttribute('dominant-baseline', 'middle');
    iconText.setAttribute('font-size', '14');
    iconText.textContent = node.icon;

    // Label (may wrap)
    const words = node.label.split(' ');
    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    labelGroup.setAttribute('fill', '#e6edf3');
    labelGroup.setAttribute('font-size', '11');
    labelGroup.setAttribute('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
    labelGroup.setAttribute('text-anchor', 'middle');
    labelGroup.setAttribute('font-weight', '500');

    // Simple 2-line wrap: if label > 14 chars, split roughly in half
    if (node.label.length > 15) {
      const midpoint = Math.ceil(words.length / 2);
      const line1 = words.slice(0, midpoint).join(' ');
      const line2 = words.slice(midpoint).join(' ');
      const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan1.setAttribute('x', node.x + node.w / 2);
      tspan1.setAttribute('y', node.y + 33);
      tspan1.textContent = line1;
      const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan2.setAttribute('x', node.x + node.w / 2);
      tspan2.setAttribute('y', node.y + 46);
      tspan2.textContent = line2;
      labelGroup.appendChild(tspan1);
      labelGroup.appendChild(tspan2);
    } else {
      labelGroup.setAttribute('x', node.x + node.w / 2);
      labelGroup.setAttribute('y', node.y + 39);
      labelGroup.textContent = node.label;
    }

    g.appendChild(rect);
    g.appendChild(iconText);
    g.appendChild(labelGroup);

    // Hover
    g.addEventListener('mouseenter', () => {
      rect.setAttribute('fill', hexToRgba(color, 0.2));
      rect.setAttribute('stroke-width', '2');
      g.setAttribute('filter', 'url(#glow)');
      // Highlight connected edges
      adjacency[node.id].forEach(neighborId => {
        const k1 = node.id + '|' + neighborId;
        const k2 = neighborId + '|' + node.id;
        const edge = edgeEls[k1] || edgeEls[k2];
        if (edge) {
          edge.setAttribute('stroke', color);
          edge.setAttribute('stroke-width', '2');
          edge.setAttribute('opacity', '1');
        }
      });
    });
    g.addEventListener('mouseleave', () => {
      rect.setAttribute('fill', hexToRgba(color, 0.08));
      rect.setAttribute('stroke-width', '1.5');
      g.removeAttribute('filter');
      // Reset edges
      adjacency[node.id].forEach(neighborId => {
        const k1 = node.id + '|' + neighborId;
        const k2 = neighborId + '|' + node.id;
        const edge = edgeEls[k1] || edgeEls[k2];
        if (edge) {
          edge.setAttribute('stroke', '#30363d');
          edge.setAttribute('stroke-width', '1.5');
          edge.setAttribute('opacity', '0.6');
        }
      });
    });
    g.addEventListener('click', () => openPanel(node.id));

    nodeGroup.appendChild(g);
  });
  svg.appendChild(nodeGroup);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── NODE DETAIL PANEL ───────────────────────────────────────────────────────

function openPanel(nodeId) {
  const node = NODES.find(n => n.id === nodeId);
  if (!node) return;

  const color = CATEGORY_COLORS[node.category];
  const cat = node.category.charAt(0).toUpperCase() + node.category.slice(1);

  // Header
  document.getElementById('panel-header').innerHTML = `
    <span class="panel-icon">${node.icon}</span>
    <div style="flex:1;min-width:0">
      <div class="panel-title">${node.fullName}</div>
      <span class="panel-category" style="background:${hexToRgba(color, 0.15)};color:${color}">${cat}</span>
    </div>
    <button class="panel-close" onclick="closePanel()">✕</button>
  `;

  // Connected node labels
  const connectedNodes = (node.connects || []).map(cid => {
    const cn = NODES.find(n => n.id === cid);
    return cn ? `<span class="connect-chip" onclick="openPanel('${cid}')">${cn.icon} ${cn.label}</span>` : '';
  }).join('');

  // Body
  document.getElementById('panel-body').innerHTML = `
    <div class="panel-section">
      <h4>What it does</h4>
      <p>${node.description}</p>
    </div>
    <div class="panel-section">
      <h4>Licence requirement</h4>
      <span class="licence-pill">🔑 ${node.licence}</span>
    </div>
    <div class="panel-section">
      <h4>Admin portal</h4>
      <span class="portal-link">🔗 ${node.portal}</span>
    </div>
    <div class="panel-section">
      <h4>💣 Exam facts</h4>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${(node.examFacts || []).map(f => `<div class="exam-fact">${f}</div>`).join('')}
      </div>
    </div>
    ${connectedNodes ? `
    <div class="panel-section">
      <h4>Connects to</h4>
      <div class="connects-list">${connectedNodes}</div>
    </div>` : ''}
  `;

  document.getElementById('node-panel').classList.add('open');
  document.getElementById('panel-overlay').classList.add('active');
}

function closePanel() {
  document.getElementById('node-panel').classList.remove('open');
  document.getElementById('panel-overlay').classList.remove('active');
}

// ─── GRENADE PANEL ───────────────────────────────────────────────────────────

function renderGrenades(filter = 'all') {
  const filtered = filter === 'all' ? GRENADES : GRENADES.filter(g => g.category === filter);
  const categories = ['all', 'identity', 'security', 'tenant', 'compliance', 'dns'];

  const filterHTML = categories.map(c => `
    <button class="grenade-filter ${filter === c ? 'active' : ''}" onclick="renderGrenades('${c}')">
      ${c === 'all' ? '⚡ All' : c.charAt(0).toUpperCase() + c.slice(1)}
      <span style="opacity:0.6;font-size:0.7em">${c === 'all' ? GRENADES.length : GRENADES.filter(g=>g.category===c).length}</span>
    </button>
  `).join('');

  const cardsHTML = filtered.map(g => `
    <div class="grenade-card ${g.category}">
      <span class="g-icon">${g.icon}</span>
      <div class="g-body">
        <div class="g-tag">${g.category}</div>
        <div class="g-fact">${g.fact}</div>
        <div class="g-detail">${g.detail}</div>
      </div>
    </div>
  `).join('');

  document.getElementById('grenades-content').innerHTML = `
    <div class="grenades-header">
      <h2>💣 Exam Grenades</h2>
      <p>The specific facts, numbers, and gotchas the exam loves. These blow people up who didn't memorise them.</p>
    </div>
    <div class="grenade-filter-bar">${filterHTML}</div>
    <div class="grenades-grid">${cardsHTML}</div>
  `;

  document.getElementById('grenade-count').textContent = GRENADES.length;
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function switchSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Build map
  buildMap();

  // Render playbook
  renderPlaybook();

  // Render domain rooms
  document.getElementById('tenant-content').innerHTML = renderTenant();
  document.getElementById('identity-content').innerHTML = renderIdentity();
  document.getElementById('security-content').innerHTML = renderSecurity();
  document.getElementById('compliance-content').innerHTML = renderCompliance();

  // Render grenades
  renderGrenades();

  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  // Keyboard: Escape closes panel
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
});
