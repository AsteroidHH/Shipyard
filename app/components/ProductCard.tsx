import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";
import type { Product } from "../data/products";

// The card takes one typed product as a prop. TypeScript checks every field.
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="card">
      <div
        className="card-art"
        style={{
          background: `linear-gradient(135deg, ${product.accent}, ${product.accent2})`,
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1040px) 240px, (min-width: 720px) 33vw, 100vw"
          style={{ objectFit: "cover" }}
        />
        {product.badge && <span className="card-badge">{product.badge}</span>}
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h2 className="card-name">{product.name}</h2>
        <p className="card-tagline">{product.tagline}</p>
        <Stars rating={product.rating} />
        <div className="card-foot">
          <span className="card-price">${product.price}</span>
          <span className="card-cta">View →</span>
        </div>
      </div>
    </Link>
  );
}
