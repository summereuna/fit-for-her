import { useCategoryProducts } from "@/api/mainApi";
import Banner from "@/components/Home/Banner";
import BraCategorySection from "@/components/Home/BraCategorySection";
import CategorySection from "@/components/Home/CategorySection";
import CategorySectionSkeleton from "@/components/Home/CategorySectionSkeleton";
import MetaTag from "@/components/MetaTag";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { userRole, isSessionLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSessionLoading && userRole === "seller") {
      navigate("/dashboard");
    }
  }, [isSessionLoading, userRole, navigate]);

  const {
    data: topProductsData,
    isPending: isPendingTop,
    isSuccess: isSuccessTop,
  } = useCategoryProducts("tops");

  const {
    data: pantsProductsData,
    isPending: isPendingPants,
    isSuccess: isSuccessPants,
  } = useCategoryProducts("pants");

  return (
    <div className="flex flex-col space-y-10">
      <MetaTag title="홈" />
      <Banner />
      <Separator />
      {isPendingTop && <CategorySectionSkeleton />}
      {isSuccessTop && topProductsData && (
        <CategorySection data={topProductsData!} topCategoryName="tops" />
      )}

      <Separator />
      <BraCategorySection />
      <Separator />
      {isPendingPants && <CategorySectionSkeleton />}
      {isSuccessPants && pantsProductsData && (
        <CategorySection data={pantsProductsData} topCategoryName="pants" />
      )}
    </div>
  );
}
