import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
const ProductCardSkeleton = () => {
  return (
    <Card className="mx-auto w-full max-w-sm overflow-hidden pt-0">
      <div className="relative w-full h-48 bg-black/35">
        <Skeleton className='w-full h-full'/>
      </div>
      <CardHeader>
        <Skeleton className='w-4/5 h-5'/>
        <Skeleton className='w-full h-4 mt-2'/>
        <Skeleton className='w-2/3 h-4 mt-1'/>
      </CardHeader>
      <CardFooter>
        <Skeleton className='w-24 h-6'/>
        <Skeleton className='w-20 h-6'/>
      </CardFooter>
    </Card>
  )
}

export default ProductCardSkeleton
