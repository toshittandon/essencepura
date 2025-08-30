import { Helmet } from 'react-helmet-async';
import { baseSEO } from '@/utils/seo';

/**
 * SEOHead Component - Manages all SEO meta tags for pages
 * 
 * Usage:
 * import { SEOHead } from '@/components/SEOHead';
 * import { getSEOData } from '@/utils/seo';
 * 
 * const seoData = getSEOData('home');
 * <SEOHead {...seoData} />
 * 
 * For products:
 * const seoData = getProductSEOData(product);
 * <SEOHead {...seoData} />
 */

export const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  noIndex = false,
  structuredData = null,
  productData = null,
  customMeta = []
}) => {
  // Ensure absolute URLs for images
  const absoluteImage = image?.startsWith('http') ? image : `${baseSEO.siteUrl}${image}`;
  const absoluteUrl = url || baseSEO.siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={baseSEO.author} />
      <link rel="canonical" href={absoluteUrl} />
      
      {/* Robots Meta */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:type" content={productData ? "product" : "website"} />
      <meta property="og:site_name" content={baseSEO.siteName} />
      
      {/* Product-specific Open Graph tags */}
      {productData && (
        <>
          <meta property="product:price:amount" content={productData.price} />
          <meta property="product:price:currency" content="USD" />
          <meta property="product:availability" content={productData.availability} />
          <meta property="product:category" content={productData.category} />
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={baseSEO.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      
      {/* Custom Meta Tags */}
      {customMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;