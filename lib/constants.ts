export const NAV_ITEMS = [
  { href: '/', label: 'Tableau de bord' },
  { href: '/search', label: 'Recherche' },
  { href: '/watchlist', label: 'Liste de suivi' },
];

// Options du formulaire d'inscription
export const INVESTMENT_GOALS = [
  { value: 'Growth', label: 'Croissance' },
  { value: 'Income', label: 'Revenu' },
  { value: 'Balanced', label: 'Équilibré' },
  { value: 'Conservative', label: 'Conservateur' },
];

export const RISK_TOLERANCE_OPTIONS = [
  { value: 'Low', label: 'Faible' },
  { value: 'Medium', label: 'Moyenne' },
  { value: 'High', label: 'Élevée' },
];

export const PREFERRED_INDUSTRIES = [
  { value: 'Technology', label: 'Technologie' },
  { value: 'Healthcare', label: 'Santé' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Energy', label: 'Énergie' },
  { value: 'Consumer Goods', label: 'Biens de consommation' },
];

export const ALERT_TYPE_OPTIONS = [
  { value: 'upper', label: 'Seuil supérieur' },
  { value: 'lower', label: 'Seuil inférieur' },
];

export const CONDITION_OPTIONS = [
  { value: 'greater', label: 'Supérieur à (>)' },
  { value: 'less', label: 'Inférieur à (<)' },
];

// Graphiques TradingView
export const MARKET_OVERVIEW_WIDGET_CONFIG = {
  colorTheme: 'dark',
  dateRange: '12M',
  locale: 'fr',
  largeChartUrl: '',
  isTransparent: true,
  showFloatingTooltip: true,
  plotLineColorGrowing: '#0FEDBE',
  plotLineColorFalling: '#0FEDBE',
  gridLineColor: 'rgba(240, 243, 250, 0)',
  scaleFontColor: '#DBDBDB',
  belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
  belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
  belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
  belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
  symbolActiveColor: 'rgba(15, 237, 190, 0.05)',
  tabs: [
    {
      title: 'Finance',
      symbols: [
        { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
        { s: 'NYSE:WFC', d: 'Wells Fargo' },
        { s: 'NYSE:BAC', d: 'Bank of America' },
        { s: 'NYSE:HSBC', d: 'HSBC Holdings' },
        { s: 'NYSE:C', d: 'Citigroup' },
        { s: 'NYSE:MA', d: 'Mastercard' },
      ],
    },
    {
      title: 'Technologie',
      symbols: [
        { s: 'NASDAQ:AAPL', d: 'Apple' },
        { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
        { s: 'NASDAQ:MSFT', d: 'Microsoft' },
        { s: 'NASDAQ:FB', d: 'Meta Platforms' },
        { s: 'NYSE:ORCL', d: 'Oracle' },
        { s: 'NASDAQ:INTC', d: 'Intel' },
      ],
    },
    {
      title: 'Services',
      symbols: [
        { s: 'NASDAQ:AMZN', d: 'Amazon' },
        { s: 'NYSE:BABA', d: 'Alibaba Group' },
        { s: 'NYSE:T', d: 'AT&T' },
        { s: 'NYSE:WMT', d: 'Walmart' },
        { s: 'NYSE:V', d: 'Visa' },
      ],
    },
  ],
  support_host: 'https://www.tradingview.com',
  backgroundColor: '#141414',
  width: '100%',
  height: 600,
  showSymbolLogo: true,
  showChart: true,
};

export const HEATMAP_WIDGET_CONFIG = {
  dataSource: 'SPX500',
  blockSize: 'market_cap_basic',
  blockColor: 'change',
  grouping: 'sector',
  isTransparent: true,
  locale: 'fr',
  symbolUrl: '',
  colorTheme: 'dark',
  exchanges: [],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: '100%',
  height: '600',
};

export const TOP_STORIES_WIDGET_CONFIG = {
  displayMode: 'regular',
  feedMode: 'market',
  colorTheme: 'dark',
  isTransparent: true,
  locale: 'fr',
  market: 'stock',
  width: '100%',
  height: '600',
};

export const MARKET_DATA_WIDGET_CONFIG = {
  title: 'Actions',
  width: '100%',
  height: 600,
  locale: 'fr',
  showSymbolLogo: true,
  colorTheme: 'dark',
  isTransparent: false,
  backgroundColor: '#0F0F0F',
  symbolsGroups: [
    {
      name: 'Finance',
      symbols: [
        { name: 'NYSE:JPM', displayName: 'JPMorgan Chase' },
        { name: 'NYSE:WFC', displayName: 'Wells Fargo' },
        { name: 'NYSE:BAC', displayName: 'Bank of America' },
        { name: 'NYSE:HSBC', displayName: 'HSBC Holdings' },
        { name: 'NYSE:C', displayName: 'Citigroup' },
        { name: 'NYSE:MA', displayName: 'Mastercard' },
      ],
    },
    {
      name: 'Technologie',
      symbols: [
        { name: 'NASDAQ:AAPL', displayName: 'Apple' },
        { name: 'NASDAQ:GOOGL', displayName: 'Alphabet' },
        { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
        { name: 'NASDAQ:FB', displayName: 'Meta Platforms' },
        { name: 'NYSE:ORCL', displayName: 'Oracle' },
        { name: 'NASDAQ:INTC', displayName: 'Intel' },
      ],
    },
    {
      name: 'Services',
      symbols: [
        { name: 'NASDAQ:AMZN', displayName: 'Amazon' },
        { name: 'NYSE:BABA', displayName: 'Alibaba Group' },
        { name: 'NYSE:T', displayName: 'AT&T' },
        { name: 'NYSE:WMT', displayName: 'Walmart' },
        { name: 'NYSE:V', displayName: 'Visa' },
      ],
    },
  ],
};

export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: 'dark',
  isTransparent: true,
  locale: 'fr',
  width: '100%',
  height: 170,
});

export const CANDLE_CHART_WIDGET_CONFIG = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: true,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: 'D',
  locale: 'fr',
  save_image: false,
  style: 1,
  symbol: symbol.toUpperCase(),
  theme: 'dark',
  timezone: 'Etc/UTC',
  backgroundColor: '#141414',
  gridColor: '#141414',
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: '100%',
  height: 600,
});

export const BASELINE_WIDGET_CONFIG = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: false,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: 'D',
  locale: 'fr',
  save_image: false,
  style: 10,
  symbol: symbol.toUpperCase(),
  theme: 'dark',
  timezone: 'Etc/UTC',
  backgroundColor: '#141414',
  gridColor: '#141414',
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: '100%',
  height: 600,
});

export const TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: 'dark',
  isTransparent: 'true',
  locale: 'fr',
  width: '100%',
  height: 400,
  interval: '1h',
  largeChartUrl: '',
});

export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: 'dark',
  isTransparent: 'true',
  locale: 'fr',
  width: '100%',
  height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: 'dark',
  isTransparent: 'true',
  locale: 'fr',
  width: '100%',
  height: 464,
  displayMode: 'regular',
  largeChartUrl: '',
});

export const POPULAR_STOCK_SYMBOLS = [
  'AAPL',
  'MSFT',
  'GOOGL',
  'AMZN',
  'TSLA',
  'META',
  'NVDA',
  'NFLX',
  'ORCL',
  'CRM',

  'ADBE',
  'INTC',
  'AMD',
  'PYPL',
  'UBER',
  'ZOOM',
  'SPOT',
  'SQ',
  'SHOP',
  'ROKU',

  'SNOW',
  'PLTR',
  'COIN',
  'RBLX',
  'DDOG',
  'CRWD',
  'NET',
  'OKTA',
  'TWLO',
  'ZM',

  'DOCU',
  'PTON',
  'PINS',
  'SNAP',
  'LYFT',
  'DASH',
  'ABNB',
  'RIVN',
  'LCID',
  'NIO',

  'XPEV',
  'LI',
  'BABA',
  'JD',
  'PDD',
  'TME',
  'BILI',
  'DIDI',
  'GRAB',
  'SE',
];

export const NO_MARKET_NEWS =
  '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">Aucune actualité du marché disponible aujourd\'hui. Veuillez revenir demain.</p>';

export const WATCHLIST_TABLE_HEADER = [
  'Entreprise',
  'Symbole',
  'Prix',
  'Variation',
  'Capitalisation boursière',
  'Ratio C/B',
  'Alerte',
  'Action',
];
