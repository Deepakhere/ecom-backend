import MongoStore from "connect-mongo";

export const CORS_OPTIONS = {
  origin: "https://deepakhere.github.io",
  credentials: true,
  methods: ["POST", "GET", "DELETE", "PUT"],
};

export const SESSION_OPTIONS = {
  secret: process.env.SESSION_SECRET || "secret-key-ecommerce",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://deepakgupta:mongodbpaasword@cluster0.xnwuo.mongodb.net/",
    ttl: 24 * 60 * 60,
    autoRemove: "native",
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
};
