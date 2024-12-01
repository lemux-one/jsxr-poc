enum HTTP {
  // Success
  OK = 200,

  // Redirections
  SEE_OTHER = 303,

  // Client
  BAD_REQUEST = 400,
  NOT_FOUND = 404,

  // Server
  INTERNAL_ERROR = 500,
}

export { HTTP };
