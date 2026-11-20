import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import ProductReviews from "../../components/ProductReviews";
import Stars from "../../components/Stars";
import { getProduct, products, relatedProducts } from "../../data/products";

// Pre-build one static page per product at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

// Generate unique per-product metadata for search and browser tab titles.
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProduct(params.id);
  if (!product) {
    return {
      title: "Product Not Found | ShipYard",
      description: "The requested item could not be found in our catalog.",
    };
  }

  return {
    title: `${product.name} — ${product.category}`,
    description: `${product.tagline} ${product.description}`,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  // If the id in the URL does not match a product, show the 404 page.
  if (!product) {
    notFound();
  }

  const related = relatedProducts(product);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const imageSrc = `${basePath}${product.image}`;

  return (
    <main className="container">
      <nav className="crumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={`/#${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="crumbs-here">{product.name}</span>
      </nav>

      <article className="detail">
        <div
          className="detail-art"
          style={{
            background: `linear-gradient(135deg, ${product.accent}, ${product.accent2})`,
            position: "relative",
          }}
        >
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 720px) 340px, 100vw"
            style={{ objectFit: "cover" }}
          />
          {product.badge && <span className="card-badge">{product.badge}</span>}
        </div>

        <div className="detail-body">
          <span className="card-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>
          <Stars rating={product.rating} />
          <span className="detail-price">${product.price}</span>
          <p className="detail-desc">{product.description}</p>

          <h2 className="detail-specs-title">Specs</h2>
          <ul className="detail-specs">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </div>
      </article>

      {/* Heavy below-the-fold component: lazy-loaded on demand */}
      <ProductReviews
        productId={product.id}
        productName={product.name}
        rating={product.rating}
      />

      {related.length > 0 && (
        <section className="related">
          <div className="section-head">
            <h2 className="section-title">More in {product.category}</h2>
          </div>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
