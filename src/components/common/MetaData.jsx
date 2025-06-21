import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function MetaData({ meta }) {
  console.log("Meta data passed:", meta);

  if (!meta || !meta.title) {
    return null; // Early return if meta data is not available
  }
  //let ogImageTag = document.querySelector('meta[property="og:image"]');
  //ogImageTag.setAttribute('content', "https://www.nearestate.in/uploads/gallery/PROP-5260254.jpg");
  // const schemaData = {
  //   "@context": "https://schema.org",
  //   "@type": "SiteNavigationElement",
  //   "url": "https://www.nearestate.in/2bhk-g+1-independent-house-for-sale-in-boduppal-hyderabad/r2mC",
  //   "name": meta.title
  // };

  return (
    <HelmetProvider>
      <Helmet>
        {/* <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script> */}
        <title>{meta.title}</title>
        <link rel="canonical" href={location.href} />
        <meta name="description" content={meta.title} />
      </Helmet>
    </HelmetProvider>
  );
}