import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";


export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        //General checking.
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Access denied. Bot traffic is not allowed." });
            } else {
                return res.status(403).json({ message: "Access denied." });
            }
        }

        //spoofed bot checking.
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected. Access denied.",
                message: "Access denied. Spoofed bot traffic is not allowed."
            })
        }

        next();
    } catch (error) {
        console.error("Arcjet protection error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}