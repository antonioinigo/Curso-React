import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma"

async function getProducts(cateogry:string) {

  const producs = await prisma.product.findMany({
    where: {
      category: {
        slug: cateogry
      }
    }
  })
  return producs;
}

async function OrderPage({params}: {params: {category: string}}) {
  const products = await getProducts(params.category)

  return (
    <>

      <Heading>Elige y personaliza tu pedido</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map(product =>(
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}  

      </div>
      
    </>
  )
}

export default OrderPage
