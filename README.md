# plasmic-pdf-viewer
A PDF viewer component for use in Plasmic

## Contributors
- Callum Boase
   * Github: [CallumBoase](https://github.com/CallumBoase)
   * Website: [Enliven IT](https://enliven-it.com.au/contact)
   * Email: callum.boase@gmail.com
   * Mobile (Australia): +61409 378 253
- Ryan Mouritz
    * Github: [ryanmouritz](https://github.com/ryanmouritz)

## Getting help
**Need help with your project?**
Contact one of the contributors using their contact details above.

We provide general support for this package, as well as paid coaching & development in Plasmic & Supabase.

## Installation section 1: code components
This section explains how to install the code components that are included in this package.
* `PdfDocument`: a wrapper component for rendering a PDF
* `PdfPage`: a component displaying 1 page of a PDF. Must be nested inside a `PdfDocument` component

The code components provide JUST the functionality of previewing a PDF. They do not provide any user interface, for example zoom controls, rotation, pagination controls etc. If you want a pre-built user interface, complete Install section 1, then move on to Installation section 2.

### 01 - in Plasmic web interface
1. Create a new Plasmic app
2. Rename your app
3. Click the "Publish" button at top-right
4. Add a "Push to Github" step, publishing to a new repo, nextjs, loader (recommended) method, typescript
5. Click "publish" and wait for the build to complete

### 02 - On your machine
1. Clone the repo you just created to your local machine
2. In terminal, run `npm install` to install plasmic & it's dependencies
3. `npm install plasmic-pdf-viewer` to install this package
4. Open `./plasmic-init.ts`. It should look like this to start with (default Plasmic comments removed for brevity)
```ts
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "your-plasmic-project-id",
      token: "your-plasmic-project-token",
    },
  ],

  preview: false,
});

```
5. Modify `plasmic-init.ts` to import components from `plasmic-pdf-viewer`
```ts
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { 
  PdfPage,
  PdfDocument,
  PdfPageMeta,
  PdfDocumentMeta
} from "plasmic-pdf-viewer"

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "your-plasmic-project-id",
      token: "your-plasmic-project-token",
    },
  ],

  preview: true,
});

//Register Plasmic-pdf-viewer components
PLASMIC.registerComponent(PdfPage, PdfPageMeta);
PLASMIC.registerComponent(PdfDocument, PdfDocumentMeta);

```
6. In `./pages` directory add a new file called `_app.tsx` and add the following content. Save your file
```js
import type { AppProps } from 'next/app';

//Import the CSS required for Plasmic PDF Viewer (from react-pdf) globally
import "react-pdf/dist/Page/AnnotationLayer.css"; // the annotation layer css ensures annotations are styled correctly overlaying the document
import "react-pdf/dist/Page/TextLayer.css"; // the text layer css ensures selectable text is styled correctly overlaying the document

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```
7. In terminal: `npm run dev` to start your Dev server


### 03 - in Plasmic web interface
1. Configure you Custom App host to point to http://localhost:3000/plasmic-host
2. When the page reloads, the registered components should be available in Add component -> Custom Components

## Installation section 2: pre-built Plasmic user interface component
This section gives instructions on how to import into your project a pre-built user interface built in Plasmic that uses the Pdf Viewer code components (see Installation section 1).

We're importing from [this example project](https://studio.plasmic.app/projects/fRdq7wprjh6Nr2UN9idWsy/) ([live link](https://plasmic-pdf-viewer-component-library.vercel.app/)).

1. Make sure you've already completed Installation section 1
2. Open your plasmic project in Plasmic studio
3. In the left sidebar, go to More (circle with 3 horizontal dots) and then `Imported Projects`
4. Click `+ Import` and copy this project ID in `fRdq7wprjh6Nr2UN9idWsy`
5. If you get a popup about breakpoints, select `Keep using my existing breakpoints`.
6. On any page in your project, click the `+` component button and add the `PdfViewer` component to your page (found under "Imported Packages" -> `Plasmic-pdf-viewer Plasmic component library`)
7. Click on the new `PdfViewer` component on your page, find it's Props and copy an example PDF into it (eg https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK). Your PDF should show on the page.
8. Now, go back to "More" -> "Imported Projects" and remove the package called `Plasmic-pdf-viewer Plasmic component library` by clicking the 3 dots to the right of that package and selecting `Remove imported project`
9. Click "Confirm" in the popup
10. The `PdfViewer` component has now been copied to your project. You'll find it under the "Components" section as if you'd created it directly within your project. You're free to edit the `PdfViewer` component as you see fit.

## Dev notes
* To test locally:
    1. In this plasmic-pdf-viewer repo:
        1. run `npm run build`
        2. run `npm pack` to create a tarball of the package (eg `plasmic-pdf-viewer-0.0.1.tgz`) (important: `npm link` does NOT work due to react conflicts)
    2. In your local Plasmic nextjs project, 
        1. run `npm install /path/to/plasmic-pdf-viewer-0.0.1.tgz` to install the package
        2. run `npm run dev` to start the dev server
* To retest a new version of local package locally
    1. Follow step 1 above
    2. In your local plasmic nextjs project:
        1. Stop your dev server
        2. run `npm uninstall plasmic-pdf-viewer` 
        3. Clear nextjs cache by deleting `.next` folder
        4. (usually not needed): clear node cache `npm cache clean --force`
        5. run `npm install /path/to/plasmic-pdf-viewer-0.0.1.tgz`
        6. run `npm run dev` to start the dev server
* To publish this package to npm:
    1. Update the version in `package.json`
    2. Update changelog
    3. Push all changes to github
    4. Run npm publish
    5. In github user interface: create a new release & tag with same version number


