// HTMLRewriter docs: https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
  // get HTTP referer header
  const referer = request.headers.get("referer");

  // get the next HTTP response in the chain
  const response = await context.next();

  // if no referer, return the response
  if (referer === null) {
    return response;
  }

  // check for the referer we care about
  // this is a basic example and you may want to get a little
  // more fancy with fuzzy checks and multiple referers

  // HTTP_REFERER_CHECK is an environment variable
  // in production it is set to the production URL
  // in dev, it is set in the netlify.toml
  if (referer !== Deno.env.get("HTTP_REFERER_CHECK") && referer !== "https://www.netlify.com/") {
    return response;
  }

  // if we do have a referer match, rewrite the element
  // in the response HTML with a friendly message
  const netlifyMsg = referer === "https://www.netlify.com/" ? "<br /> ✨ You came from the Netlify blog post! ✨ " : "";

  return new HTMLRewriter()
    .on("p#referer", {
      element(element) {
        element.setInnerContent(
          `Hello, from an Edge Function that detected a specific HTTP referer header! ${netlifyMsg}`,
          { html: true },
        );
        element.setAttribute("class", "referer");
      },
    })
    .transform(response);
};
