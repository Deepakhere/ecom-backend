export const CORS_OPTIONS = {
  origin: "https://deepakhere.github.io",
  credentials: true,
  methods: ["POST", "GET", "DELETE", "PUT"],
};

export const SESSION_OPTIONS = {
  secret: process.env.SESSION_SECRET || "secret-key-ecommerce",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
};
