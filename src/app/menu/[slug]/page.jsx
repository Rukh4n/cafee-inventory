import DetailProduct from "./componnents/detailProduct"

export const dynamic = 'force-dynamic' // agar SSR dijalankan

const Page = async ({ params }) => {
  const { slug } = params

  return <DetailProduct slug={slug} />
}

export default Page
