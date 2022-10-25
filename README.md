# Personalize your static site using the HTTP referer header

`index.html` is static page.

Using Netlify Edge Functions, we can intercept a request to this page, check the value of the HTTP referer header, and
rewrite the response of the HTML before it's returned to the browser. No client-side JavaScript required.

[View the Edge Function code](netlify/edge-functions/referer.js)

## Testing in development

Use the [Netlify CLI](https://ntl.fyi/3Til6sY) to run this site locally.

In the root of the project, enter the following command in your terminal:

```bash
netlify dev
```

To test the referer header, make sure the referer detection is set to http://localhost:8888/ and click on the "click
here" link.

To remove the HTTP referer header and banner in development, navigate to http://localhost:8888/ without clicking on the
link.

## Deploy on Netlify

Instantly deploy this tutorial site to your own Netlify account:

[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fwhitep4nth3r%2Fpersonalize-with-http-referer)
