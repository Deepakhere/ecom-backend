export const CORS_OPTIONS = {
  origin: "http://localhost:4000",
  credentials: true,
  methods: ["POST", "GET", "DELETE", "PUT"],
};

export const SESSION_OPTIONS = {
  secret: process.env.SESSION_SECRET || "secret-key-ecommerce",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    // httpOnly: false,
    // sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
};
