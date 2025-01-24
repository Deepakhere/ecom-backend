export const CORS_OPTIONS = {
  origin: "https://deepakhere.github.io",
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true,
};

export const SESSION_OPTIONS = {
  secret: process.env.SESSION_SECRET || "secret-key-ecommerce",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
};
