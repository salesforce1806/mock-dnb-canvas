export default function handler(req, res) {
  // 1. CSP Header: Tells browser "It is safe to put me in a Salesforce iframe"
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://*.salesforce.com https://*.force.com;");

  // 2. Handle the Salesforce POST request
  if (req.method === 'POST') {
    const body = req.body;
    // Salesforce sends the data in a field called 'signed_request'
    const signedRequest = body.signed_request;

    res.status(200).send(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding: 40px;">
          <h1 style="color:green">Connection Successful!</h1>
          <p><b>This is your Vercel App speaking.</b></p>
          <p>Salesforce successfully found me and POSTed data.</p>
          <br/>
          <div style="background:#eee; padding:15px; border-radius:8px; word-break:break-all;">
            <strong>Verification (Signed Request):</strong><br/>
            ${signedRequest ? "✅ Received" : "❌ Not Found"}
          </div>
        </body>
      </html>
    `);
  } else {
    // If you open this URL directly in your browser
    res.status(200).send("Hello! Access this via Salesforce to see the magic.");
  }
}
