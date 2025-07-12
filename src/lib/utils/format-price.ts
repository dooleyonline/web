export default function formatPrice(
  price: number | string | undefined
): string {
  if (!price) {
    return "$0.00";
  }
  if (typeof price === "string") {
    price = parseFloat(price);
  }
  return "$" + price.toFixed(2);
}
