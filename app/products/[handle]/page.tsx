import { redirect } from "next/navigation"
import { getProductByHandle } from "@/lib/api/shopify"

export default async function ProductHandlePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params

  const product = await getProductByHandle(handle)

  if (product) {
    redirect(`/product/${product.id}`)
  }

  redirect("/shop")
}
