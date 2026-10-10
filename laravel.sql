-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 09, 2026 at 07:59 AM
-- Server version: 8.4.11
-- PHP Version: 8.3.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medium_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `summary`, `content`, `cover_image`, `medium_url`, `linkedin_url`, `tags`, `status`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Optimizing PageSpeed, LCP & Core Web Vitals', 'optimizing-pagespeed-lcp-core-web-vitals', 'Website performance is more than just achieving a high score in Google PageSpeed Insights. A fast website improves user experience, reduces waiting time, and helps visitors interact with your website more smoothly.\n\nPerformance can also influence the overall page experience and SEO. The goal is not simply to achieve a perfect score, but to build a website that loads quickly, responds quickly, and remains visually stable.', '<p>\n    Performance can also contribute to a good overall page experience.\n    Google uses Core Web Vitals as part of its ranking systems, but a good\n    PageSpeed score or good Core Web Vitals do not guarantee higher rankings.\n    Relevant, helpful content and other search signals still matter.\n</p>\n\n<p>\n    The goal should not be to chase a perfect score. The goal is to build a\n    website that loads quickly, responds quickly, remains visually stable,\n    and provides a good experience for real users.\n</p>\n\n<p>\n    <a\n        href=\"https://pagespeed.web.dev/\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n    >\n        Check your website with Google PageSpeed Insights →\n    </a>\n</p>\n\n<hr>\n\n<h2>What Are Core Web Vitals?</h2>\n\n<p>\n    Core Web Vitals are a set of user-focused metrics that measure important\n    aspects of a webpage experience: loading performance, interactivity,\n    and visual stability.\n</p>\n\n<p>\n    The current Core Web Vitals are <strong>LCP</strong>,\n    <strong>INP</strong>, and <strong>CLS</strong>.\n</p>\n\n<h3>LCP — Largest Contentful Paint</h3>\n\n<p>\n    LCP measures loading performance by measuring when the largest content\n    element visible within the viewport is rendered.\n</p>\n\n<p>\n    For a good user experience, aim for an LCP of\n    <strong>2.5 seconds or less</strong>.\n</p>\n\n<h3>INP — Interaction to Next Paint</h3>\n\n<p>\n    INP measures how responsive a page is to user interactions. It helps\n    identify experiences where clicks, taps, or keyboard interactions take\n    too long to produce a visual response.\n</p>\n\n<p>\n    A good INP is <strong>200 milliseconds or less</strong>.\n</p>\n\n<h3>CLS — Cumulative Layout Shift</h3>\n\n<p>\n    CLS measures visual stability. It tracks unexpected movement of visible\n    content while a page is loading or changing.\n</p>\n\n<p>\n    A good CLS score is <strong>0.1 or less</strong>.\n</p>\n\n<h3>How Are Core Web Vitals Evaluated?</h3>\n\n<p>\n    Core Web Vitals are primarily real-user, or field, metrics. Google\n    generally evaluates them at the <strong>75th percentile</strong> of\n    page visits, segmented across mobile and desktop.\n</p>\n\n<p>\n    This means that optimizing only your own development machine is not\n    enough. A website should perform well across different devices,\n    browsers, network conditions, and real-world users.\n</p>\n\n<p>\n    <a\n        href=\"https://developers.google.com/search/docs/appearance/core-web-vitals\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n    >\n        Learn more about Core Web Vitals and Google Search →\n    </a>\n</p>\n\n<hr>\n\n<h2>Why Does Website Performance Matter?</h2>\n\n<p>\n    Website performance affects much more than a PageSpeed score.\n    A faster and more stable website can provide:\n</p>\n\n<ul>\n    <li>Better user experience</li>\n    <li>Faster access to important content</li>\n    <li>Better mobile usability</li>\n    <li>More responsive interactions</li>\n    <li>Fewer visual disruptions</li>\n    <li>Better conversion opportunities</li>\n    <li>A stronger overall page experience</li>\n</ul>\n\n<p>\n    Performance also matters for SEO and search visibility, but it is\n    important to understand the relationship correctly.\n</p>\n\n<p>\n    <strong>\n        A perfect PageSpeed score does not automatically mean better Google\n        rankings.\n    </strong>\n</p>\n\n<p>\n    Google considers many signals, including the relevance and usefulness\n    of content. Core Web Vitals are part of Google\'s page experience and\n    ranking systems, but they are not a replacement for good content,\n    technical SEO, accessibility, and a well-built website.\n</p>\n\n<hr>\n\n<h2>PageSpeed Insights: What Does It Actually Measure?</h2>\n\n<p>\n    Google PageSpeed Insights provides both <strong>lab data</strong> and\n    <strong>real-world field data</strong>.\n</p>\n\n<ul>\n    <li>\n        <strong>Lab data:</strong> Generated using Lighthouse in a controlled,\n        simulated environment. It is useful for debugging and finding\n        performance opportunities during development.\n    </li>\n\n    <li>\n        <strong>Field data:</strong> Based on real-user experiences collected\n        through the Chrome User Experience Report (CrUX), when data is\n        available.\n    </li>\n</ul>\n\n<p>\n    This is why your PageSpeed report and the experience of a real visitor\n    may not always show exactly the same numbers.\n</p>\n\n<p>\n    PageSpeed Insights also provides audits and recommendations across\n    areas such as Performance, Accessibility, Best Practices, and SEO.\n</p>\n\n<hr>\n\n<h2>How I Approach Website Performance Optimization</h2>\n\n<h3>1. Optimize Images for Performance</h3>\n\n<p>\n    Images are often among the largest resources downloaded by a webpage.\n    Oversized or incorrectly optimized images can increase page weight,\n    delay loading, and affect LCP.\n</p>\n\n<p>\n    Image optimization is therefore one of the first areas I investigate\n    when improving website performance.\n</p>\n\n<h4>Use Modern Image Formats</h4>\n\n<p>\n    Modern formats such as <strong>WebP</strong> and\n    <strong>AVIF</strong> can often provide smaller files while maintaining\n    good visual quality.\n</p>\n\n<p>\n    The important principle is to deliver an appropriately sized,\n    high-quality image without sending unnecessary bytes to the browser.\n</p>\n\n<h4>Use the &lt;picture&gt; Element When Appropriate</h4>\n\n<p>\n    The <code>&lt;picture&gt;</code> element is useful when you need to\n    provide different image formats or different image sources depending\n    on browser capabilities, screen characteristics, or art direction.\n</p>\n\n<pre><code>&lt;picture&gt;\n    &lt;source\n        srcset=\"/images/hero.avif\"\n        type=\"image/avif\"\n    &gt;\n\n    &lt;source\n        srcset=\"/images/hero.webp\"\n        type=\"image/webp\"\n    &gt;\n\n    &lt;img\n        src=\"/images/hero.jpg\"\n        width=\"1200\"\n        height=\"700\"\n        alt=\"Website performance dashboard\"\n    &gt;\n&lt;/picture&gt;</code></pre>\n\n<p>\n    The browser can choose a supported source, while the\n    <code>&lt;img&gt;</code> element provides the fallback.\n</p>\n\n<p>\n    The <code>&lt;picture&gt;</code> element is especially useful when you\n    need different crops or compositions for different screen sizes.\n</p>\n\n<h4>Use srcset and sizes for Responsive Images</h4>\n\n<p>\n    You do not always need <code>&lt;picture&gt;</code>. When you have\n    different sizes of the same image, <code>srcset</code> and\n    <code>sizes</code> on an <code>&lt;img&gt;</code> element are often\n    the appropriate solution.\n</p>\n\n<pre><code>&lt;img\n    src=\"/images/product-800.webp\"\n    srcset=\"\n        /images/product-400.webp 400w,\n        /images/product-800.webp 800w,\n        /images/product-1200.webp 1200w\n    \"\n    sizes=\"\n        (max-width: 600px) 100vw,\n        (max-width: 1200px) 50vw,\n        600px\n    \"\n    width=\"1200\"\n    height=\"800\"\n    alt=\"Product image\"\n&gt;</code></pre>\n\n<p>\n    This allows the browser to choose an appropriate image resource based\n    on the device and available display size rather than downloading the\n    largest image for every visitor.\n</p>\n\n<h4>Always Provide Image Dimensions</h4>\n\n<p>\n    When the dimensions are known, provide <code>width</code> and\n    <code>height</code> attributes.\n</p>\n\n<pre><code>&lt;img\n    src=\"/images/product.webp\"\n    width=\"800\"\n    height=\"600\"\n    alt=\"Product image\"\n&gt;</code></pre>\n\n<p>\n    Providing dimensions allows the browser to reserve space for the image\n    before it finishes loading. This helps reduce unexpected layout\n    movement and can improve <strong>CLS</strong>.\n</p>\n\n<h4>Lazy Load Below-the-Fold Images</h4>\n\n<p>\n    Images that are outside the initial viewport can often be lazy loaded.\n    This allows the browser to prioritize resources required for the\n    initial page view.\n</p>\n\n<pre><code>&lt;img\n    src=\"/images/gallery.webp\"\n    width=\"800\"\n    height=\"600\"\n    loading=\"lazy\"\n    alt=\"Gallery image\"\n&gt;</code></pre>\n\n<p>\n    However, lazy loading should not be applied blindly to every image.\n</p>\n\n<p>\n    <strong>\n        Avoid lazy-loading important above-the-fold images, especially an\n        image that is likely to be the LCP element.\n    </strong>\n</p>\n\n<h4>Prioritize the LCP Image Carefully</h4>\n\n<p>\n    If the main hero image is the LCP element, make sure the browser can\n    discover it early and give it appropriate priority.\n</p>\n\n<pre><code>&lt;img\n    src=\"/images/hero.webp\"\n    width=\"1200\"\n    height=\"700\"\n    fetchpriority=\"high\"\n    alt=\"Website performance dashboard\"\n&gt;</code></pre>\n\n<p>\n    <code>fetchpriority=\"high\"</code> can provide the browser with a hint\n    that an important image should receive higher priority.\n</p>\n\n<p>\n    This should be used selectively. Marking too many resources as high\n    priority can reduce the benefit of prioritization.\n</p>\n\n<h4>Use Meaningful Alt Text</h4>\n\n<p>\n    The <code>alt</code> attribute provides alternative text for users who\n    cannot see an image and also helps search engines understand the image.\n</p>\n\n<pre><code>&lt;img\n    src=\"/images/doctor-dashboard.webp\"\n    width=\"1200\"\n    height=\"700\"\n    alt=\"Doctor appointment dashboard showing today\'s patient queue\"\n&gt;</code></pre>\n\n<p>\n    Write alt text that describes the actual image or its purpose in\n    context. Do not use the alt attribute as a place to stuff keywords.\n</p>\n\n<h4>Use HTML Images for Important Content</h4>\n\n<p>\n    If an image is meaningful content, use an HTML\n    <code>&lt;img&gt;</code> element instead of relying only on a CSS\n    background image.\n</p>\n\n<p>Prefer:</p>\n\n<pre><code>&lt;img\n    src=\"/images/team.webp\"\n    width=\"1200\"\n    height=\"700\"\n    alt=\"Development team working together\"\n&gt;</code></pre>\n\n<p>\n    Google can discover images from the <code>src</code> attribute of\n    standard HTML image elements, including images inside\n    <code>&lt;picture&gt;</code>. Google does not index CSS images in the\n    same way.\n</p>\n\n<h4>Use Descriptive Image Filenames</h4>\n\n<p>\n    Image filenames can provide additional context about the subject of\n    an image.\n</p>\n\n<p>Prefer:</p>\n\n<pre><code>doctor-appointment-dashboard.webp</code></pre>\n\n<p>Instead of:</p>\n\n<pre><code>IMG00023.webp</code></pre>\n\n<p>\n    Keep filenames short, descriptive, and relevant to the actual image.\n</p>\n\n<h4>Compress and Resize Images Before Uploading</h4>\n\n<p>\n    Do not upload a 4000px-wide image when the website only needs to display\n    it at 800px. Resize the source appropriately and compress it before\n    serving it.\n</p>\n\n<ul>\n    <li>Resize oversized images</li>\n    <li>Compress image files</li>\n    <li>Use WebP or AVIF where appropriate</li>\n    <li>Generate multiple image sizes when necessary</li>\n    <li>Use <code>srcset</code> and <code>sizes</code> for responsive images</li>\n    <li>Use <code>&lt;picture&gt;</code> when different sources are needed</li>\n    <li>Lazy-load appropriate below-the-fold images</li>\n    <li>Do not lazy-load the main LCP image</li>\n    <li>Provide image dimensions</li>\n    <li>Use meaningful alt text</li>\n    <li>Use descriptive filenames</li>\n</ul>\n\n<p>\n    <a\n        href=\"https://web.dev/learn/performance/image-performance\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n    >\n        Read the web.dev Image Performance Guide →\n    </a>\n</p>\n\n<hr>\n\n<h3>2. Optimize CSS</h3>\n\n<p>\n    CSS is generally a render-blocking resource. The browser needs to\n    download and process the required CSS before it can render the page.\n</p>\n\n<p>\n    Large or unnecessary stylesheets can therefore delay the initial\n    rendering of a page.\n</p>\n\n<ul>\n    <li>Remove genuinely unused CSS</li>\n    <li>Minify production CSS</li>\n    <li>Split large stylesheets when appropriate</li>\n    <li>Keep critical styles lean</li>\n    <li>Avoid shipping large framework styles that are not needed</li>\n    <li>Load stylesheets as early as possible</li>\n    <li>Use media queries appropriately for conditional CSS</li>\n</ul>\n\n<p>\n    For example:\n</p>\n\n<pre><code>&lt;link\n    rel=\"stylesheet\"\n    href=\"/css/app.min.css\"\n&gt;</code></pre>\n\n<p>\n    Avoid loading a large CSS bundle on every page when a significant\n    portion of it is never used. Chrome DevTools Coverage can help identify\n    CSS that is not being used on a particular page.\n</p>\n\n<h4>Critical CSS</h4>\n\n<p>\n    For some websites, critical CSS can be used to deliver the styles\n    required for the initial viewport quickly while loading the remaining\n    styles separately.\n</p>\n\n<p>\n    This is an advanced optimization and should be measured carefully.\n    Inlining too much CSS can increase the size of the initial HTML and\n    reduce caching benefits.\n</p>\n\n<hr>\n\n<h3>3. Optimize JavaScript</h3>\n\n<p>\n    JavaScript can consume main-thread time and delay user interactions.\n    Large scripts, long-running tasks, unnecessary libraries, and\n    third-party scripts can all affect responsiveness and INP.\n</p>\n\n<p>\n    For scripts that are not required to execute before the document is\n    parsed, <code>defer</code> can be useful:\n</p>\n\n<pre><code>&lt;script\n    src=\"/js/app.js\"\n    defer\n&gt;&lt;/script&gt;</code></pre>\n\n<ul>\n    <li>Remove unused JavaScript</li>\n    <li>Minify production bundles</li>\n    <li>Code-split large applications</li>\n    <li>Defer non-critical scripts</li>\n    <li>Reduce unnecessary third-party scripts</li>\n    <li>Break up long-running JavaScript tasks</li>\n    <li>Avoid unnecessary DOM operations</li>\n</ul>\n\n<p>\n    JavaScript optimization is especially important for\n    <strong>INP</strong>, because excessive main-thread work can make\n    interactions feel slow.\n</p>\n\n<hr>\n\n<h3>4. Optimize Fonts</h3>\n\n<p>\n    Fonts can add network requests and increase the amount of data that\n    needs to be downloaded before text is displayed correctly.\n</p>\n\n<p>\n    Use only the font families and weights that your design actually needs.\n    When self-hosting fonts, <strong>WOFF2</strong> is a modern and widely\n    supported format.\n</p>\n\n<pre><code>@font-face {\n    font-family: \"MyFont\";\n    src: url(\"/fonts/my-font.woff2\") format(\"woff2\");\n    font-display: swap;\n}</code></pre>\n\n<ul>\n    <li>Use WOFF2 where appropriate</li>\n    <li>Reduce unnecessary font families</li>\n    <li>Reduce unnecessary font weights</li>\n    <li>Subset fonts when practical</li>\n    <li>Consider self-hosting fonts where appropriate</li>\n    <li>Use <code>font-display: swap</code> when appropriate</li>\n    <li>Avoid loading font files that are never used</li>\n</ul>\n\n<hr>\n\n<h3>5. Prevent Layout Shifts</h3>\n\n<p>\n    CLS problems often occur when the browser does not know how much space\n    an image, video, advertisement, or dynamically inserted element will\n    require.\n</p>\n\n<p>Instead of:</p>\n\n<pre><code>&lt;img src=\"/image.webp\" alt=\"Product\"&gt;</code></pre>\n\n<p>provide dimensions:</p>\n\n<pre><code>&lt;img\n    src=\"/image.webp\"\n    width=\"800\"\n    height=\"500\"\n    alt=\"Product\"\n&gt;</code></pre>\n\n<p>\n    You should also reserve space for dynamic content such as ads,\n    embedded media, banners, and asynchronously loaded components.\n</p>\n\n<ul>\n    <li>Set image width and height</li>\n    <li>Reserve space for advertisements</li>\n    <li>Reserve space for embedded content</li>\n    <li>Avoid inserting content above existing content unexpectedly</li>\n    <li>Be careful when dynamically changing dimensions</li>\n</ul>\n\n<hr>\n\n<h3>6. Improve Server Response Time and TTFB</h3>\n\n<p>\n    Frontend optimization is not enough if the server takes too long to\n    return the initial document.\n</p>\n\n<p>\n    <strong>TTFB — Time to First Byte</strong> is useful when investigating\n    how quickly the server begins responding.\n</p>\n\n<p>When investigating slow server response, check:</p>\n\n<ul>\n    <li>Server processing time</li>\n    <li>Database queries</li>\n    <li>Slow API calls</li>\n    <li>PHP or Laravel application performance</li>\n    <li>WordPress plugins and database queries</li>\n    <li>Server configuration</li>\n    <li>Page and object caching</li>\n    <li>CDN configuration</li>\n    <li>Hosting resources</li>\n    <li>Redirect chains</li>\n</ul>\n\n<p>\n    A slow backend can delay the browser from discovering and downloading\n    important resources, which can make it harder to achieve a good LCP.\n</p>\n\n<hr>\n\n<h3>7. Use Effective Caching</h3>\n\n<p>\n    Browser and server-side caching can reduce repeated work and prevent\n    visitors from downloading the same static resources unnecessarily.\n</p>\n\n<p>\n    Static assets such as CSS, JavaScript, images, fonts, and SVG files can\n    generally be cached with appropriate cache headers.\n</p>\n\n<pre><code>app.css\napp.js\nhero.webp\nlogo.svg\nfont.woff2</code></pre>\n\n<p>\n    Versioned or fingerprinted asset names are useful when using long cache\n    lifetimes:\n</p>\n\n<pre><code>app.8f32a.css\napp.91a7d.js</code></pre>\n\n<p>\n    When the asset changes, the filename can change as well, allowing the\n    browser to safely fetch the new version.\n</p>\n\n<hr>\n\n<h3>8. Reduce Third-Party Scripts</h3>\n\n<p>\n    Analytics, chat widgets, advertising scripts, tracking tools, social\n    embeds, and other third-party resources can add network requests and\n    JavaScript execution to your page.\n</p>\n\n<p>\n    Review every third-party script and ask whether it is actually needed.\n</p>\n\n<ul>\n    <li>Remove unnecessary third-party scripts</li>\n    <li>Load non-critical integrations later</li>\n    <li>Review third-party JavaScript execution time</li>\n    <li>Avoid loading the same library multiple times</li>\n    <li>Check whether widgets are needed on every page</li>\n</ul>\n\n<p>\n    Reducing unnecessary third-party work can help improve loading\n    performance and responsiveness.\n</p>\n\n<hr>\n\n<h3>9. Optimize for Mobile</h3>\n\n<p>\n    A website that performs well on a powerful desktop can behave very\n    differently on a mobile device or slower network.\n</p>\n\n<p>\n    Always test both <strong>mobile</strong> and\n    <strong>desktop</strong> experiences.\n</p>\n\n<ul>\n    <li>Test on mobile devices</li>\n    <li>Test slower network conditions</li>\n    <li>Serve appropriately sized images</li>\n    <li>Reduce unnecessary JavaScript</li>\n    <li>Check mobile Core Web Vitals</li>\n    <li>Test real-user data when available</li>\n</ul>\n\n<hr>\n\n<h2>Which Image Technique Should You Use?</h2>\n\n<h3>Which Image Technique Should You Use?</h3>\n\n<p>\n    <strong>Different image formats</strong> — Use the Picture element with\n    Source elements to provide modern formats such as AVIF and WebP with\n    suitable fallbacks.\n</p>\n\n<p>\n    <strong>Different crops for mobile and desktop</strong> — Use the Picture\n    element with responsive media conditions when mobile and desktop need\n    different image compositions.\n</p>\n\n<p>\n    <strong>Different sizes of the same image</strong> — Use responsive image\n    sources with srcset and sizes so the browser can select an appropriate\n    image size.\n</p>\n\n<p>\n    <strong>Images below the fold</strong> — Use lazy loading for images that\n    are not immediately visible.\n</p>\n\n<p>\n    <strong>Main LCP / hero image</strong> — Avoid lazy loading the primary\n    LCP image. Consider giving it higher loading priority when appropriate.\n</p>\n\n<p>\n    <strong>Prevent layout shifts</strong> — Provide explicit image width and\n    height so the browser can reserve the required space before the image\n    loads.\n</p>\n\n<p>\n    <strong>Image accessibility</strong> — Use meaningful alternative text\n    that describes the purpose or content of the image.\n</p>\n\n<p>\n    <strong>Image discoverability</strong> — Use standard HTML image elements\n    for meaningful images so they can be properly discovered and understood.\n</p>\n\n<hr>\n\n<h2>My Performance Optimization Checklist</h2>\n\n<ol>\n    <li>Run PageSpeed Insights on the target page</li>\n    <li>Check both lab and field data when available</li>\n    <li>Identify the LCP element</li>\n    <li>Optimize the LCP resource</li>\n    <li>Optimize and resize images</li>\n    <li>Use responsive images with <code>srcset</code> and <code>sizes</code></li>\n    <li>Use <code>&lt;picture&gt;</code> when different sources are needed</li>\n    <li>Lazy-load appropriate below-the-fold images</li>\n    <li>Reserve dimensions for images and dynamic content</li>\n    <li>Remove genuinely unused CSS</li>\n    <li>Keep critical CSS lean</li>\n    <li>Optimize JavaScript and reduce long tasks</li>\n    <li>Reduce unnecessary third-party scripts</li>\n    <li>Optimize fonts and reduce unnecessary font files</li>\n    <li>Improve server response time and TTFB</li>\n    <li>Use effective browser and server caching</li>\n    <li>Test mobile and desktop performance</li>\n    <li>Monitor real-user Core Web Vitals</li>\n</ol>\n\n<hr>\n\n<h2>Performance Optimization Workflow</h2>\n\n<pre><code>PageSpeed Analysis\n        ↓\nCheck Lab + Field Data\n        ↓\nIdentify LCP / INP / CLS Issues\n        ↓\nOptimize Images\n        ↓\nOptimize CSS\n        ↓\nOptimize JavaScript\n        ↓\nOptimize Fonts\n        ↓\nReduce Third-Party Work\n        ↓\nImprove Server Response / TTFB\n        ↓\nEnable Effective Caching\n        ↓\nPrevent Layout Shifts\n        ↓\nTest Mobile + Desktop\n        ↓\nMonitor Real User Data\n        ↓\nRepeat</code></pre>\n\n<hr>\n\n<h2>Tools I Use</h2>\n\n<p>\n    <strong>Google PageSpeed Insights</strong> — Analyze website performance\n    and Core Web Vitals using lab data and, when available, real-user data.\n</p>\n\n<p>\n    <strong>web.dev Performance</strong> — Learn performance concepts,\n    optimization techniques, and modern web performance best practices.\n</p>\n\n<p>\n    <strong>web.dev Image Performance</strong> — Practical guidance for\n    optimizing image formats, sizing, compression, responsive images,\n    and loading behavior.\n</p>\n\n<p>\n    <strong>Chrome DevTools</strong> — Inspect network requests, CSS,\n    JavaScript, rendering, performance, and resource usage.\n</p>\n\n<p>\n    <strong>Lighthouse</strong> — Run lab-based audits for performance,\n    accessibility, best practices, and SEO.\n</p>\n\n<p>\n    <strong>Google Search Console</strong> — Monitor Core Web Vitals,\n    search performance, and available real-user page experience data.\n</p>\n\n<hr>\n\n<h2>Final Thoughts</h2>\n\n<p>\n    Performance optimization is not about blindly chasing a\n    <strong>100/100 PageSpeed score</strong>.\n</p>\n\n<p>\n    The real goal is to build a website that\n    <strong>\n        loads quickly, responds quickly, remains visually stable,\n        and works well for real users\n    </strong>\n    across different devices and network conditions.\n</p>\n\n<p>\n    Start with the biggest bottleneck — whether it is an oversized image,\n    render-blocking CSS, JavaScript execution, fonts, server response time,\n    database queries, or third-party resources.\n</p>\n\n<p>\n    Measure the problem, make a focused improvement, test again, and monitor\n    the real-world result.\n</p>\n\n<p>\n    <strong>Measure → Optimize → Test → Monitor → Repeat.</strong>\n</p>', NULL, NULL, NULL, '[\"PageSpeed\", \"LCP\", \"Frontend\", \"Performance\"]', 'published', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '2026-08-03 11:38:26'),
(2, 'Deploying Dockerized Laravel Apps on Hostinger VPS with Plesk & Cloudflare', 'deploying-docker-laravel-hostinger-vps-plesk', 'Deploying a Laravel application is more than simply uploading files to a server. A production application needs a reliable environment for PHP, the database, web server, queues, storage, environment variables, and domain routing.', '<p>\n    In my deployment workflows, I used a\n    <strong>Hostinger VPS with Docker, Docker Compose, Plesk, and Cloudflare</strong>\n    to run a containerized Laravel application while keeping domain and server\n    management straightforward.\n</p>\n\n<p>\n    This approach makes it possible to keep the application environment\n    isolated and reproducible while using Plesk for server and domain\n    management.\n</p>\n\n<hr>\n\n<h2>Why Dockerize a Laravel Application?</h2>\n\n<p>\n    A Laravel application usually depends on multiple services and system\n    requirements such as PHP, PHP extensions, Nginx, MySQL, Redis, queues,\n    scheduled tasks, and other supporting services.\n</p>\n\n<p>\n    Installing everything directly on a VPS can make deployments difficult to\n    reproduce and maintain.\n</p>\n\n<p>\n    Docker allows these services to run in isolated containers with clearly\n    defined configurations.\n</p>\n\n<ul>\n    <li>Consistent development and production environments</li>\n    <li>Isolated application dependencies</li>\n    <li>Easy service management with Docker Compose</li>\n    <li>Simple application rebuilds and deployments</li>\n    <li>Better separation between application services</li>\n    <li>More predictable server configuration</li>\n</ul>\n\n<hr>\n\n<h2>Deployment Architecture</h2>\n\n<p>\n    The basic architecture can be organized like this:\n</p>\n\n<pre><code>Domain\n   |\n   v\nCloudflare DNS\n   |\n   v\nHostinger VPS\n   |\n   v\nPlesk / Web Routing\n   |\n   v\nDocker\n   |\n   +----------------------+\n   |                      |\n   v                      v\nNginx                  PHP-FPM\n   |                      |\n   +----------+-----------+\n              |\n              v\n           Laravel\n              |\n              v\n            MySQL</code></pre>\n\n<p>\n    Each layer has a specific responsibility. Cloudflare handles DNS and\n    optional edge-level services, Plesk provides server and domain management,\n    Docker manages the application services, and Laravel runs inside the\n    application container environment.\n</p>\n\n<hr>\n\n<h2>1. Prepare the Laravel Application</h2>\n\n<p>\n    Before deploying, make sure the Laravel application is production-ready.\n    The application should have the correct environment configuration,\n    dependencies, database migrations, storage configuration, and application\n    key.\n</p>\n\n<p>\n    Install production dependencies:\n</p>\n\n<pre><code>composer install --no-dev --optimize-autoloader</code></pre>\n\n<p>\n    Build frontend assets if the application uses Vite or another frontend\n    build process:\n</p>\n\n<pre><code>npm install\nnpm run build</code></pre>\n\n<p>\n    The production environment should never rely on local development\n    configuration.\n</p>\n\n<hr>\n\n<h2>2. Create the Dockerfile</h2>\n\n<p>\n    The Dockerfile defines the environment required to run the Laravel\n    application.\n</p>\n\n<p>\n    A simplified PHP-FPM Dockerfile can look like this:\n</p>\n\n<pre><code>FROM php:8.3-fpm\n\nWORKDIR /var/www\n\nRUN apt-get update &amp;&amp; apt-get install -y \\\n    git \\\n    unzip \\\n    libzip-dev \\\n    libpng-dev \\\n    libonig-dev \\\n    libxml2-dev \\\n    &amp;&amp; docker-php-ext-install \\\n    pdo_mysql \\\n    mbstring \\\n    exif \\\n    pcntl \\\n    bcmath \\\n    gd \\\n    zip\n\nCOPY --from=composer:2 /usr/bin/composer /usr/bin/composer\n\nCOPY . .\n\nRUN composer install \\\n    --no-dev \\\n    --optimize-autoloader\n\nRUN chown -R www-data:www-data \\\n    storage \\\n    bootstrap/cache\n\nEXPOSE 9000\n\nCMD [\"php-fpm\"]</code></pre>\n\n<p>\n    The exact PHP extensions should be adjusted according to the Laravel\n    application\'s requirements.\n</p>\n\n<hr>\n\n<h2>3. Configure Docker Compose</h2>\n\n<p>\n    Docker Compose can be used to define the application services together.\n    A typical setup can contain Laravel/PHP-FPM, Nginx, and MySQL.\n</p>\n\n<pre><code>services:\n\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    container_name: laravel_app\n    restart: unless-stopped\n    working_dir: /var/www\n    volumes:\n      - ./:/var/www\n    networks:\n      - laravel\n\n  nginx:\n    image: nginx:alpine\n    container_name: laravel_nginx\n    restart: unless-stopped\n    ports:\n      - \"8080:80\"\n    volumes:\n      - ./:/var/www\n      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf\n    depends_on:\n      - app\n    networks:\n      - laravel\n\n  mysql:\n    image: mysql:8.0\n    container_name: laravel_mysql\n    restart: unless-stopped\n    environment:\n      MYSQL_DATABASE: laravel\n      MYSQL_USER: laravel\n      MYSQL_PASSWORD: change-this-password\n      MYSQL_ROOT_PASSWORD: change-this-root-password\n    volumes:\n      - mysql_data:/var/lib/mysql\n    networks:\n      - laravel\n\nnetworks:\n  laravel:\n\nvolumes:\n  mysql_data:</code></pre>\n\n<p>\n    In a real production deployment, passwords and other sensitive values\n    should be stored securely rather than committed to source control.\n</p>\n\n<hr>\n\n<h2>4. Configure Nginx</h2>\n\n<p>\n    Nginx handles incoming HTTP requests and forwards PHP requests to the\n    PHP-FPM container.\n</p>\n\n<p>\n    A basic configuration can look like this:\n</p>\n\n<pre><code>server {\n    listen 80;\n    server_name example.com www.example.com;\n\n    root /var/www/public;\n    index index.php index.html;\n\n    location / {\n        try_files $uri $uri/ /index.php?$query_string;\n    }\n\n    location ~ \\.php$ {\n        try_files $uri =404;\n\n        fastcgi_pass app:9000;\n        fastcgi_index index.php;\n\n        include fastcgi_params;\n\n        fastcgi_param SCRIPT_FILENAME\n            $document_root$fastcgi_script_name;\n    }\n\n    location ~ /\\.(?!well-known).* {\n        deny all;\n    }\n}</code></pre>\n\n<p>\n    The important part is that Nginx passes PHP requests to the PHP-FPM\n    service using the Docker service name.\n</p>\n\n<pre><code>fastcgi_pass app:9000;</code></pre>\n\n<hr>\n\n<h2>5. Configure Laravel Environment Variables</h2>\n\n<p>\n    The production environment needs its own configuration.\n</p>\n\n<pre><code>APP_NAME=\"Laravel Application\"\nAPP_ENV=production\nAPP_DEBUG=false\nAPP_URL=https://example.com\n\nDB_CONNECTION=mysql\nDB_HOST=mysql\nDB_PORT=3306\nDB_DATABASE=laravel\nDB_USERNAME=laravel\nDB_PASSWORD=your-secure-password</code></pre>\n\n<p>\n    Notice that the database host is the Docker Compose service name:\n</p>\n\n<pre><code>DB_HOST=mysql</code></pre>\n\n<p>\n    Containers communicate with each other through the Docker network, so\n    Laravel does not need to connect to MySQL using localhost.\n</p>\n\n<hr>\n\n<h2>6. Start the Docker Containers</h2>\n\n<p>\n    Once the Docker configuration is ready, build and start the services:\n</p>\n\n<pre><code>docker compose up -d --build</code></pre>\n\n<p>\n    Check whether the containers are running:\n</p>\n\n<pre><code>docker compose ps</code></pre>\n\n<p>\n    If a container is not behaving as expected, inspect its logs:\n</p>\n\n<pre><code>docker compose logs app\ndocker compose logs nginx\ndocker compose logs mysql</code></pre>\n\n<p>\n    Following logs is especially useful when troubleshooting PHP extensions,\n    permissions, database connections, or Nginx configuration issues.\n</p>\n\n<hr>\n\n<h2>7. Run Laravel Production Commands</h2>\n\n<p>\n    After the application containers are running, Laravel\'s production\n    configuration and caches can be prepared.\n</p>\n\n<pre><code>docker compose exec app php artisan key:generate\n\ndocker compose exec app php artisan migrate --force\n\ndocker compose exec app php artisan storage:link\n\ndocker compose exec app php artisan config:cache\n\ndocker compose exec app php artisan route:cache\n\ndocker compose exec app php artisan view:cache</code></pre>\n\n<p>\n    Only run commands such as migrations when you understand their effect on\n    the production database. Database backups should be part of the deployment\n    process.\n</p>\n\n<hr>\n\n<h2>8. Configure Plesk</h2>\n\n<p>\n    Plesk can be used as the management layer for the VPS, domains, DNS-related\n    configuration, SSL, and web hosting settings.\n</p>\n\n<p>\n    The basic workflow is:\n</p>\n\n<ol>\n    <li>Create or configure the domain in Plesk.</li>\n    <li>Configure the domain\'s DNS and routing.</li>\n    <li>Point the domain toward the VPS.</li>\n    <li>Configure the application/web server routing.</li>\n    <li>Enable HTTPS.</li>\n    <li>Verify that the domain reaches the Dockerized application.</li>\n</ol>\n\n<p>\n    The exact Plesk configuration depends on how Docker and the web server are\n    exposed on the VPS. The important point is to keep the public domain\n    routing separate from the internal Docker service communication.\n</p>\n\n<hr>\n\n<h2>9. Connect the Domain Through Cloudflare</h2>\n\n<p>\n    Cloudflare can be placed in front of the VPS to manage DNS and provide\n    additional edge-level services.\n</p>\n\n<p>\n    A basic DNS flow looks like:\n</p>\n\n<pre><code>User\n  |\n  v\nexample.com\n  |\n  v\nCloudflare DNS\n  |\n  v\nHostinger VPS\n  |\n  v\nPlesk / Web Server\n  |\n  v\nDockerized Laravel Application</code></pre>\n\n<p>\n    When configuring DNS, make sure the domain points to the correct server\n    and that the VPS firewall allows the required web traffic.\n</p>\n\n<hr>\n\n<h2>10. SSL and HTTPS</h2>\n\n<p>\n    Production Laravel applications should use HTTPS.\n</p>\n\n<p>\n    After the domain is correctly routed, configure an SSL certificate and\n    verify that the application works through:\n</p>\n\n<pre><code>https://example.com</code></pre>\n\n<p>\n    Also make sure Laravel\'s production URL matches the HTTPS domain:\n</p>\n\n<pre><code>APP_URL=https://example.com</code></pre>\n\n<p>\n    HTTPS is particularly important for applications handling authentication,\n    payments, APIs, and other sensitive requests.\n</p>\n\n<hr>\n\n<h2>11. File and Storage Permissions</h2>\n\n<p>\n    Laravel needs write access to specific directories.\n</p>\n\n<pre><code>storage/\nbootstrap/cache/</code></pre>\n\n<p>\n    For example:\n</p>\n\n<pre><code>docker compose exec app chown -R www-data:www-data storage bootstrap/cache\n\ndocker compose exec app chmod -R 775 storage bootstrap/cache</code></pre>\n\n<p>\n    Avoid giving the entire application directory unnecessary write\n    permissions. Permissions should be limited to the directories that\n    actually require them.\n</p>\n\n<hr>\n\n<h2>12. Laravel Queue Workers</h2>\n\n<p>\n    Applications that use queues for emails, notifications, background jobs,\n    or other asynchronous operations need a worker process running in\n    production.\n</p>\n\n<p>\n    A basic worker command is:\n</p>\n\n<pre><code>php artisan queue:work --tries=3 --timeout=90</code></pre>\n\n<p>\n    For a Dockerized application, the worker can also be defined as a separate\n    service in Docker Compose.\n</p>\n\n<pre><code>queue:\n  build:\n    context: .\n    dockerfile: Dockerfile\n  restart: unless-stopped\n  working_dir: /var/www\n  command: php artisan queue:work --tries=3 --timeout=90\n  volumes:\n    - ./:/var/www\n  depends_on:\n    - app\n  networks:\n    - laravel</code></pre>\n\n<p>\n    Separating workers from the web process makes it easier to scale and\n    monitor background workloads independently.\n</p>\n\n<hr>\n\n<h2>13. Laravel Scheduled Tasks</h2>\n\n<p>\n    Laravel applications may also require scheduled tasks for reminders,\n    cleanup jobs, reports, notifications, or recurring business processes.\n</p>\n\n<p>\n    The scheduler can be executed using:\n</p>\n\n<pre><code>php artisan schedule:run</code></pre>\n\n<p>\n    A production server can invoke this command periodically through a\n    scheduler such as cron.\n</p>\n\n<pre><code>* * * * * cd /var/www &amp;&amp; php artisan schedule:run &gt;&gt; /dev/null 2&gt;&amp;1</code></pre>\n\n<hr>\n\n<h2>14. Production Deployment Workflow</h2>\n\n<p>\n    Once the initial infrastructure is configured, deployments can follow a\n    predictable process.\n</p>\n\n<pre><code>Pull latest code\n      ↓\nInstall/update dependencies\n      ↓\nBuild frontend assets\n      ↓\nBuild Docker images\n      ↓\nStart updated containers\n      ↓\nRun database migrations\n      ↓\nClear and rebuild Laravel caches\n      ↓\nRestart queue workers\n      ↓\nCheck application logs\n      ↓\nTest website and APIs</code></pre>\n\n<p>\n    This makes deployments more repeatable and reduces the risk of manually\n    changing production servers.\n</p>\n\n<hr>\n\n<h2>15. Useful Docker Commands</h2>\n\n<p>\n    These are some of the commands I commonly use when managing a Dockerized\n    Laravel application.\n</p>\n\n<pre><code># Check running containers\ndocker compose ps\n\n# Start containers\ndocker compose up -d\n\n# Rebuild containers\ndocker compose up -d --build\n\n# Stop containers\ndocker compose down\n\n# View application logs\ndocker compose logs -f app\n\n# View Nginx logs\ndocker compose logs -f nginx\n\n# Enter Laravel container\ndocker compose exec app bash\n\n# Run Laravel migrations\ndocker compose exec app php artisan migrate --force\n\n# Clear Laravel caches\ndocker compose exec app php artisan optimize:clear\n\n# Rebuild Laravel caches\ndocker compose exec app php artisan optimize\n\n# Restart services\ndocker compose restart</code></pre>\n\n<hr>\n\n<h2>Common Deployment Challenges</h2>\n\n<h3>Docker and Port Conflicts</h3>\n\n<p>\n    Running multiple applications on the same VPS can create port conflicts.\n    Each application\'s public entry point needs a clear routing strategy.\n</p>\n\n<h3>Domain Routing</h3>\n\n<p>\n    Connecting a domain managed through Plesk to an application running inside\n    Docker requires careful routing between the public web server and the\n    internal container network.\n</p>\n\n<h3>Cloudflare DNS</h3>\n\n<p>\n    DNS records, proxy settings, SSL modes, and origin configuration need to\n    be consistent with the actual VPS and web-server setup.\n</p>\n\n<h3>Container Permissions</h3>\n\n<p>\n    Laravel storage and cache directories can produce errors when the\n    container user does not have the required permissions.\n</p>\n\n<h3>Environment Variables</h3>\n\n<p>\n    Production applications often fail because environment values are missing\n    or still point to local development services.\n</p>\n\n<h3>Database Connectivity</h3>\n\n<p>\n    Docker containers should communicate through their Docker network using\n    service names rather than assuming localhost refers to another container.\n</p>\n\n<h3>Application Updates</h3>\n\n<p>\n    Updating the application requires more than replacing source files.\n    Dependencies, frontend assets, database migrations, caches, and workers\n    may all need to be updated.\n</p>\n\n<hr>\n\n<h2>Production Deployment Checklist</h2>\n\n<ul>\n    <li>Production environment variables configured</li>\n    <li>APP_DEBUG disabled</li>\n    <li>Secure database credentials configured</li>\n    <li>Docker images built successfully</li>\n    <li>All required containers running</li>\n    <li>Database migrations completed safely</li>\n    <li>Laravel caches optimized</li>\n    <li>Storage permissions verified</li>\n    <li>Queue workers running where required</li>\n    <li>Scheduled tasks configured where required</li>\n    <li>Domain correctly routed through Plesk</li>\n    <li>Cloudflare DNS correctly configured</li>\n    <li>HTTPS/SSL verified</li>\n    <li>Application logs checked</li>\n    <li>Production website and APIs tested</li>\n    <li>Database and application backups configured</li>\n</ul>\n\n<hr>\n\n<h2>Final Thoughts</h2>\n\n<p>\n    Dockerizing a Laravel application and deploying it on a VPS provides a\n    practical way to create a more consistent and maintainable production\n    environment.\n</p>\n\n<p>\n    Using <strong>Docker Compose</strong> for application services,\n    <strong>Plesk</strong> for server and domain management, and\n    <strong>Cloudflare</strong> for DNS and edge-level configuration creates\n    a workflow where each part of the infrastructure has a clear\n    responsibility.\n</p>\n\n<p>\n    The most important lesson is that deployment should be treated as an\n    engineering workflow rather than simply uploading a Laravel project to a\n    server.\n</p>\n\n<p>\n    <strong>\n        Build → Configure → Deploy → Route → Secure → Monitor → Repeat.\n    </strong>\n</p>', NULL, NULL, NULL, '[\"Docker\", \"Hostinger\", \"Plesk\", \"Cloudflare\"]', 'published', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '2026-08-03 11:42:34'),
(3, 'Syncing Bokun Bookings with Google Contacts', 'syncing-bokun-api-google-contacts-google-people-api', 'How to store Bokun bookings in MySQL and sync contacts to Google without duplicates.', 'This article explains a booking automation flow using Bokun webhooks and Google People API. It covers storing bookings in MySQL, checking if a contact already exists, and updating Google Contacts safely. The goal is to avoid duplicate entries while keeping marketing or support contact data up to date.', NULL, NULL, NULL, '[\"Laravel\", \"Bokun API\", \"Google Contacts\", \"Webhooks\"]', 'published', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(4, 'Setting Up Cloudflared Tunnels for Zero-Configuration Local-to-Live Staging', 'setting-up-cloudflared-tunnels-local-live-staging', 'How to create a public testing URL from a local development server using cloudflared.', 'Cloudflared is useful when you want to share a local project without deploying it. Install cloudflared, then run:\n\ncloudflared tunnel --url http://localhost:8080\n\nThe command returns a live URL that points to your local app while your machine stays online. This is useful for client review, QA checks, or demo sharing.', NULL, NULL, NULL, '[\"Cloudflare\", \"Tunnel\", \"DevOps\", \"Staging\"]', 'published', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(5, 'Building Shopify Art Generators with React and Node', 'building-shopify-art-generators-react-node', 'How a Shopify custom app uses React and Node to handle AI image generation safely.', 'This article explains a Shopify custom app flow where React handles the interface and Node handles secure server-side requests. AI generation requests are sent through backend endpoints so keys are not exposed in the browser. The article focuses on safe request handling, session validation, and storing generation results for later use.', NULL, NULL, NULL, '[\"Shopify\", \"React\", \"Node.js\", \"Security\"]', 'published', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '2026-07-23 08:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-github_repos_CodeSproutX', 'a:2:{i:0;a:8:{s:4:\"name\";s:17:\"travel-newsletter\";s:11:\"description\";s:296:\"Travel Newsletter is a WordPress plugin that lets users subscribe through a custom registration form by providing their name, email, and travel date. Once registered, the plugin automatically schedules and sends email templates based on how many days remain before the subscriber’s travel date.\";s:3:\"url\";s:48:\"https://github.com/CodeSproutX/travel-newsletter\";s:8:\"homepage\";N;s:5:\"stars\";i:1;s:5:\"forks\";i:0;s:8:\"language\";s:3:\"PHP\";s:10:\"updated_at\";s:20:\"2026-02-04T05:25:05Z\";}i:1;a:8:{s:4:\"name\";s:25:\"Bokun-Google-Contact-Sync\";s:11:\"description\";s:183:\"A Custom-based solution to sync Bokun client contacts with Google Contacts using webhooks. It fetches data via webhooks and updates selected contacts in Google Contacts automatically.\";s:3:\"url\";s:56:\"https://github.com/CodeSproutX/Bokun-Google-Contact-Sync\";s:8:\"homepage\";N;s:5:\"stars\";i:0;s:5:\"forks\";i:0;s:8:\"language\";s:3:\"PHP\";s:10:\"updated_at\";s:20:\"2026-01-25T10:36:37Z\";}}', 1791554369),
('portfolio-cache-241fdac1316f20ab7f83346b0d292156', 'i:1;', 1784798209),
('portfolio-cache-241fdac1316f20ab7f83346b0d292156:timer', 'i:1784798209;', 1784798209),
('portfolio-cache-356a192b7913b04c54574d18c28d46e6395428ab', 'i:1;', 1785753095),
('portfolio-cache-356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1785753095;', 1785753095),
('portfolio-cache-github_repos_CodeSproutX', 'a:2:{i:0;a:8:{s:4:\"name\";s:17:\"travel-newsletter\";s:11:\"description\";s:296:\"Travel Newsletter is a WordPress plugin that lets users subscribe through a custom registration form by providing their name, email, and travel date. Once registered, the plugin automatically schedules and sends email templates based on how many days remain before the subscriber’s travel date.\";s:3:\"url\";s:48:\"https://github.com/CodeSproutX/travel-newsletter\";s:8:\"homepage\";N;s:5:\"stars\";i:1;s:5:\"forks\";i:0;s:8:\"language\";s:3:\"PHP\";s:10:\"updated_at\";s:20:\"2026-02-04T05:25:05Z\";}i:1;a:8:{s:4:\"name\";s:25:\"Bokun-Google-Contact-Sync\";s:11:\"description\";s:183:\"A Custom-based solution to sync Bokun client contacts with Google Contacts using webhooks. It fetches data via webhooks and updates selected contacts in Google Contacts automatically.\";s:3:\"url\";s:56:\"https://github.com/CodeSproutX/Bokun-Google-Contact-Sync\";s:8:\"homepage\";N;s:5:\"stars\";i:0;s:5:\"forks\";i:0;s:8:\"language\";s:3:\"PHP\";s:10:\"updated_at\";s:20:\"2026-01-25T10:36:37Z\";}}', 1789850664),
('portfolio-cache-livewire-rate-limiter:3a21970a1eca455cb05e0bce99b08996ff4cd8e4', 'i:1;', 1784798869),
('portfolio-cache-livewire-rate-limiter:3a21970a1eca455cb05e0bce99b08996ff4cd8e4:timer', 'i:1784798869;', 1784798869),
('portfolio-cache-livewire-rate-limiter:b36d0b28c334b4ddf7ac06fa352b85e66f8ce83a', 'i:1;', 1786897296),
('portfolio-cache-livewire-rate-limiter:b36d0b28c334b4ddf7ac06fa352b85e66f8ce83a:timer', 'i:1786897296;', 1786897296),
('portfolio-cache-livewire-rate-limiter:e59b4c54d64b31664a1472a941e6408649fd0792', 'i:1;', 1785752036),
('portfolio-cache-livewire-rate-limiter:e59b4c54d64b31664a1472a941e6408649fd0792:timer', 'i:1785752036;', 1785752036);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `case_studies`
--

CREATE TABLE `case_studies` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `challenge` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `solution` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `results` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tech_stack` json DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `case_studies`
--

INSERT INTO `case_studies` (`id`, `title`, `slug`, `summary`, `challenge`, `solution`, `results`, `tech_stack`, `image_path`, `client_name`, `duration`, `created_at`, `updated_at`) VALUES
(1, 'Telehealth Queue and Video Consultation Workflow', 'telehealth-queue-video-consultation-workflow', 'Built a healthcare platform supporting online and in-person consultations, appointment booking, Razorpay payments, Whereby video consultations, and real-time OPD queue management. The system includes a Laravel-filament based admin panel, mobile application APIs, doctor workflows, and a dedicated hospital display screen for showing live patient queues.', 'The healthcare platform needed to manage the complete consultation workflow across patients, doctors, staff, and administrators. The system had to support both online and in-person appointments while handling secure payments, video consultations, doctor availability, patient queues, and real-time queue visibility on hospital display screens. The challenge was to keep these workflows synchronized and simple for different user roles while maintaining reliable API and administrative operations.', 'Developed a Laravel and Filament-based healthcare backend with REST APIs for the mobile application and an administrative dashboard for managing doctors, patients, appointments, consultations, staff, payments, and operational workflows.\n\n# Integrated Whereby Video API for online consultation sessions and Razorpay for appointment payments and payment verification.\n\n# Implemented a complete OPD queue workflow where staff can manage the day\'s appointments, doctors can check in, start consultations, take breaks, complete appointments, and handle skipped or no-show patients.\n\n# Built a dedicated hospital queue display screen that can run separately from the admin system. Patients can view the current queue, token numbers, doctor information, and the next patient being called while waiting for their consultation.', '# Centralized healthcare operations through a Laravel + Filament administration panel.\n# Enabled online video consultations through Whereby integration.\n# Added Razorpay-based appointment payment and verification workflows.\n# Implemented real-time OPD token and queue management.\n# Created a dedicated hospital display screen for patient queue visibility.\n# Supported doctor check-in, consultation, break, completion, skipped, and no-show workflows.\n# Provided REST APIs to support the mobile application.\n# Improved coordination between patients, doctors, and hospital staff through a unified workflow.', '[\"Laravel\", \"Filament Layouts\", \"Whereby API\", \"Stripe\", \"Razorpay\", \"MySQL\", \"Hostinger\", \"OPD Queue Management\", \"Tailwind CSS\"]', 'casestudies/01KZ3JSTHG6WF886WADDX3CJFX.png', 'Healthcare Provider', '6 Months', '2026-07-23 08:33:22', '2026-08-03 10:30:37'),
(2, 'Dockerized VPS and Cloudflare Routing Setup', 'dockerized-vps-cloudflare-routing-setup', 'Set up Dockerized application hosting on a VPS with Cloudflare-based domain routing and local-to-live development previews.', 'Needed to host multiple applications on a single VPS with reliable subdomain routing and an easy way to preview local development environments.', 'Configured Docker Compose, Nginx/Plesk hosting, Cloudflare DNS, subdomains, and Cloudflare Tunnels for secure local-to-live previews.', 'Simplified multi-application deployment, improved routing reliability, and enabled faster client/stakeholder previews.', '[\"Docker Compose\", \"Hostinger VPS\", \"Plesk Web Host\", \"Cloudflared Tunnels\", \"Cloudflare Subdomains\", \"Cloudflare DNS\"]', NULL, 'Multi-Project Consulting Work', 'Mostly set up using Docker', '2026-07-23 08:33:22', '2026-08-03 10:36:34'),
(3, 'WordPress Bokun Sync and SendOwl Automation', 'bokun-sendowl-google-people-sync', 'Built a WordPress automation system integrating Bokun and SendOwl to sync customer and tour purchase data, manage customer records, and automate follow-up workflows.', 'The system needed to reliably process customer data from webhooks, prevent duplicate contacts, organize customers by tours, and handle large data records without losing existing information.', 'Integrated Bokun and SendOwl webhooks with WordPress by custom plugin and Google People API to sync customer contacts. Added phone deduplication, emoji-based contact grouping by tour series, customer management, and automated follow-up reminders for upcoming tours.', 'Automated customer synchronization and tour-based contact organization while improving data reliability, reducing duplicate contacts, and supporting automated customer follow-ups.', '[\"Bokun API\", \"Google People API\", \"MySQL Sync\", \"WordPress Admin\", \"Webhooks\", \"PHP\", \"Sendowl\", \"REST APIs\"]', NULL, 'Travel and Digital Product Team', '4 - 6 Months', '2026-07-23 08:33:22', '2026-08-03 10:46:55');

-- --------------------------------------------------------

--
-- Table structure for table `certifications`
--

CREATE TABLE `certifications` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuing_organization` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date DEFAULT NULL,
  `credential_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `credential_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `skills_covered` json DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `code_snippets`
--

CREATE TABLE `code_snippets` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `code_snippets`
--

INSERT INTO `code_snippets` (`id`, `title`, `slug`, `description`, `language`, `code`, `category`, `tags`, `created_at`, `updated_at`) VALUES
(1, 'Hostinger VPS Docker Compose Configuration', 'hostinger-vps-docker-compose', 'A Docker Compose setup for Laravel on Hostinger VPS with separate app, web, and database services. Use this as a starting point when you want a repeatable production-style container setup.', 'YAML', 'version: \"3.8\"\n\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    image: lakshmi-app\n    container_name: lakshmi_laravel_app\n    restart: unless-stopped\n    working_dir: /var/www/\n    volumes:\n      - ./:/var/www\n    networks:\n      - portfolio-network\n\n  webserver:\n    image: nginx:alpine\n    container_name: lakshmi_nginx\n    restart: unless-stopped\n    ports:\n      - \"80:80\"\n      - \"443:443\"\n    volumes:\n      - ./:/var/www\n      - ./nginx.conf:/etc/nginx/conf.d/default.conf\n    networks:\n      - portfolio-network\n\n  db:\n    image: mysql:8.0\n    container_name: lakshmi_mysql\n    restart: unless-stopped\n    environment:\n      MYSQL_DATABASE: portfolio_db\n      MYSQL_ROOT_PASSWORD: root_secure_password\n    volumes:\n      - dbdata:/var/lib/mysql\n    ports:\n      - \"3306:3306\"\n    networks:\n      - portfolio-network\n\nnetworks:\n  portfolio-network:\n    driver: bridge\n\nvolumes:\n  dbdata:\n    driver: local', 'Tools', '[\"docker\", \"vps\", \"hostinger\", \"devops\"]', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(2, 'Cloudflared Local Development Tunnel', 'cloudflared-local-dev-tunnel', 'Install cloudflared and expose a local app as a temporary live URL for testing or review. Run the tunnel command while your local app is running to get a public link.', 'Bash', '# macOS install\nbrew install cloudflared\n\n# verify binary\ncloudflared --version\n\n# start a temporary live tunnel to your local server\ncloudflared tunnel --url http://localhost:8080\n\n# Keep your local app running. The public URL stays active while this process runs.', 'Tools', '[\"cloudflare\", \"cloudflared\", \"tunnel\", \"testing\"]', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(3, 'Google People API Customer Sync Service', 'google-people-api-customer-sync', 'A PHP service for syncing Bokun customer data to Google Contacts. Use it when you want webhook-driven contact updates with duplicate prevention logic.', 'PHP', '<?php\n\nnamespace App\\Services;\n\nuse Illuminate\\Support\\Facades\\Http;\nuse Google\\Client as GoogleClient;\nuse Google\\Service\\PeopleService;\n\nclass BokunGoogleContactsSyncService\n{\n    protected GoogleClient $googleClient;\n\n    public function __construct()\n    {\n        $this->googleClient = new GoogleClient();\n        $this->googleClient->setClientId(config(\'services.google.client_id\'));\n        $this->googleClient->setClientSecret(config(\'services.google.client_secret\'));\n        $this->googleClient->setDeveloperKey(config(\'services.google.developer_key\'));\n    }\n\n    public function syncCustomersFromBokun(): int\n    {\n        // 1. Fetch customer entity list from Bokun API\n        $response = Http::withHeaders([\n            \'X-Bokun-Access-Key\' => config(\'services.bokun.access_key\'),\n        ])->get(\'https://api.bokun.io/v1/customer/list\');\n\n        $customers = $response->json(\'items\') ?? [];\n        $count = 0;\n\n        // 2. Sync to Google Contacts via Google Cloud API\n        $peopleService = new PeopleService($this->googleClient);\n\n        foreach ($customers as $customer) {\n            $person = new \\Google\\Service\\PeopleService\\Person();\n\n            $name = new \\Google\\Service\\PeopleService\\Name();\n            $name->setGivenName($customer[\'firstName\'] ?? \'\');\n            $name->setFamilyName($customer[\'lastName\'] ?? \'\');\n            $person->setNames([$name]);\n\n            $email = new \\Google\\Service\\PeopleService\\EmailAddress();\n            $email->setValue($customer[\'email\'] ?? \'\');\n            $person->setEmailAddresses([$email]);\n\n            $peopleService->people->createContact($person);\n            $count++;\n        }\n\n        return $count;\n    }\n}', 'Backend', '[\"laravel\", \"google-api\", \"google-people\", \"bokun\", \"webhooks\"]', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(4, 'SendOwl Tour Follow-up Webhook Listener', 'sendowl-tour-followup-webhook', 'A webhook listener for SendOwl payloads that stores customer records and schedules timed follow-up emails. Use it when digital product or booking workflows need automated follow-up handling.', 'PHP', '<?php\n\nnamespace App\\Http\\Controllers;\n\nuse Illuminate\\Http\\Request;\nuse App\\Models\\Booking;\nuse Illuminate\\Support\\Facades\\Mail;\nuse App\\Mail\\TourFollowupMail;\n\nclass SendOwlWebhookController extends Controller\n{\n    public function handle(Request $request)\n    {\n        $payload = $request->all();\n\n        // Extract customer metadata & selected tour dates\n        $email = $payload[\'buyer_email\'] ?? null;\n        $name = $payload[\'buyer_name\'] ?? \'\';\n        $tourDateString = $payload[\'custom_fields\'][\'tour_date\'] ?? null; // e.g. \"2026-07-20\"\n\n        if ($email && $tourDateString) {\n            $booking = Booking::updateOrCreate(\n                [\'email\' => $email],\n                [\n                    \'name\' => $name,\n                    \'tour_date\' => $tourDateString,\n                    \'notified\' => false\n                ]\n            );\n\n            // Schedule follow-up email campaign 2 days before the selected tour date\n            $followupTimestamp = strtotime($tourDateString . \' -2 days\');\n\n            if ($followupTimestamp > time()) {\n                // Dispatch background job to send followup with promotional offer details\n                dispatch(new \\App\\Jobs\\SendTourFollowupEmail($booking))->delay(now()->parse($followupTimestamp));\n            }\n        }\n\n        return response()->json([\'status\' => \'success\']);\n    }\n}', 'Backend', '[\"wordpress\", \"sendowl\", \"webhooks\", \"emails\", \"marketing\"]', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(5, 'HTML Head Fetch Priority for PageSpeed LCP', 'html-pagespeed-lcp-priority', 'A front-end snippet for improving PageSpeed LCP using preload, fetchpriority, and async decoding on important hero images.', 'HTML', '<!-- 1. Preload the LCP Hero Image in HTML <head> -->\n<link rel=\"preload\" href=\"/images/hero-banner.webp\" as=\"image\" type=\"image/webp\" fetchpriority=\"high\">\n\n<!-- 2. Use fetchpriority=\"high\" on the actual IMG tag for immediate fetch -->\n<img\n  src=\"/images/hero-banner.webp\"\n  alt=\"Lakshmi Portfolio\"\n  width=\"800\"\n  height=\"600\"\n  fetchpriority=\"high\"\n  decoding=\"async\"\n  class=\"w-full h-auto object-cover rounded-3xl\"\n>\n\n<!-- 3. Defer non-critical stylesheets for rendering speed optimization -->\n<link rel=\"stylesheet\" href=\"/css/non-critical.css\" media=\"print\" onload=\"this.media=\'all\'\">', 'Frontend', '[\"pagespeed\", \"lcp\", \"performance\", \"seo\"]', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(6, 'Laravel Filament Unified Layout Customization', 'laravel-filament-unified-layout', 'A base Filament page setup for keeping custom admin resources on the same layout and structure. Use it when you want consistent admin UI behavior across pages.', 'PHP', '<?php\n\nnamespace App\\Filament\\Pages;\n\nuse Filament\\Pages\\Page;\n\nabstract class UnifiedFilamentPage extends Page\n{\n    // Define the custom blade view that has unified sidebar + banner structures\n    protected static string $view = \'filament.pages.unified-layout\';\n\n    public function getHeaderWidgets(): array\n    {\n        return [\n            \\App\\Filament\\Widgets\\SystemStatusWidget::class,\n        ];\n    }\n\n    public function getBreadcrumbs(): array\n    {\n        return [\n            \'/admin\' => \'Dashboard\',\n            static::getUrl() => static::getTitle(),\n        ];\n    }\n}', 'Backend', '[\"filament\", \"laravel\", \"admin-panel\", \"ux\"]', '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(7, 'Shopify ChatGPT Image Generation Intermediary Webhook', 'shopify-chatgpt-image-webhook', 'A Laravel controller for secure AI image generation requests. Use it when you want to keep provider keys on the server and return safe asset URLs to the frontend.', 'PHP', '<?php\n\nnamespace App\\Http\\Controllers;\n\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Support\\Facades\\Http;\nuse Illuminate\\Support\\Facades\\Storage;\n\nclass AIArtworkController extends Controller\n{\n    public function generate(Request $request)\n    {\n        $request->validate([\'prompt\' => \'required|string|max:500\']);\n\n        // Call ChatGPT DALL-E Image Generation API\n        $response = Http::withToken(config(\'services.openai.key\'))\n            ->post(\'https://api.openai.com/v1/images/generations\', [\n                \'prompt\' => $request->prompt,\n                \'n\' => 1,\n                \'size\' => \'1024x1024\'\n            ]);\n\n        $imageUrl = $response->json(\'data.0.url\');\n\n        if ($imageUrl) {\n            // Save image locally to prevent expiry\n            $imageContent = file_get_contents($imageUrl);\n            $filename = \'artwork/\' . uniqid() . \'.png\';\n            Storage::disk(\'public\')->put($filename, $imageContent);\n\n            return response()->json([\n                \'success\' => true,\n                \'url\' => Storage::url($filename)\n            ]);\n        }\n\n        return response()->json([\'success\' => false], 500);\n    }\n}', 'Backend', '[\"laravel\", \"chatgpt\", \"shopify\", \"openai\"]', '2026-07-23 08:33:22', '2026-07-23 08:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `id` bigint UNSIGNED NOT NULL,
  `degree` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_of_study` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `institution` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `educations`
--

INSERT INTO `educations` (`id`, `degree`, `field_of_study`, `institution`, `location`, `start_date`, `end_date`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Bachelor of Science', 'Information Technology', 'Ludhiana College of Engineering & Technology', 'Ludhiana, Punjab, India', '2019-07-01', '2022-07-01', 'Graduated with core foundations in Software Engineering, Database Systems, Web Development, and Computer Networks.', '2026-07-23 08:33:22', '2026-07-23 08:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` bigint UNSIGNED NOT NULL,
  `job_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `achievements` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `job_title`, `company`, `location`, `start_date`, `end_date`, `is_current`, `description`, `achievements`, `created_at`, `updated_at`) VALUES
(1, 'Full Stack Web and Mobile Developer', 'Freelance and Contract Projects', 'Ludhiana, Punjab, India (Remote)', '2022-10-17', NULL, 1, 'Experienced full stack web and mobile developer working across Laravel, React, Nextjs, WordPress, Shopify, Flutter, Docker, VPS deployments, REST APIs, AI integrations, and cloud infrastructure. Delivered production systems from planning to deployment and long-term maintenance.', '[\"Developed secure REST APIs for web and Flutter mobile applications tested using Postman.\", \"Built admin panels, operational dashboards, and business workflows with Laravel and Filament.\", \"Exposed local development builds live for client testing using Cloudflared tunnels.\", \"Integrated Stripe, Razorpay, OpenAI, Deepgram, Google People API, Bokun, SendOwl, and WhatsApp Cloud API.\", \"Worked with Laravel Cloud deployments and used third-party database tools to download and inspect production data safely on local systems.\", \"Worked with Firebase for Flutter authentication using Google and Apple login, plus notification flows.\", \"Designed database models and architecture flows using dbdiagram.io and Miro.\"]', '2026-07-23 08:33:22', '2026-08-03 10:15:03');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `header_settings`
--

CREATE TABLE `header_settings` (
  `id` bigint UNSIGNED NOT NULL,
  `logo_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Lakshmi.dev',
  `nav_links` json DEFAULT NULL,
  `show_resume_button` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `mobile_nav_links` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000000_create_passkeys_table', 1),
(5, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(6, '2026_07_15_000000_create_portfolio_tables', 1),
(7, '2026_07_15_000001_create_remaining_portfolio_tables', 1),
(8, '2026_07_17_112007_create_sections_table', 1),
(9, '2026_07_23_102331_add_challenge_outcome_to_projects_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `passkeys`
--

CREATE TABLE `passkeys` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential` json NOT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tech_stack` json DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_proprietary` tinyint(1) NOT NULL DEFAULT '0',
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `challenge` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `outcome` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `slug`, `description`, `content`, `image_path`, `github_url`, `live_url`, `tech_stack`, `is_featured`, `is_proprietary`, `category`, `client_name`, `completion_date`, `created_at`, `updated_at`, `challenge`, `outcome`) VALUES
(1, 'Telehealth Consultation and Billing Platform', 'telehealth-consultation-billing-platform', '<p>A healthcare platform for appointments, online consultations, patient queue handling, prescriptions, payment workflows, and hospital-side administration.</p>', '<p>Built a comprehensive <strong>TELEHEALT</strong> and hospital management platform from scratch using Laravel, Filament, MySQL, and RESTful APIs for Android and iOS applications. Designed the system to streamline end-to-end hospital operations, including patient registration, doctor management, appointment scheduling, OPD queue management, consultations, prescriptions, billing, and administrative workflows.</p><p>Developed modules for patient records, doctor profiles, departments, staff management, appointment booking, OPD token generation, real-time queue management, doctor check-in/check-out, consultation tracking, and follow-up appointments. Implemented a digital prescription system with customizable medicine templates, dosage management, laboratory tests, diagnoses, vaccination records, diet plans, and downloadable prescription PDFs with digital stamps.</p><p>Integrated <strong>Deepgram</strong> Speech-to-Text to enable doctors to create prescriptions using voice dictation, significantly reducing manual data entry during consultations. Implemented Razorpay payment gateway for online appointment payments, secure payment verification, and transaction management. Added automated WhatsApp and email notifications for appointment confirmations, reminders, payment updates, prescription availability, and follow-up alerts.</p><p>Built secure REST APIs for mobile applications with token-based authentication, enabling patients to book appointments, access medical records, view prescriptions, make payments, and receive real-time notifications. Developed an advanced admin panel using Filament for managing doctors, patients, appointments, departments, billing, reports, system configurations, and user roles with granular permission controls.</p><p>Implemented comprehensive reporting and analytics for appointments, revenue, doctor performance, patient statistics, and operational insights. Maintained complete audit logs for critical actions, ensuring accountability and traceability across the platform. Focused on scalability, security, performance, and maintainability while supporting real-world hospital workflows with a clean administrative interface and reliable API communication.</p>', '[]', NULL, NULL, '[\"Laravel\", \"Filament Layouts\", \"REST APIs\", \"Razorpay\", \"Whereby API\", \"Stripe\", \"MySQL\", \"Miro\", \"dbDiagram\"]', 1, 1, 'Laravel', 'Healthcare Provider', '2024-05-15', '2026-07-23 08:33:22', '2026-07-23 12:13:03', '<p>Healthcare providers were managing appointments, OPD queues, patient records, prescriptions, and billing through disconnected systems and manual processes. This resulted in longer patient waiting times, inefficient doctor workflows, fragmented medical records, and limited visibility into hospital operations. Additionally, doctors needed a faster way to create prescriptions, while patients required a seamless experience for booking appointments, making payments, and accessing their medical history from mobile devices.</p>', '<p># Unified hospital operations into a single telehealth platform.\n# Reduced manual work through digital prescriptions, automated notifications, and streamlined workflows.\n# Improved patient experience with online booking, real-time queue management, and secure mobile access.\n# Delivered a scalable solution supporting daily hospital operations across web and mobile platforms.</p>'),
(2, 'Ticketing and Operations Management Platform', 'dockerized-laravel-multi-app-vps-stack', '<p>A centralized <strong>Laravel-based</strong> project management platform that brings together project tracking, ticket management, employee attendance, expense management, reporting, and daily team operations into a single dashboard. The platform helps organizations streamline collaboration, improve visibility, and reduce manual administrative work.</p>', '<p>Developed a comprehensive <strong>project</strong> and <strong>ticket management system</strong> that enables organizations to manage multiple projects, create project-specific teams, and assign role-based permissions. Each project includes a dedicated ticketing workflow with features such as ticket assignment and reassignment, threaded comments, activity logs, status tracking, file attachments, notifications, and detailed reporting. The system improves collaboration by providing complete visibility into project progress and team activities while maintaining an audit trail of all ticket updates.</p><p>Additionally, developed modules for employee attendance, expense management, activity logs, and reporting, providing a centralized platform for day-to-day business operations.</p><p>Deployed the application on a Hostinger VPS using Docker and Docker Compose. Configured Cloudflare DNSand Cloudflared tunnels to enable secure deployments, preview environments, and stakeholder testing. The overall solution was designed to centralize operations, improve team collaboration, and reduce manual tracking across projects.</p>', '[]', NULL, NULL, '[\"Laravel\", \"Docker\", \"Hostinger VPS\", \"Cloudflare DNS\", \"Cloudflared\", \"React js\", \"shdcn UI\"]', 1, 1, 'Laravel', 'Education and Support Team', '2024-11-20', '2026-07-23 08:33:22', '2026-07-23 12:13:07', '<p>The organization relied on multiple tools and manual processes to manage projects, assign tasks, track employee attendance, monitor expenses, and handle support tickets. There was limited visibility into project progress, inconsistent communication between teams, and no centralized audit trail for operational activities. Managing permissions, tracking ticket history, and generating reports became increasingly difficult as the team grew.</p>', '<p>Developed a comprehensive project and ticket management system that enables organizations to manage multiple projects, create project-specific teams, and assign role-based permissions. Each project includes a dedicated ticketing workflow with ticket creation, assignment and reassignment, threaded discussions, activity logs, status tracking, file attachments, notifications, SLA monitoring, and detailed reporting.</p>'),
(3, 'Shopify AI Artwork Custom App', 'shopify-ai-artwork-custom-app', '<p>A custom Shopify app where users can generate AI artwork, save it, manage visibility, and purchase final designs through a guided flow.</p>', '<p>Built and published a custom <strong>Shopify app</strong> that enables customers to <strong>generate AI-powered</strong> artwork, customize products, and purchase their creations directly from the storefront. Integrated the <strong>OpenAI GPT</strong> Image <strong>API</strong> with <strong>Shopify</strong> to provide a seamless experience from prompt creation to checkout. The app includes customer galleries, public and private artwork management, community sharing, prompt reuse, and product customization workflows.</p>', '[]', NULL, NULL, '[\"Shopify\", \"Liquid\", \"Chat GBT-image 5\", \"React\"]', 1, 0, 'Shopify', 'Shopify Art Store', '2024-02-18', '2026-07-23 08:33:22', '2026-07-23 12:37:23', '<p>The client needed a secure <strong>AI image generation</strong> platform that worked natively within Shopify while providing a smooth customer experience. Generated images had to be linked to <strong>customer accounts</strong>, <strong>products</strong>, and <strong>orders</strong> without exposing private content. Another key requirement was a community gallery where customers could choose to publish their AI-generated artwork, allowing other users to browse, review, like, and reuse public creations as inspiration for generating or purchasing their own products. The solution also required moderation tools for administrators to approve, manage, and feature <strong>community</strong> artwork while maintaining scalable image storage and fast performance.</p>', '<ul><li><p>Delivered a seamless<strong> AI artwork</strong> generation experience from prompt to purchase.</p></li><li><p>Increased customer engagement through a public community gallery and prompt reuse.</p></li><li><p>Enabled secure management of private and public AI-generated images.</p></li><li><p>Simplified product customization with AI-generated artwork integrated into the Shopify purchasing workflow.</p></li></ul>'),
(4, 'WordPress Bokun Booking Automation Suite', 'wordpress-bokun-booking-automation-suite', '<p>A custom WordPress tourism website with dynamic content, Bokun booking sync, Google Contacts automation, and SendOwl follow-up flows managed from admin.</p>', '<p>Built a fully customized <strong>WordPress travel and tour management platform</strong> for Lisbon Star, designed to centralize website content, tour operations, customer management, and digital product delivery within a single administration panel.<br><br>Created <strong>custom WordPress plugins</strong> to integrate with the <strong>Bokun API</strong> and <strong>Bokun Webhooks</strong>, automatically synchronizing tours, activities, availability, pricing, booking information, and customer details into the WordPress admin. Administrators can browse synchronized tours, manage listings, display tour information on the website, and keep content updated without manual imports.</p><p>Integrated the <strong>Google People API</strong> using Google Cloud Console to synchronize customer contacts with Google Contacts. Implemented intelligent duplicate detection to prevent multiple records for the same customer while automatically updating existing contacts. Added a unique emoji identification system so repeat customers could be quickly recognized across bookings and communications.</p><p>Implemented <strong>custom booking workflows</strong>, customer inquiry management, reporting dashboards, and operational tools to help staff monitor bookings and customer activity from a centralized interface. The platform was built with scalability, maintainability, and automation in mind, significantly reducing repetitive administrative tasks while improving operational efficiency and customer experience.</p>', '[]', NULL, NULL, '[\"WordPress Admin\", \"Bokun API\", \"Google Contacts\", \"MySQL\", \"Webhooks\", \"php\", \"Google cloud People Api\"]', 0, 0, 'WordPress', NULL, '2023-08-10', '2026-07-23 08:33:22', '2026-07-23 12:29:24', '<p>The client relied on multiple disconnected systems for tour bookings, customer contacts, and digital product delivery. Tour data from Bokun needed to be synchronized automatically into WordPress without manual updates. Customer information often contained duplicate records, making follow-ups difficult and reducing data quality. The business also required automated email communication, Google Contacts synchronization, and an easy way for administrators to manage website content and travel packages without depending on developers.</p>', '<ul><li><p>Automated tour synchronization between Bokun and WordPress.</p></li><li><p>Eliminated duplicate contacts through Google People API synchronization.</p></li><li><p>Improved customer engagement with automated booking and follow-up emails.</p></li><li><p>Enabled administrators to manage tours, content, and operations from a single dashboard, significantly reducing manual work.</p></li></ul>'),
(6, 'Flutter Content and Subscription Backend', 'flutter-content-subscription-backend', '<p>A Laravel backend for a Flutter app with digital content, downloads, purchases, subscriptions, Firebase auth, and user management.</p>', '<p>Built and maintained the backend for a <strong>Flutter-based</strong> mobile reading application using Laravel and RESTful APIs. Developed APIs for books, PDF and EPUB content, categories, purchases, downloads, bookmarks, subscriptions, and user management. Integrated <strong>Firebase</strong> Authentication (Google and Apple Sign-In), Firebase Cloud Messaging (FCM) for push notifications, and <strong>RevenueCat</strong> for subscription and in-app purchase management. Collaborated closely with the Flutter application to ensure secure, scalable, and high-performance API communication across Android and iOS platforms.</p>', '[]', NULL, NULL, '[\"Laravel\", \"Flutter APIs\", \"Firebase Auth\", \"RevenueCat\", \"MySQL\", \"Flutter\", \"Android Studio\", \"xcode\", \"Apple store & Google Play Store\", \"Test Flight\"]', 0, 1, 'Laravel', 'Mobile Content Team', '2024-06-12', '2026-07-23 08:33:22', '2026-07-23 12:36:29', '<p>This project involved working on an existing production system that was already partially developed, requiring a deep understanding of the existing architecture before implementing new features and fixing issues. Since Flutter development was new to me, I had to quickly learn the mobile development workflow, including debugging the application using Android Studio and Xcode, testing APIs on physical devices and simulators, and understanding how the Flutter frontend interacted with the Laravel backend.</p><p>Another challenge was integrating and maintaining platform-specific services such as Google Sign-In, Apple Sign-In, Firebase Authentication, push notifications, and RevenueCat subscriptions. Publishing and maintaining the iOS application required working with Apple Developer Console, provisioning profiles, certificates, App Store Connect, and Apple&#039;s strict review guidelines, while also managing Android releases through Google Play Console.</p><p>Throughout the project, I gained hands-on experience with mobile application deployment, backend API optimization, authentication flows, subscription management, and cross-platform application support.</p>', '<ul><li><p>Successfully delivered reliable backend APIs powering both Android and iOS applications.</p></li><li><p>Implemented secure authentication, subscriptions, and push notification workflows.</p></li><li><p>Gained practical experience with Flutter integration, Google Play Console, App Store Connect, and mobile application deployment.</p></li><li><p>Improved application stability, API performance, and the overall mobile user experience.</p></li></ul>');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `name`, `category`, `url`, `description`, `image_path`, `tags`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 'Laravel Filament Panel', 'Laravel Packages', 'https://filamentphp.com/', 'Use Filament when you need admin forms, tables, filters, and dashboards quickly inside a Laravel project. Install it in your Laravel app, define resources, then manage CRUD screens and internal tools from one panel.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(2, 'Laravel Telescope', 'Laravel Packages', 'https://laravel.com/docs/telescope', 'Use Telescope during development to inspect requests, jobs, logs, exceptions, mail, and database queries. Install it in non-production environments and open the dashboard when debugging Laravel features.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(3, 'Laravel Pint', 'Laravel Packages', 'https://laravel.com/docs/pint', 'Use Pint to format your Laravel and PHP code before committing changes. Install dependencies, then run the Pint command to apply consistent formatting across the project.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(4, 'Larastan', 'Laravel Packages', 'https://github.com/larastan/larastan', 'Use Larastan for static analysis in Laravel projects. Configure it with PHPStan, then run analysis to catch type issues, wrong method calls, and risky code before runtime.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(5, 'Postman Client', 'API Testing Tools', 'https://www.postman.com/', 'Use Postman to test REST APIs, headers, tokens, request bodies, and webhook endpoints. Create collections for repeated requests and use environments for local, staging, and production API testing.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(6, 'Insomnia', 'API Testing Tools', 'https://insomnia.rest/', 'Use Insomnia when you want a simple client for testing REST or GraphQL endpoints. Create a request, add auth or payload data, and run quick checks without extra project setup.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(7, 'Cloudflared CLI Tunnel', 'Deployment Tools', 'https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/', 'Install cloudflared from the official Cloudflare downloads page. Then run: cloudflared tunnel --url http://localhost:8080. The command returns a live public URL pointing to your local app, which is useful for testing and client review without deployment.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(8, 'Docker Desktop', 'Deployment Tools', 'https://www.docker.com/', 'Use Docker Desktop to run containers locally, build images, and manage compose services. Start your stack with Docker Compose when you want a local environment similar to production.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(9, 'Plesk Hosting Panel', 'Deployment Tools', 'https://www.plesk.com/', 'Use Plesk to manage VPS websites, domains, SSL, databases, email, and server settings from a panel. It is useful when you want easier server management without doing every task manually over SSH.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(10, 'PHP Intelephense', 'VS Code Extensions', 'https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client', 'Install Intelephense in VS Code for PHP autocomplete, go-to-definition, type hints, and diagnostics. It is especially useful in Laravel projects for faster navigation and better editor assistance.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(11, 'Cursor Editor', 'AI Tools', 'https://www.cursor.com/', 'Use Cursor for AI-assisted coding, refactoring, debugging, and codebase navigation. It helps when you want faster iteration while still working inside a real code editor.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(12, 'OpenAI Platform', 'AI Tools', 'https://platform.openai.com/', 'Use the OpenAI platform to manage API keys, test prompts, review usage, and experiment with models before integrating them into your application.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(13, 'Miro Board Design', 'Design Resources', 'https://miro.com/', 'Use Miro to plan system architecture, workflows, user journeys, and feature discussions visually. It helps before implementation when you want clear planning for modules or integrations.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(14, 'dbdiagram.io', 'Design Resources', 'https://dbdiagram.io/', 'Use dbdiagram.io to design database schemas, relationships, and ER diagrams before creating migrations. It is useful for backend planning and discussing table structure early.', NULL, NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `resumes`
--

CREATE TABLE `resumes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `download_count` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resumes`
--

INSERT INTO `resumes` (`id`, `name`, `file_path`, `category`, `download_count`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Lakshmi - Laravel Specialist Resume', 'resumes/01KY7G4RP4Q32JWY3AZ7FAGQA9.pdf', 'Laravel Backend Developer', 114, 0, '2026-07-23 08:33:22', '2026-07-23 12:45:50');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` bigint UNSIGNED NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `content` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `show_on_mobile` tinyint(1) NOT NULL DEFAULT '1',
  `show_on_desktop` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `key`, `title`, `subtitle`, `is_visible`, `content`, `created_at`, `updated_at`, `show_on_mobile`, `show_on_desktop`) VALUES
(1, 'banner', 'Hi, I\'m Lakshmi', 'Full Stack Web & Mobile Developer', 1, '{\"button_text_1\": \"View Projects\", \"button_text_2\": \"Discuss a Project\", \"hero_subtitle\": \"Experienced full stack developer with hands-on work in Laravel, WordPress, Shopify, Flutter, Docker, VPS deployment, REST APIs, AI integrations, Firebase, and cloud infrastructure. I build scalable web applications, custom admin panels, mobile backends, eCommerce solutions, and production-ready deployments.\"}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(2, 'tech_marquee', 'Core Stack and Tools', 'Technologies I actively use in real projects', 1, '{\"items\": [\"Laravel\", \"WordPress\", \"Shopify\", \"Flutter\", \"Docker\", \"Hostinger VPS\", \"Laravel Cloud\", \"Filament\", \"MySQL\", \"Firebase\", \"Cloudflare\", \"Cloudflare Tunnel\", \"Plesk\", \"OpenAI\", \"Deepgram\", \"Bokun API\", \"SendOwl\", \"Razorpay\", \"Stripe\", \"Google People API\"]}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(3, 'experience', 'Professional Experience', 'End-to-end project delivery across backend, frontend, mobile, integrations, and deployment.', 1, NULL, '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(4, 'projects', 'Featured Projects', 'Selected work covering healthcare, WordPress, Shopify, mobile backends, and deployment systems with practical project details.', 1, '{\"use_slider\": true}', '2026-07-23 08:33:22', '2026-07-23 11:41:14', 1, 1),
(5, 'case_studies', 'Interactive Case Studies', 'Focused breakdowns of how each system was planned, integrated, and shipped.', 1, NULL, '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(6, 'skills', 'Skills & Tech Stack', 'A practical stack based on tools I have actually used in production work.', 1, NULL, '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(7, 'engineering', 'Engineering Experience', 'Grouped by the areas I work in most often.', 1, '{\"groups\": [{\"items\": [\"Laravel\", \"PHP\", \"REST APIs\", \"Queue Jobs\", \"Scheduler\", \"Filament\", \"Authentication\", \"Webhooks\"], \"title\": \"Backend\"}, {\"items\": [\"Blade\", \"HTML\", \"CSS\", \"Bootstrap\", \"JavaScript\", \"jQuery\", \"Alpine.js\", \"WordPress Themes\"], \"title\": \"Frontend\"}, {\"items\": [\"Flutter\", \"Firebase Auth\", \"Google Login\", \"Apple Login\", \"Push Notifications\", \"RevenueCat\"], \"title\": \"Mobile\"}, {\"items\": [\"Docker\", \"Docker Compose\", \"Hostinger VPS\", \"Laravel Cloud\", \"Cloudflare\", \"Cloudflare Tunnel\", \"Plesk\", \"SSH\"], \"title\": \"Cloud & DevOps\"}, {\"items\": [\"MySQL\", \"Database Design\", \"dbdiagram.io\", \"Miro\", \"Query Optimization\", \"Production Debugging\"], \"title\": \"Database & Planning\"}]}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(8, 'api_integrations', 'API Integration Showcase', 'Third-party integrations I have implemented in real projects.', 1, '{\"items\": [{\"icon\": \"AI\", \"name\": \"OpenAI GPT Image API\", \"endpoint\": \"openai/images/generations\", \"description\": \"Used for AI artwork generation inside a Shopify application.\"}, {\"icon\": \"STT\", \"name\": \"Deepgram API\", \"endpoint\": \"deepgram/v1/listen\", \"description\": \"Used for voice-to-text transcription in a prescription workflow.\"}, {\"icon\": \"WA\", \"name\": \"WhatsApp Cloud API\", \"endpoint\": \"whatsapp/messages/send\", \"description\": \"Used for automated patient and appointment notifications.\"}, {\"icon\": \"TOUR\", \"name\": \"Bokun API\", \"endpoint\": \"bokun/webhook/listener\", \"description\": \"Used for tourism product and booking synchronization.\"}, {\"icon\": \"CRM\", \"name\": \"Google People API\", \"endpoint\": \"google/contacts/sync\", \"description\": \"Used for contact sync with duplicate prevention.\"}, {\"icon\": \"DLV\", \"name\": \"SendOwl Webhooks\", \"endpoint\": \"sendowl/webhook/event\", \"description\": \"Used for order sync, digital delivery, and follow-up emails.\"}, {\"icon\": \"PAY\", \"name\": \"Razorpay\", \"endpoint\": \"razorpay/v1/orders\", \"description\": \"Used for appointment payment collection and verification.\"}, {\"icon\": \"PAY\", \"name\": \"Stripe\", \"endpoint\": \"stripe/v1/checkout\", \"description\": \"Used for checkout and payment verification flows.\"}, {\"icon\": \"SUB\", \"name\": \"RevenueCat\", \"endpoint\": \"revenuecat/subscribers/info\", \"description\": \"Used for Flutter subscription and purchase management.\"}]}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(9, 'production_experience', 'Production Experience', 'Practical deployment and maintenance work across live systems.', 1, '{\"items\": [\"Shared Hosting Deployments\", \"Hostinger VPS Deployments\", \"Dockerized Production Setups\", \"Laravel Cloud Deployments\", \"Cloudflare DNS and SSL\", \"Cloudflare Tunnel Previews\", \"Queue Workers and Cron Jobs\", \"Webhook Automation\", \"Payment Integrations\", \"Firebase Auth Workflows\", \"Flutter Backend APIs\", \"Production Debugging and Maintenance\"]}', '2026-07-23 08:33:22', '2026-08-16 16:39:11', 0, 0),
(10, 'experience_matrix', 'Experience Matrix', 'A simple view of the areas I work in most confidently.', 1, '{\"rows\": [{\"area\": \"Backend Development\", \"level\": \"Expert\", \"stars\": 5}, {\"area\": \"API Integrations\", \"level\": \"Expert\", \"stars\": 5}, {\"area\": \"WordPress and Shopify Work\", \"level\": \"Expert\", \"stars\": 5}, {\"area\": \"Flutter Backends\", \"level\": \"Advanced\", \"stars\": 4}, {\"area\": \"Cloud and Deployment\", \"level\": \"Advanced\", \"stars\": 4}, {\"area\": \"Database Design\", \"level\": \"Advanced\", \"stars\": 4}, {\"area\": \"AI Integrations\", \"level\": \"Advanced\", \"stars\": 4}]}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(11, 'timeline', 'Technology Timeline', 'A simple growth path from WordPress websites to Laravel systems, mobile backends, and cloud deployment work.', 1, '{\"items\": [{\"year\": \"2022\", \"title\": \"WordPress and PHP Foundation\", \"description\": \"Started with custom WordPress themes, dynamic pages, WooCommerce work, and core PHP-based implementation.\"}, {\"year\": \"2023\", \"title\": \"Laravel Full-Stack Projects\", \"description\": \"Built Laravel admin panels, APIs, business workflows, and database-driven internal systems.\"}, {\"year\": \"2024\", \"title\": \"Shopify, Flutter, and AI Integrations\", \"description\": \"Worked on Shopify apps, Flutter backends, Firebase auth flows, OpenAI integrations, and RevenueCat-based subscriptions.\"}, {\"year\": \"2025\", \"title\": \"Cloud and Production Delivery\", \"description\": \"Handled Hostinger VPS deployments, Docker stacks, Laravel Cloud setups, Cloudflare configuration, and live maintenance work.\"}]}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(12, 'specializations', 'What I Build', 'The kinds of systems I work on most often.', 1, '{\"items\": [{\"title\": \"Healthcare Systems\", \"points\": [\"Telemedicine platforms\", \"Voice prescription workflows\", \"Patient queues and notifications\"]}, {\"title\": \"CMS and Booking Systems\", \"points\": [\"WordPress custom themes\", \"Bokun integrations\", \"Dynamic admin-managed content\"]}, {\"title\": \"eCommerce and Shopify\", \"points\": [\"Custom Shopify apps\", \"AI image generation flows\", \"Payments and digital delivery\"]}, {\"title\": \"Mobile Backends\", \"points\": [\"Flutter-ready APIs\", \"Firebase authentication\", \"RevenueCat subscriptions\"]}]}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(13, 'snippets', 'Code Snippets Library', 'Practical backend, front-end, and deployment snippets with real use-case descriptions.', 1, '{\"use_slider\": true}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(14, 'blog', 'Articles & Insights', 'Short practical articles covering deployment, APIs, performance, and integration workflows.', 1, '{\"use_slider\": true}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(15, 'resources', 'Developer Toolkit', 'Laravel tools, deployment utilities, and references with simple notes on how to use them.', 1, '{\"use_slider\": true}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(16, 'certifications', 'Certifications & Credentials', 'Verified professional courses and learning achievements', 0, NULL, '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(17, 'github', 'Open Source Repositories', 'Active developer scripts and libraries synced directly from GitHub.', 1, NULL, '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1),
(18, 'contact', 'Let\'s Work Together', 'Share your project scope and goals. I will reply with a clear implementation plan.', 1, '{\"email\": \"laxmi20024@gmail.com\", \"phone\": \"+91 6280788413\"}', '2026-07-23 08:33:22', '2026-07-23 08:33:22', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('vXQfQ5eGgoaJ0WYaEZPZIkP1mdzPd0Ln7mj9ksZM', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIxak1OTDVMOTlkUVBwWjBRMHo3QWlqcFpWUGpVcUJoNXFLU3U0MFZIIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo1NTU1Iiwicm91dGUiOiJob21lIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1791133549),
('ZmCcIJdnDq1t7L2yJ8oK2lG9Av4nYEH9VepPJrUR', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJrVU5RRGNCYTdoZ05IT2NRQTJpNjh5YWxRWHRIVjRaYmEzM21DN3RrIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo1NTU1Iiwicm91dGUiOiJob21lIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1791532769);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `percentage` int NOT NULL DEFAULT '100',
  `icon_class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `years_of_experience` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `category`, `level`, `percentage`, `icon_class`, `created_at`, `updated_at`, `color`, `years_of_experience`) VALUES
(1, 'Laravel', 'Backend', 'expert', 95, 'fab fa-laravel', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#FF2D20', 3),
(2, 'PHP', 'Backend', 'expert', 95, 'fab fa-php', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#777BB4', 3),
(3, 'Filament Admin Panels', 'Backend', 'expert', 90, 'fas fa-cogs', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#EAB308', 2),
(4, 'MySQL and Database Design', 'Backend', 'expert', 90, 'fas fa-database', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#4479A1', 3),
(5, 'REST APIs and Webhooks', 'Backend', 'expert', 95, 'fas fa-link', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#008080', 3),
(6, 'Blade, HTML, CSS, JavaScript', 'Frontend', 'advanced', 90, 'fab fa-js', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#F7DF1E', 3),
(7, 'Bootstrap and jQuery', 'Frontend', 'advanced', 84, 'fab fa-css3-alt', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#06B6D4', 3),
(8, 'Alpine.js', 'Frontend', 'advanced', 80, 'fab fa-js', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#8B5CF6', 2),
(9, 'WordPress Theme Development', 'Frontend', 'expert', 88, 'fab fa-wordpress', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#21759B', 3),
(10, 'WordPress and WooCommerce', 'CMS & E-commerce', 'expert', 90, 'fab fa-wordpress', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#21759B', 3),
(11, 'Shopify Custom Apps', 'CMS & E-commerce', 'advanced', 88, 'fab fa-shopify', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#96BF48', 2),
(12, 'Bokun and SendOwl Workflows', 'CMS & E-commerce', 'advanced', 85, 'fas fa-ticket-alt', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#FF5722', 2),
(13, 'Stripe and Razorpay Payments', 'CMS & E-commerce', 'expert', 92, 'fas fa-credit-card', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#6772E5', 3),
(14, 'Docker and Hostinger VPS', 'Tools', 'advanced', 85, 'fab fa-docker', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#2496ED', 2),
(15, 'Cloudflare and Cloudflared', 'Tools', 'advanced', 90, 'fas fa-shield-alt', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#F38020', 2),
(16, 'Laravel Cloud Deployment', 'Tools', 'advanced', 84, 'fas fa-cloud', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#F97316', 1),
(17, 'Firebase Auth and Notifications', 'Tools', 'advanced', 82, 'fas fa-bell', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#F59E0B', 2),
(18, 'Plesk Web Admin', 'Tools', 'advanced', 85, 'fas fa-server', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#4F46E5', 2),
(19, 'Postman, GitHub, Miro, dbdiagram.io', 'Tools', 'expert', 92, 'fas fa-laptop-code', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#FF6C37', 3),
(20, 'OpenAI and Deepgram Integrations', 'Tools', 'expert', 90, 'fas fa-magic', '2026-07-23 08:33:22', '2026-07-23 08:33:22', '#10A37F', 2);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL DEFAULT '5',
  `review` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `company`, `position`, `rating`, `review`, `profile_image`, `is_approved`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'SaaS Ventures', 'Co-Founder', 5, 'Lakshmi delivered clean, maintainable code for our medical consult application. Her professionalism and responsiveness were top-notch throughout the project.', NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(2, 'Sarah Connor', 'Orvella Studio', 'Creative Director', 5, 'We hired Lakshmi to build our custom Shopify and Laravel integration. The AI artwork generation feature she implemented works flawlessly and has wowed our clients.', NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22'),
(3, 'Amit Sharma', 'Quick Coders', 'Senior Project Manager', 5, 'Lakshmi is an exceptional Full Stack developer. Her expertise in Laravel APIs and React/Next.js frontend development accelerated our project delivery significantly.', NULL, 1, '2026-07-23 08:33:22', '2026-07-23 08:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Lakshmi', 'laxmi20024@gmail.com', '2026-07-23 08:33:21', '$2y$12$yMmqEYJVpAAX3ZZUEPIG9.hPOxlvrsiR78vF8OZWji8mhhf/bb8.2', NULL, NULL, NULL, 'D0ljJlpUeFmVOSIXJRRyf0s0J3lWX9UJx12WHpAsftWoDk9ypblTJL2sb8yg', '2026-07-23 08:33:22', '2026-07-23 09:17:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_posts_slug_unique` (`slug`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `case_studies`
--
ALTER TABLE `case_studies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `case_studies_slug_unique` (`slug`);

--
-- Indexes for table `certifications`
--
ALTER TABLE `certifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `code_snippets`
--
ALTER TABLE `code_snippets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_snippets_slug_unique` (`slug`);

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `header_settings`
--
ALTER TABLE `header_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passkeys`
--
ALTER TABLE `passkeys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `passkeys_credential_id_unique` (`credential_id`),
  ADD KEY `passkeys_user_id_index` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_slug_unique` (`slug`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resumes`
--
ALTER TABLE `resumes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sections_key_unique` (`key`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `case_studies`
--
ALTER TABLE `case_studies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `certifications`
--
ALTER TABLE `certifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `code_snippets`
--
ALTER TABLE `code_snippets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `educations`
--
ALTER TABLE `educations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `header_settings`
--
ALTER TABLE `header_settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `passkeys`
--
ALTER TABLE `passkeys`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `resumes`
--
ALTER TABLE `resumes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `passkeys`
--
ALTER TABLE `passkeys`
  ADD CONSTRAINT `passkeys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
