import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { getKoreanCategoryName, getOnlyRepresentativePhoto } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  SameCategoryProduct,
  SameSubCategoryProduct,
} from "@/types/category.types";
import { RelatedProduct } from "@/types/customerProduct.types";
// import { MainProduct } from "@/types/main.types";

interface ProductItemProps {
  item: SameCategoryProduct | SameSubCategoryProduct | RelatedProduct;
  // | MainProduct;
}

const ProductItem = ({ item }: ProductItemProps) => {
  return (
    <div aria-label="카테고리별 상품" className="cursor-pointer">
      <Avatar className="w-full h-60 rounded-none border-[1px] bg-white">
        <AvatarImage
          width="200"
          height="500"
          src={getOnlyRepresentativePhoto(item.product_images)}
          alt="상품 대표 사진"
          className="object-cover"
        />
        <AvatarFallback className="rounded-none">
          <Avatar className="w-full h-full rounded-none bg-white-200" />
          <Skeleton className="w-full h-full rounded-none" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full pt-5 text-sm space-y-2">
        <div className="flex flex-row space-x-2 items-center">
          <CardDescription>{item.brands?.name || "브랜드"}</CardDescription>
          <Badge
            variant="outline"
            className="bg-white opacity-70 text-xs flex justify-center "
          >
            {getKoreanCategoryName(item.sub_categories?.name as string) ||
              "서브 카테고리"}
          </Badge>
        </div>
        <CardTitle className="text-sm">{item.name || "상품명"}</CardTitle>
        <div className="flex flex-row space-x-2 items-center text-xs text-muted-foreground">
          <div>{item.color || "컬러"}</div>
          <Separator orientation="vertical" className="bg-gray-400 h-[12px]" />
          <div className="flex flex-row space-x-2 text-xs">
            {item.product_sizes?.map((size, index) => (
              <div key={index}>
                <span>{size.size} </span>
                <span>({size.stock_quantity})</span>
              </div>
            ))}
          </div>
        </div>
        <CardTitle className="text-base">
          {item.price.toLocaleString() || "가격"} 원
        </CardTitle>
      </div>
    </div>
  );
};

export default ProductItem;
