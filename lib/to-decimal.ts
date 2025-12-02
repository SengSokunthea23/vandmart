import { Decimal } from "@prisma/client/runtime/library";

function serialize(obj: any): any {
  if (obj instanceof Decimal) return obj.toNumber();
  if (Array.isArray(obj)) return obj.map(serialize);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, serialize(v)])
    );
  }
  return obj;
}

export default serialize;
