import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

// Define the function separately from the export
async function EditProductsPage(props: {
  params: { id: string }
}) {
    const productId = parseInt(props.params.id, 10)
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    
    if(!product) {
        notFound()
    }

    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

            <GoBackButton />

            <EditProductForm>
                <ProductForm 
                    product={product}
                />
            </EditProductForm>
        </>
    )
}

// Export the function as the default export
export default EditProductsPage