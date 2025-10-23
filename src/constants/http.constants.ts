/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  INTERNAL_ERROR: 'Internal server error',
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  FORBIDDEN_ACCESS: 'Forbidden: You can only access your own profile',
  BREED_ID_REQUIRED: 'Breed ID is required',
  SEARCH_QUERY_REQUIRED: 'Search query (q) is required',
  INVALID_PARAMETERS: 'Invalid parameters provided',
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'User registered successfully',
  BREED_FETCHED: 'Breeds fetched successfully',
  USER_FETCHED: 'User fetched successfully',
} as const;
