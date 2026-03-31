export interface CountryCode {
  code: string;   // e.g. "+241"
  country: string; // e.g. "Gabon"
  iso: string;     // e.g. "GA"
}

/** Featured codes shown at top of selector, in display order. */
export const FEATURED_CODES: CountryCode[] = [
  { code: "+241", country: "Gabon", iso: "GA" },
  { code: "+33", country: "France", iso: "FR" },
  { code: "+1", country: "US / Canada", iso: "US" },
  { code: "+44", country: "United Kingdom", iso: "UK" },
  { code: "+351", country: "Portugal", iso: "PT" },
  { code: "+34", country: "Spain", iso: "ES" },
  { code: "+55", country: "Brazil", iso: "BR" },
];

/** African country codes, alphabetical. */
export const AFRICAN_CODES: CountryCode[] = [
  { code: "+213", country: "Algeria", iso: "DZ" },
  { code: "+244", country: "Angola", iso: "AO" },
  { code: "+229", country: "Benin", iso: "BJ" },
  { code: "+267", country: "Botswana", iso: "BW" },
  { code: "+226", country: "Burkina Faso", iso: "BF" },
  { code: "+257", country: "Burundi", iso: "BI" },
  { code: "+237", country: "Cameroon", iso: "CM" },
  { code: "+238", country: "Cape Verde", iso: "CV" },
  { code: "+236", country: "Central African Republic", iso: "CF" },
  { code: "+235", country: "Chad", iso: "TD" },
  { code: "+269", country: "Comoros", iso: "KM" },
  { code: "+242", country: "Congo", iso: "CG" },
  { code: "+243", country: "DR Congo", iso: "CD" },
  { code: "+253", country: "Djibouti", iso: "DJ" },
  { code: "+20", country: "Egypt", iso: "EG" },
  { code: "+240", country: "Equatorial Guinea", iso: "GQ" },
  { code: "+291", country: "Eritrea", iso: "ER" },
  { code: "+268", country: "Eswatini", iso: "SZ" },
  { code: "+251", country: "Ethiopia", iso: "ET" },
  { code: "+241", country: "Gabon", iso: "GA" },
  { code: "+220", country: "Gambia", iso: "GM" },
  { code: "+233", country: "Ghana", iso: "GH" },
  { code: "+224", country: "Guinea", iso: "GN" },
  { code: "+245", country: "Guinea-Bissau", iso: "GW" },
  { code: "+225", country: "Ivory Coast", iso: "CI" },
  { code: "+254", country: "Kenya", iso: "KE" },
  { code: "+266", country: "Lesotho", iso: "LS" },
  { code: "+231", country: "Liberia", iso: "LR" },
  { code: "+218", country: "Libya", iso: "LY" },
  { code: "+261", country: "Madagascar", iso: "MG" },
  { code: "+265", country: "Malawi", iso: "MW" },
  { code: "+223", country: "Mali", iso: "ML" },
  { code: "+222", country: "Mauritania", iso: "MR" },
  { code: "+230", country: "Mauritius", iso: "MU" },
  { code: "+212", country: "Morocco", iso: "MA" },
  { code: "+258", country: "Mozambique", iso: "MZ" },
  { code: "+264", country: "Namibia", iso: "NA" },
  { code: "+227", country: "Niger", iso: "NE" },
  { code: "+234", country: "Nigeria", iso: "NG" },
  { code: "+250", country: "Rwanda", iso: "RW" },
  { code: "+239", country: "São Tomé and Príncipe", iso: "ST" },
  { code: "+221", country: "Senegal", iso: "SN" },
  { code: "+248", country: "Seychelles", iso: "SC" },
  { code: "+232", country: "Sierra Leone", iso: "SL" },
  { code: "+252", country: "Somalia", iso: "SO" },
  { code: "+27", country: "South Africa", iso: "ZA" },
  { code: "+211", country: "South Sudan", iso: "SS" },
  { code: "+249", country: "Sudan", iso: "SD" },
  { code: "+255", country: "Tanzania", iso: "TZ" },
  { code: "+228", country: "Togo", iso: "TG" },
  { code: "+216", country: "Tunisia", iso: "TN" },
  { code: "+256", country: "Uganda", iso: "UG" },
  { code: "+260", country: "Zambia", iso: "ZM" },
  { code: "+263", country: "Zimbabwe", iso: "ZW" },
];

/** All codes: featured first, then African alphabetical. */
export const ALL_CODES = [...FEATURED_CODES, ...AFRICAN_CODES];
