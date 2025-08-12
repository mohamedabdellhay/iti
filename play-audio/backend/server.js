import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Enhanced CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD"], // Only need GET/HEAD for media streaming
    allowedHeaders: ["Content-Type", "Range"],
    exposedHeaders: ["Content-Range", "Content-Length", "Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("Media Proxy Server 👍");
});

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl)
    return res.status(400).json({ error: "Missing URL parameter" });

  try {
    // Configure fetch options
    const fetchOptions = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "video/mp4,video/webm,video/ogg,audio/mpeg,audio/ogg,*/*;q=0.8",
        Referer: new URL(targetUrl).origin || "https://example.com/",
        Origin: new URL(targetUrl).origin || "https://example.com/",
      },
    };

    // Support for byte range requests (critical for video streaming)
    if (req.headers.range) {
      fetchOptions.headers.Range = req.headers.range;
    }

    const response = await fetch(targetUrl, fetchOptions);

    // Handle redirects
    if (response.redirected) {
      return res.redirect(response.url);
    }

    // Forward important headers
    const headersToForward = [
      "content-type",
      "content-length",
      "content-range",
      "accept-ranges",
      "cache-control",
      "last-modified",
      "etag",
    ];

    headersToForward.forEach((header) => {
      if (response.headers.get(header)) {
        res.setHeader(header, response.headers.get(header));
      }
    });

    // Special handling for video content
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("video/")) {
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Cache-Control", "public, max-age=31536000");
    }

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Expose-Headers",
      "Content-Range, Content-Length"
    );

    // Handle 206 Partial Content for videos
    if (response.status === 206) {
      res.status(206);
    }

    // Stream the response
    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({
      error: "Proxy error",
      message: err.message,
      url: targetUrl,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Media proxy server running on port ${PORT}`)
);
